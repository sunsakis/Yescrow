const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

const ONE_ETHER = ethers.utils.parseEther("1");

describe("Escrow", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployEscrow() {
    // Contracts are deployed using the first signer/account by default
    const [owner, buyer, seller, otherAccount] = await ethers.getSigners();

    const Escrow = await ethers.getContractFactory("Escrow");
    const escrow = await Escrow.deploy();

    const ERC20 = await ethers.getContractFactory("TestERC20");
    const erc20 = await ERC20.deploy([buyer.address]);

    const ERC721 = await ethers.getContractFactory("TestERC721");
    const erc721 = await ERC721.deploy([buyer.address]);

    return { escrow, erc20, erc721, owner, buyer, seller, otherAccount };
  }

  describe("Deployment", function () {
    it("Should deploy", async function () {
      const { escrow, owner } = await loadFixture(deployEscrow);

      expect(escrow.address).to.have.lengthOf(42);
      expect(await escrow.owner()).to.equal(owner.address);
    });
  });

  describe("Escrow ETH", function () {
    it("Allows to deposit ETH", async function () {
      // Arrange
      const { escrow, buyer, seller, otherAccount } = await loadFixture(
        deployEscrow
      );

      // Act
      await expect(
        escrow
          .connect(buyer)
          .createDepositETH(seller.address, { value: ONE_ETHER })
      )
        .to.emit(escrow, "NewDepositETH")
        .withArgs(1, buyer.address, seller.address, ONE_ETHER);

      // Assert
      expect(await ethers.provider.getBalance(escrow.address)).to.equal(
        ONE_ETHER
      );

      const deposit = await escrow.deposits(1);
      expect(deposit.buyer).to.equal(buyer.address);
      expect(deposit.seller).to.equal(seller.address);
      expect(deposit.token).to.equal(ethers.constants.AddressZero);
      expect(deposit.amount).to.equal(ONE_ETHER);
      expect(deposit.released).to.equal(false);
      expect(deposit.depositType).to.equal(0);

      // Act
      await expect(
        escrow
          .connect(buyer)
          .createDepositETH(otherAccount.address, { value: ONE_ETHER })
      )
        .to.emit(escrow, "NewDepositETH")
        .withArgs(2, buyer.address, otherAccount.address, ONE_ETHER);

      // Assert
      const deposit2 = await escrow.deposits(2);
      expect(deposit2.buyer).to.equal(buyer.address);
      expect(deposit2.seller).to.equal(otherAccount.address);
      expect(deposit2.token).to.equal(ethers.constants.AddressZero);
      expect(deposit2.amount).to.equal(ONE_ETHER);
      expect(deposit2.released).to.equal(false);
      expect(deposit2.depositType).to.equal(0);
    });

    it("Enables buyer to release ETH", async function () {
      // Arrange
      const { escrow, buyer, seller } = await loadFixture(deployEscrow);
      const prevSellerBalance = await ethers.provider.getBalance(
        seller.address
      );

      await escrow
        .connect(buyer)
        .createDepositETH(seller.address, { value: ONE_ETHER });

      // Act
      await expect(escrow.connect(buyer).releaseDeposit(1))
        .to.emit(escrow, "DepositReleased")
        .withArgs(1);

      // Assert
      const fee = ONE_ETHER.div(200);
      expect(await ethers.provider.getBalance(escrow.address)).to.equal(fee);
      expect(await ethers.provider.getBalance(seller.address)).to.equal(
        prevSellerBalance.add(ONE_ETHER).sub(fee)
      );

      const deposit = await escrow.deposits(1);
      expect(deposit.released).to.equal(true);
    });

    it("Enables owner to intervene and release ETH", async function () {
      // Arrange
      const { escrow, buyer, seller, otherAccount } = await loadFixture(
        deployEscrow
      );
      const prevSellerBalance = await ethers.provider.getBalance(
        seller.address
      );
      const prevOtherAccountBalance = await ethers.provider.getBalance(
        otherAccount.address
      );

      await escrow
        .connect(buyer)
        .createDepositETH(seller.address, { value: ONE_ETHER });

      // Act
      await expect(escrow.intervene(1, otherAccount.address))
        .to.emit(escrow, "Intervened")
        .withArgs(1, otherAccount.address);

      // Assert
      const fee = ONE_ETHER.div(200);
      expect(await ethers.provider.getBalance(escrow.address)).to.equal(fee);
      expect(await ethers.provider.getBalance(seller.address)).to.equal(
        prevSellerBalance
      );
      expect(await ethers.provider.getBalance(otherAccount.address)).to.equal(
        prevOtherAccountBalance.add(ONE_ETHER).sub(fee)
      );

      const deposit = await escrow.deposits(1);
      expect(deposit.released).to.equal(true);
    });

    it("Disallows non-owners to intervene and release ETH", async function () {
      // Arrange
      const { escrow, buyer, seller, otherAccount } = await loadFixture(
        deployEscrow
      );

      await escrow
        .connect(buyer)
        .createDepositETH(seller.address, { value: ONE_ETHER });

      // Act / Assert
      await expect(
        escrow.connect(seller).intervene(1, otherAccount.address)
      ).to.be.revertedWithCustomError(escrow, "OnlyOwner");
    });

    it("Disallows non-buyers to release ETH", async function () {
      // Arrange
      const { escrow, buyer, seller, otherAccount } = await loadFixture(
        deployEscrow
      );

      await escrow
        .connect(buyer)
        .createDepositETH(seller.address, { value: ONE_ETHER });

      // Act / Assert
      await expect(
        escrow.connect(seller).releaseDeposit(1)
      ).to.be.revertedWithCustomError(escrow, "OnlyBuyer");
    });

    it("Disallows release of ETH if already released", async function () {
      // Arrange
      const { escrow, buyer, seller } = await loadFixture(deployEscrow);

      escrow
        .connect(buyer)
        .createDepositETH(seller.address, { value: ONE_ETHER });

      await escrow.connect(buyer).releaseDeposit(1);

      // Act / Assert
      await expect(
        escrow.connect(buyer).releaseDeposit(1)
      ).to.be.revertedWithCustomError(escrow, "AlreadyReleased");
    });
  });

  describe("Escrow ERC20", function () {
    it("Allows to deposit ERC20", async function () {
      // Arrange
      const { escrow, erc20, buyer, seller } = await loadFixture(deployEscrow);
      await erc20.connect(buyer).increaseAllowance(escrow.address, ONE_ETHER);

      // Act
      await expect(
        escrow
          .connect(buyer)
          .createDepositERC20(seller.address, erc20.address, ONE_ETHER)
      )
        .to.emit(escrow, "NewDepositERC20")
        .withArgs(1, buyer.address, seller.address, erc20.address, ONE_ETHER);

      // Assert
      expect(await erc20.balanceOf(escrow.address)).to.equal(ONE_ETHER);

      const deposit = await escrow.deposits(1);
      expect(deposit.buyer).to.equal(buyer.address);
      expect(deposit.seller).to.equal(seller.address);
      expect(deposit.token).to.equal(erc20.address);
      expect(deposit.amount).to.equal(ONE_ETHER);
      expect(deposit.released).to.equal(false);
      expect(deposit.depositType).to.equal(1);
    });

    it("Enables buyer to release ERC20", async function () {
      // Arrange
      const { escrow, erc20, buyer, seller } = await loadFixture(deployEscrow);
      const prevSellerBalance = await erc20.balanceOf(seller.address);

      await erc20.connect(buyer).increaseAllowance(escrow.address, ONE_ETHER);
      await escrow
        .connect(buyer)
        .createDepositERC20(seller.address, erc20.address, ONE_ETHER);

      // Act
      await expect(escrow.connect(buyer).releaseDeposit(1))
        .to.emit(escrow, "DepositReleased")
        .withArgs(1);

      // Assert
      const fee = ONE_ETHER.div(200);
      expect(await erc20.balanceOf(escrow.address)).to.equal(fee);
      expect(await erc20.balanceOf(seller.address)).to.equal(
        prevSellerBalance.add(ONE_ETHER).sub(fee)
      );
    });

    it("Enables owner to intervene and release ERC20", async function () {
      // Arrange
      const { escrow, erc20, buyer, seller, otherAccount } = await loadFixture(
        deployEscrow
      );
      const prevOtherAccountBalance = await erc20.balanceOf(
        otherAccount.address
      );
      const prevSellerBalance = await erc20.balanceOf(seller.address);

      await erc20.connect(buyer).increaseAllowance(escrow.address, ONE_ETHER);
      await escrow
        .connect(buyer)
        .createDepositERC20(seller.address, erc20.address, ONE_ETHER);

      // Act
      await expect(escrow.intervene(1, otherAccount.address))
        .to.emit(escrow, "Intervened")
        .withArgs(1, otherAccount.address);

      // Assert
      const fee = ONE_ETHER.div(200);
      expect(await erc20.balanceOf(escrow.address)).to.equal(fee);
      expect(await erc20.balanceOf(seller.address)).to.equal(prevSellerBalance);
      expect(await erc20.balanceOf(otherAccount.address)).to.equal(
        prevOtherAccountBalance.add(ONE_ETHER).sub(fee)
      );
    });

    it("Disallows non-buyers to release ERC20", async function () {
      // Arrange
      const { escrow, erc20, buyer, seller } = await loadFixture(deployEscrow);

      await erc20.connect(buyer).increaseAllowance(escrow.address, ONE_ETHER);
      await escrow
        .connect(buyer)
        .createDepositERC20(seller.address, erc20.address, ONE_ETHER);

      // Act / Assert
      await expect(
        escrow.connect(seller).releaseDeposit(1)
      ).to.be.revertedWithCustomError(escrow, "OnlyBuyer");
    });

    it("Disallows release of ERC20 if already released", async function () {
      // Arrange
      const { escrow, erc20, buyer, seller } = await loadFixture(deployEscrow);

      await erc20.connect(buyer).increaseAllowance(escrow.address, ONE_ETHER);
      await escrow
        .connect(buyer)
        .createDepositERC20(seller.address, erc20.address, ONE_ETHER);

      await escrow.connect(buyer).releaseDeposit(1);

      // Act / Assert
      await expect(
        escrow.connect(buyer).releaseDeposit(1)
      ).to.be.revertedWithCustomError(escrow, "AlreadyReleased");
    });

    it("Disallows release of non-existant deposit", async function () {
      // Arrange
      const { escrow, buyer } = await loadFixture(deployEscrow);

      // Act / Assert
      await expect(
        escrow.connect(buyer).releaseDeposit(1)
      ).to.be.revertedWithCustomError(escrow, "DepositDoesNotExist");
    });
  });

  describe("Escrow ERC721", function () {
    it("Allows to deposit ERC721", async function () {
      // Arrange
      const { escrow, erc721, buyer, seller } = await loadFixture(deployEscrow);
      await erc721.connect(buyer).approve(escrow.address, 1);
      await erc721.connect(buyer).approve(escrow.address, 2);

      // Act
      await expect(
        escrow
          .connect(buyer)
          .createDepositERC721(seller.address, erc721.address, [1, 2])
      )
        .to.emit(escrow, "NewDepositERC721")
        .withArgs(1, buyer.address, seller.address, erc721.address, [1, 2]);

      // Assert
      expect(await erc721.balanceOf(escrow.address)).to.equal(2);

      const deposit = await escrow.deposits(1);
      expect(deposit.buyer).to.equal(buyer.address);
      expect(deposit.seller).to.equal(seller.address);
      expect(deposit.token).to.equal(erc721.address);
      expect(deposit.released).to.equal(false);
      expect(deposit.depositType).to.equal(2);
    });

    it("Enables buyer to release ERC721", async function () {
      // Arrange
      const { escrow, erc721, buyer, seller } = await loadFixture(deployEscrow);
      await erc721.connect(buyer).approve(escrow.address, 1);
      await erc721.connect(buyer).approve(escrow.address, 2);
      await escrow
        .connect(buyer)
        .createDepositERC721(seller.address, erc721.address, [1, 2]);

      // Act
      await expect(escrow.connect(buyer).releaseDeposit(1))
        .to.emit(escrow, "DepositReleased")
        .withArgs(1);

      // Assert
      expect(await erc721.balanceOf(escrow.address)).to.equal(0);
      expect(await erc721.balanceOf(seller.address)).to.equal(2);

      const deposit = await escrow.deposits(1);
      expect(deposit.released).to.equal(true);
    });

    it("Enables owner to intervene and release ERC721", async function () {
      // Arrange
      const { escrow, erc721, buyer, seller, otherAccount } = await loadFixture(
        deployEscrow
      );
      await erc721.connect(buyer).approve(escrow.address, 1);
      await erc721.connect(buyer).approve(escrow.address, 2);
      await escrow
        .connect(buyer)
        .createDepositERC721(seller.address, erc721.address, [1, 2]);

      // Act
      await expect(escrow.intervene(1, otherAccount.address))
        .to.emit(escrow, "Intervened")
        .withArgs(1, otherAccount.address);

      // Assert
      expect(await erc721.balanceOf(escrow.address)).to.equal(0);
      expect(await erc721.balanceOf(seller.address)).to.equal(0);
      expect(await erc721.balanceOf(otherAccount.address)).to.equal(2);

      const deposit = await escrow.deposits(1);
      expect(deposit.released).to.equal(true);
    });

    it("Disallows non-buyers to release ERC721", async function () {
      // Arrange
      const { escrow, erc721, buyer, seller } = await loadFixture(deployEscrow);
      await erc721.connect(buyer).approve(escrow.address, 1);
      await erc721.connect(buyer).approve(escrow.address, 2);
      await escrow
        .connect(buyer)
        .createDepositERC721(seller.address, erc721.address, [1, 2]);

      // Act / Assert
      await expect(
        escrow.connect(seller).releaseDeposit(1)
      ).to.be.revertedWithCustomError(escrow, "OnlyBuyer");
    });

    it("Disallows release of ERC721 if already released", async function () {
      // Arrange
      const { escrow, erc721, buyer, seller } = await loadFixture(deployEscrow);
      await erc721.connect(buyer).approve(escrow.address, 1);
      await erc721.connect(buyer).approve(escrow.address, 2);
      await escrow
        .connect(buyer)
        .createDepositERC721(seller.address, erc721.address, [1, 2]);

      await escrow.connect(buyer).releaseDeposit(1);

      // Act / Assert
      await expect(
        escrow.connect(buyer).releaseDeposit(1)
      ).to.be.revertedWithCustomError(escrow, "AlreadyReleased");
    });
  });

  describe("Fees", function () {
    it("Allows to withdraw fees (ETH)", async function () {
      // Arrange
      const { escrow, owner, buyer, seller, otherAccount } = await loadFixture(
        deployEscrow
      );
      const prevOtherAccountBalance = await ethers.provider.getBalance(
        otherAccount.address
      );

      await escrow.connect(buyer).createDepositETH(seller.address, {
        value: ONE_ETHER,
      });
      await escrow.connect(buyer).releaseDeposit(1);

      // Act
      await escrow.withdrawFeesETH(otherAccount.address);

      // Assert
      const fees = ONE_ETHER.div(200);
      expect(await ethers.provider.getBalance(otherAccount.address)).to.eq(
        prevOtherAccountBalance.add(fees)
      );
      expect(await ethers.provider.getBalance(escrow.address)).to.eq(0);
    });

    it("Allows to withdraw fees (ERC20)", async function () {
      // Arrange
      const { escrow, erc20, owner, buyer, seller, otherAccount } = await loadFixture(
        deployEscrow
      );
      await erc20.connect(buyer).approve(escrow.address, ONE_ETHER);

      await escrow.connect(buyer).createDepositERC20(seller.address, erc20.address, ONE_ETHER);
      await escrow.connect(buyer).releaseDeposit(1);

      // Act
      await escrow.withdrawFeesERC20(otherAccount.address, erc20.address);

      // Assert
      const fees = ONE_ETHER.div(200);
      expect(await erc20.balanceOf(otherAccount.address)).to.eq(fees);
      expect(await erc20.balanceOf(escrow.address)).to.eq(0);
    });
  });
});
