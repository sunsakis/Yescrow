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
    const [owner, depositor, receiver, otherAccount] =
      await ethers.getSigners();

    const Escrow = await ethers.getContractFactory("Escrow");
    const escrow = await Escrow.deploy();

    const ERC20 = await ethers.getContractFactory("TestERC20");
    const erc20 = await ERC20.deploy([depositor.address]);

    const ERC721 = await ethers.getContractFactory("TestERC721");
    const erc721 = await ERC721.deploy([depositor.address]);

    return { escrow, erc20, erc721, owner, depositor, receiver, otherAccount };
  }

  describe("Deployment", function () {
    it("[SUCCESS] Should deploy", async function () {
      const { escrow, owner } = await loadFixture(deployEscrow);

      expect(escrow.address).to.have.lengthOf(42);
      expect(await escrow.owner()).to.equal(owner.address);
    });
  });

  describe("Escrow ETH", function () {
    it("[SUCCESS] Allows to deposit ETH", async function () {
      // Arrange
      const { escrow, depositor, receiver, otherAccount } = await loadFixture(
        deployEscrow
      );

      // Act
      await expect(
        escrow
          .connect(depositor)
          .createDepositETH(receiver.address, { value: ONE_ETHER })
      )
        .to.emit(escrow, "NewDepositETH")
        .withArgs(1, depositor.address, receiver.address, ONE_ETHER);

      // Assert
      expect(await ethers.provider.getBalance(escrow.address)).to.equal(
        ONE_ETHER
      );

      const deposit = await escrow.deposits(1);
      expect(deposit.depositor).to.equal(depositor.address);
      expect(deposit.receiver).to.equal(receiver.address);
      expect(deposit.token).to.equal(ethers.constants.AddressZero);
      expect(deposit.amount).to.equal(ONE_ETHER);
      expect(deposit.tokenIds).to.equal(undefined);
      expect(deposit.depositType).to.equal(0);
      expect(deposit.releaseRequested).to.equal(false);
      expect(deposit.cancelRequested).to.equal(false);

      // Act
      await expect(
        escrow
          .connect(depositor)
          .createDepositETH(otherAccount.address, { value: ONE_ETHER })
      )
        .to.emit(escrow, "NewDepositETH")
        .withArgs(2, depositor.address, otherAccount.address, ONE_ETHER);

      // Assert
      const deposit2 = await escrow.deposits(2);
      expect(deposit2.depositor).to.equal(depositor.address);
      expect(deposit2.receiver).to.equal(otherAccount.address);
      expect(deposit2.token).to.equal(ethers.constants.AddressZero);
      expect(deposit2.amount).to.equal(ONE_ETHER);
      expect(deposit2.tokenIds).to.equal(undefined);
      expect(deposit2.depositType).to.equal(0);
      expect(deposit2.releaseRequested).to.equal(false);
      expect(deposit2.cancelRequested).to.equal(false);
    });

    it("[SUCCESS] Enables depositor to release ETH", async function () {
      // Arrange
      const { escrow, depositor, receiver } = await loadFixture(deployEscrow);
      const prevReceiverBalance = await ethers.provider.getBalance(
        receiver.address
      );

      await escrow
        .connect(depositor)
        .createDepositETH(receiver.address, { value: ONE_ETHER });

      // Act
      await expect(escrow.connect(depositor).releaseDeposit(1))
        .to.emit(escrow, "DepositReleased")
        .withArgs(1);

      // Assert
      expect(await ethers.provider.getBalance(escrow.address)).to.equal(0);
      expect(await ethers.provider.getBalance(receiver.address)).to.equal(
        prevReceiverBalance.add(ONE_ETHER)
      );

      const deposit = await escrow.deposits(1);
      expect(deposit.depositor).to.equal(ethers.constants.AddressZero);
      expect(deposit.receiver).to.equal(ethers.constants.AddressZero);
      expect(deposit.amount).to.equal(0);

      // Try to release again
      await expect(
        escrow.connect(depositor).releaseDeposit(1)
      ).to.be.revertedWithCustomError(escrow, "DepositDoesNotExist");
    });

    it("[SUCCESS] Enables receiver to request release of ETH", async function () {
      // Arrange
      const { escrow, depositor, receiver } = await loadFixture(deployEscrow);

      await escrow
        .connect(depositor)
        .createDepositETH(receiver.address, { value: ONE_ETHER });

      // Act
      await expect(escrow.connect(receiver).requestRelease(1))
        .to.emit(escrow, "ReleaseRequested")
        .withArgs(1);

      // Assert
      const deposit = await escrow.deposits(1);
      expect(deposit.releaseRequested).to.equal(true);
    });

    it("[SUCCESS] Enables owner to release ETH after request", async function () {
      // Arrange
      const { escrow, depositor, receiver } = await loadFixture(deployEscrow);
      const prevReceiverBalance = await ethers.provider.getBalance(
        receiver.address
      );

      await escrow
        .connect(depositor)
        .createDepositETH(receiver.address, { value: ONE_ETHER });

      // Act
      await escrow.connect(receiver).requestRelease(1);

      // Assert
      await expect(escrow.approveRelease(1))
        .to.emit(escrow, "DepositReleased")
        .withArgs(1);

      const deposit = await escrow.deposits(1);
      expect(deposit.depositor).to.equal(ethers.constants.AddressZero);
      expect(deposit.receiver).to.equal(ethers.constants.AddressZero);
      expect(deposit.amount).to.equal(0);
      expect(deposit.releaseRequested).to.equal(false);

      // Assert balances
      const feePct = await escrow.fee();
      const fee = feePct.mul(ONE_ETHER).div(100000);
      expect(await ethers.provider.getBalance(escrow.address)).to.equal(fee);
      expect(await ethers.provider.getBalance(receiver.address)).closeTo(
        prevReceiverBalance.add(ONE_ETHER).sub(fee),
        ethers.utils.parseEther("0.001")
      );
    });

    it("[SUCCESS] Enables depositor to cancel ETH deposit", async function () {
      // Arrange
      const { escrow, depositor, receiver } = await loadFixture(deployEscrow);

      await escrow
        .connect(depositor)
        .createDepositETH(receiver.address, { value: ONE_ETHER });

      // Act
      await expect(escrow.connect(depositor).requestCancel(1))
        .to.emit(escrow, "CancelRequested")
        .withArgs(1);
    });

    it("[SUCCESS] Enables owner to approve cancel", async function () {
      // Arrange
      const { escrow, depositor, receiver } = await loadFixture(deployEscrow);
      const prevDepositorBalance = await ethers.provider.getBalance(
        depositor.address
      );

      await escrow
        .connect(depositor)
        .createDepositETH(receiver.address, { value: ONE_ETHER });

      // Act
      await escrow.connect(depositor).requestCancel(1);

      // Assert
      await expect(escrow.approveCancel(1))
        .to.emit(escrow, "DepositCancelled")
        .withArgs(1);

      const feePct = await escrow.fee();
      const fee = feePct.mul(ONE_ETHER).div(100000);

      expect(await ethers.provider.getBalance(escrow.address)).to.equal(fee);
      expect(await ethers.provider.getBalance(depositor.address)).closeTo(
        prevDepositorBalance.sub(fee),
        ethers.utils.parseEther("0.001")
      );
    });

    it("[FAIL] Does not allow non-depositor to request cancel", async function () {
      // Arrange
      const { escrow, depositor, receiver, otherAccount } = await loadFixture(
        deployEscrow
      );

      await escrow
        .connect(depositor)
        .createDepositETH(receiver.address, { value: ONE_ETHER });

      // Act
      await expect(
        escrow.connect(otherAccount).requestCancel(1)
      ).to.be.revertedWithCustomError(escrow, "OnlyDepositor");
    });

    it("[FAIL] Does not allow non-owner to approve cancel", async function () {
      // Arrange
      const { escrow, depositor, receiver, otherAccount } = await loadFixture(
        deployEscrow
      );

      await escrow
        .connect(depositor)
        .createDepositETH(receiver.address, { value: ONE_ETHER });

      // Act
      await escrow.connect(depositor).requestCancel(1);

      // Assert
      await expect(
        escrow.connect(otherAccount).approveCancel(1)
      ).to.be.revertedWithCustomError(escrow, "OnlyOwner");
    });

    it("[FAIL] Does not allow non-receiver to request release of ETH", async function () {
      // Arrange
      const { escrow, depositor, receiver, otherAccount } = await loadFixture(
        deployEscrow
      );

      await escrow
        .connect(depositor)
        .createDepositETH(receiver.address, { value: ONE_ETHER });

      // Act
      await expect(
        escrow.connect(otherAccount).requestRelease(1)
      ).to.be.revertedWithCustomError(escrow, "OnlyReceiver");
    });

    it("[FAIL] Does not allow non-owner to approve release of ETH", async function () {
      // Arrange
      const { escrow, depositor, receiver, otherAccount } = await loadFixture(
        deployEscrow
      );

      await escrow
        .connect(depositor)
        .createDepositETH(receiver.address, { value: ONE_ETHER });

      // Act
      await escrow.connect(receiver).requestRelease(1);

      // Assert
      await expect(
        escrow.connect(otherAccount).approveRelease(1)
      ).to.be.revertedWithCustomError(escrow, "OnlyOwner");
    });

    it("[FAIL] Does not allow to approve release of non-requested deposit", async function () {
      // Arrange
      const { escrow, depositor, receiver } = await loadFixture(deployEscrow);

      await escrow
        .connect(depositor)
        .createDepositETH(receiver.address, { value: ONE_ETHER });

      // Act
      await expect(escrow.approveRelease(1)).to.be.revertedWithCustomError(
        escrow,
        "ReleaseNotRequested"
      );
    });
  });

  describe("Escrow ERC20", function () {
    it("[SUCCESS] Allows to deposit ERC20", async function () {
      // Arrange
      const { escrow, erc20, depositor, receiver } = await loadFixture(
        deployEscrow
      );
      await erc20
        .connect(depositor)
        .increaseAllowance(escrow.address, ONE_ETHER);

      // Act
      await expect(
        escrow
          .connect(depositor)
          .createDepositERC20(receiver.address, erc20.address, ONE_ETHER)
      )
        .to.emit(escrow, "NewDepositERC20")
        .withArgs(
          1,
          depositor.address,
          receiver.address,
          erc20.address,
          ONE_ETHER
        );

      // Assert
      expect(await erc20.balanceOf(escrow.address)).to.equal(ONE_ETHER);

      const deposit = await escrow.deposits(1);
      expect(deposit.depositor).to.equal(depositor.address);
      expect(deposit.receiver).to.equal(receiver.address);
      expect(deposit.token).to.equal(erc20.address);
      expect(deposit.amount).to.equal(ONE_ETHER);
      expect(deposit.tokenIds).to.equal(undefined);
      expect(deposit.depositType).to.equal(1);
      expect(deposit.releaseRequested).to.equal(false);
      expect(deposit.cancelRequested).to.equal(false);
    });

    it("[SUCCESS] Enables depositor to release ERC20", async function () {
      // Arrange
      const { escrow, erc20, depositor, receiver } = await loadFixture(
        deployEscrow
      );
      const prevReceiverBalance = await erc20.balanceOf(receiver.address);

      await erc20.connect(depositor).approve(escrow.address, ONE_ETHER);
      await escrow
        .connect(depositor)
        .createDepositERC20(receiver.address, erc20.address, ONE_ETHER);

      // Act
      await expect(escrow.connect(depositor).releaseDeposit(1))
        .to.emit(escrow, "DepositReleased")
        .withArgs(1);

      // Assert
      expect(await erc20.balanceOf(escrow.address)).to.equal(0);
      expect(await erc20.balanceOf(receiver.address)).to.equal(
        prevReceiverBalance.add(ONE_ETHER)
      );

      const deposit = await escrow.deposits(1);
      expect(deposit.depositor).to.equal(ethers.constants.AddressZero);
      expect(deposit.receiver).to.equal(ethers.constants.AddressZero);
      expect(deposit.amount).to.equal(0);

      // Try to release again
      await expect(
        escrow.connect(depositor).releaseDeposit(1)
      ).to.be.revertedWithCustomError(escrow, "DepositDoesNotExist");
    });

    it("[SUCCESS] Enables receiver to request release of ERC20", async function () {
      // Arrange
      const { escrow, erc20, depositor, receiver } = await loadFixture(
        deployEscrow
      );

      await erc20.connect(depositor).approve(escrow.address, ONE_ETHER);
      await escrow
        .connect(depositor)
        .createDepositERC20(receiver.address, erc20.address, ONE_ETHER);

      // Act
      await expect(escrow.connect(receiver).requestRelease(1))
        .to.emit(escrow, "ReleaseRequested")
        .withArgs(1);

      // Assert
      const deposit = await escrow.deposits(1);
      expect(deposit.releaseRequested).to.equal(true);
    });

    it("[SUCCESS] Enables owner to release ERC20 after request", async function () {
      // Arrange
      const { escrow, erc20, depositor, receiver } = await loadFixture(
        deployEscrow
      );
      const prevReceiverBalance = await erc20.balanceOf(receiver.address);

      await erc20.connect(depositor).approve(escrow.address, ONE_ETHER);
      await escrow
        .connect(depositor)
        .createDepositERC20(receiver.address, erc20.address, ONE_ETHER);

      // Act
      await escrow.connect(receiver).requestRelease(1);

      // Assert
      await expect(escrow.approveRelease(1))
        .to.emit(escrow, "DepositReleased")
        .withArgs(1);

      const deposit = await escrow.deposits(1);
      expect(deposit.depositor).to.equal(ethers.constants.AddressZero);
      expect(deposit.receiver).to.equal(ethers.constants.AddressZero);
      expect(deposit.amount).to.equal(0);
      expect(deposit.releaseRequested).to.equal(false);

      // Assert balances
      const feePct = await escrow.fee();
      const fee = feePct.mul(ONE_ETHER).div(100000);
      expect(await erc20.balanceOf(escrow.address)).to.equal(fee);
      expect(await erc20.balanceOf(receiver.address)).closeTo(
        prevReceiverBalance.add(ONE_ETHER).sub(fee),
        ethers.utils.parseEther("0.001")
      );
    });

    it("[SUCCESS] Enables depositor to cancel ERC20 deposit", async function () {
      // Arrange
      const { escrow, erc20, depositor, receiver } = await loadFixture(
        deployEscrow
      );

      await erc20.connect(depositor).approve(escrow.address, ONE_ETHER);
      await escrow
        .connect(depositor)
        .createDepositERC20(receiver.address, erc20.address, ONE_ETHER);

      // Act
      await expect(escrow.connect(depositor).requestCancel(1))
        .to.emit(escrow, "CancelRequested")
        .withArgs(1);
    });

    it("[SUCCESS] Enables owner to approve cancel", async function () {
      // Arrange
      const { escrow, erc20, depositor, receiver } = await loadFixture(
        deployEscrow
      );
      const prevDepositorBalance = await erc20.balanceOf(depositor.address);

      await erc20.connect(depositor).approve(escrow.address, ONE_ETHER);
      await escrow
        .connect(depositor)
        .createDepositERC20(receiver.address, erc20.address, ONE_ETHER);

      // Act
      await escrow.connect(depositor).requestCancel(1);

      // Assert
      await expect(escrow.approveCancel(1))
        .to.emit(escrow, "DepositCancelled")
        .withArgs(1);

      const feePct = await escrow.fee();
      const fee = feePct.mul(ONE_ETHER).div(100000);

      expect(await erc20.balanceOf(escrow.address)).to.equal(fee);
      expect(await erc20.balanceOf(depositor.address)).closeTo(
        prevDepositorBalance.sub(fee),
        ethers.utils.parseEther("0.001")
      );
    });

    it("[FAIL] Does not allow non-depositor to request cancel", async function () {
      // Arrange
      const { escrow, erc20, depositor, receiver, otherAccount } =
        await loadFixture(deployEscrow);

      await erc20.connect(depositor).approve(escrow.address, ONE_ETHER);
      await escrow
        .connect(depositor)
        .createDepositERC20(receiver.address, erc20.address, ONE_ETHER);

      // Act
      await expect(
        escrow.connect(otherAccount).requestCancel(1)
      ).to.be.revertedWithCustomError(escrow, "OnlyDepositor");
    });

    it("[FAIL] Does not allow non-owner to approve cancel", async function () {
      // Arrange
      const { escrow, erc20, depositor, receiver, otherAccount } =
        await loadFixture(deployEscrow);

      await erc20.connect(depositor).approve(escrow.address, ONE_ETHER);
      await escrow
        .connect(depositor)
        .createDepositERC20(receiver.address, erc20.address, ONE_ETHER);

      // Act
      await escrow.connect(depositor).requestCancel(1);

      // Assert
      await expect(
        escrow.connect(otherAccount).approveCancel(1)
      ).to.be.revertedWithCustomError(escrow, "OnlyOwner");
    });

    it("[FAIL] Does not allow non-receiver to request release of ERC20", async function () {
      // Arrange
      const { escrow, erc20, depositor, receiver, otherAccount } =
        await loadFixture(deployEscrow);

      await erc20.connect(depositor).approve(escrow.address, ONE_ETHER);
      await escrow
        .connect(depositor)
        .createDepositERC20(receiver.address, erc20.address, ONE_ETHER);

      // Act
      await expect(
        escrow.connect(otherAccount).requestRelease(1)
      ).to.be.revertedWithCustomError(escrow, "OnlyReceiver");
    });

    it("[FAIL] Does not allow non-owner to approve release of ERC20", async function () {
      // Arrange
      const { escrow, erc20, depositor, receiver, otherAccount } =
        await loadFixture(deployEscrow);

      await erc20.connect(depositor).approve(escrow.address, ONE_ETHER);
      await escrow
        .connect(depositor)
        .createDepositERC20(receiver.address, erc20.address, ONE_ETHER);

      // Act
      await escrow.connect(receiver).requestRelease(1);

      // Assert
      await expect(
        escrow.connect(otherAccount).approveRelease(1)
      ).to.be.revertedWithCustomError(escrow, "OnlyOwner");
    });

    it("[FAIL] Does not allow to approve release of non-requested deposit", async function () {
      // Arrange
      const { escrow, erc20, depositor, receiver } = await loadFixture(
        deployEscrow
      );

      await erc20.connect(depositor).approve(escrow.address, ONE_ETHER);
      await escrow
        .connect(depositor)
        .createDepositERC20(receiver.address, erc20.address, ONE_ETHER);

      // Act
      await expect(escrow.approveRelease(1)).to.be.revertedWithCustomError(
        escrow,
        "ReleaseNotRequested"
      );
    });
  });

  describe("Escrow ERC721", function () {
    it("[SUCCESS] Allows to deposit ERC721", async function () {
      // Arrange
      const { escrow, erc721, depositor, receiver } = await loadFixture(
        deployEscrow
      );
      await erc721.connect(depositor).approve(escrow.address, 1);
      await erc721.connect(depositor).approve(escrow.address, 2);

      // Act
      await expect(
        escrow
          .connect(depositor)
          .createDepositERC721(receiver.address, erc721.address, [1, 2])
      )
        .to.emit(escrow, "NewDepositERC721")
        .withArgs(
          1,
          depositor.address,
          receiver.address,
          erc721.address,
          [1, 2]
        );

      // Assert
      const deposit = await escrow.deposits(1);
      expect(await erc721.balanceOf(escrow.address)).to.equal(2);
      expect(deposit.depositor).to.equal(depositor.address);
      expect(deposit.receiver).to.equal(receiver.address);
      expect(deposit.token).to.equal(erc721.address);
      expect(deposit.amount).to.equal(0);
      expect(deposit.depositType).to.equal(2);
      expect(deposit.releaseRequested).to.equal(false);
      expect(deposit.cancelRequested).to.equal(false);
      expect(await erc721.balanceOf(escrow.address)).to.equal(2);
    });

    it("[SUCCESS] Enables depositor to release ERC721", async function () {
      // Arrange
      const { escrow, erc721, depositor, receiver } = await loadFixture(
        deployEscrow
      );

      await erc721.connect(depositor).approve(escrow.address, 1);
      await erc721.connect(depositor).approve(escrow.address, 2);
      escrow
        .connect(depositor)
        .createDepositERC721(receiver.address, erc721.address, [1, 2]);

      // Act
      await expect(escrow.connect(depositor).releaseDeposit(1))
        .to.emit(escrow, "DepositReleased")
        .withArgs(1);

      // Assert
      expect(await erc721.balanceOf(escrow.address)).to.equal(0);
      expect(await erc721.balanceOf(receiver.address)).to.equal(2);

      const deposit = await escrow.deposits(1);
      expect(deposit.depositor).to.equal(ethers.constants.AddressZero);
      expect(deposit.receiver).to.equal(ethers.constants.AddressZero);
      expect(deposit.amount).to.equal(0);

      // Try to release again
      await expect(
        escrow.connect(depositor).releaseDeposit(1)
      ).to.be.revertedWithCustomError(escrow, "DepositDoesNotExist");
    });

    it("[SUCCESS] Enables receiver to request release of ERC721", async function () {
      // Arrange
      const { escrow, erc721, depositor, receiver } = await loadFixture(
        deployEscrow
      );

      await erc721.connect(depositor).approve(escrow.address, 1);
      await erc721.connect(depositor).approve(escrow.address, 2);
      escrow
        .connect(depositor)
        .createDepositERC721(receiver.address, erc721.address, [1, 2]);

      // Act
      await expect(escrow.connect(receiver).requestRelease(1))
        .to.emit(escrow, "ReleaseRequested")
        .withArgs(1);

      // Assert
      const deposit = await escrow.deposits(1);
      expect(deposit.releaseRequested).to.equal(true);
    });

    it("[SUCCESS] Enables owner to release ERC721 after request", async function () {
      // Arrange
      const { escrow, erc721, depositor, receiver } = await loadFixture(
        deployEscrow
      );
      const prevReceiverBalance = await erc721.balanceOf(receiver.address);

      await erc721.connect(depositor).approve(escrow.address, 1);
      await erc721.connect(depositor).approve(escrow.address, 2);
      escrow
        .connect(depositor)
        .createDepositERC721(receiver.address, erc721.address, [1, 2]);

      // Act
      await escrow.connect(receiver).requestRelease(1);

      // Assert
      await expect(escrow.approveRelease(1))
        .to.emit(escrow, "DepositReleased")
        .withArgs(1);

      const deposit = await escrow.deposits(1);
      expect(deposit.depositor).to.equal(ethers.constants.AddressZero);
      expect(deposit.receiver).to.equal(ethers.constants.AddressZero);
      expect(deposit.amount).to.equal(0);
      expect(deposit.releaseRequested).to.equal(false);

      // Assert balances
      expect(await erc721.balanceOf(escrow.address)).to.equal(0);
      expect(await erc721.balanceOf(receiver.address)).to.equal(
        prevReceiverBalance.add(2)
      );
    });

    it("[SUCCESS] Enables depositor to cancel ERC721 deposit", async function () {
      // Arrange
      const { escrow, erc721, depositor, receiver } = await loadFixture(
        deployEscrow
      );

      await erc721.connect(depositor).approve(escrow.address, 1);
      await erc721.connect(depositor).approve(escrow.address, 2);
      escrow
        .connect(depositor)
        .createDepositERC721(receiver.address, erc721.address, [1, 2]);

      // Act
      await expect(escrow.connect(depositor).requestCancel(1))
        .to.emit(escrow, "CancelRequested")
        .withArgs(1);
    });

    it("[SUCCESS] Enables owner to approve cancel", async function () {
      // Arrange
      const { escrow, erc721, depositor, receiver } = await loadFixture(
        deployEscrow
      );
      const prevDepositorBalance = await erc721.balanceOf(depositor.address);

      await erc721.connect(depositor).approve(escrow.address, 1);
      await erc721.connect(depositor).approve(escrow.address, 2);
      escrow
        .connect(depositor)
        .createDepositERC721(receiver.address, erc721.address, [1, 2]);

      // Act
      await escrow.connect(depositor).requestCancel(1);

      // Assert
      await expect(escrow.approveCancel(1))
        .to.emit(escrow, "DepositCancelled")
        .withArgs(1);

      expect(await erc721.balanceOf(escrow.address)).to.equal(0);
      expect(await erc721.balanceOf(depositor.address)).to.equal(
        prevDepositorBalance
      );
    });

    it("[FAIL] Does not allow non-depositor to request cancel", async function () {
      // Arrange
      const { escrow, erc721, depositor, receiver, otherAccount } =
        await loadFixture(deployEscrow);

      await erc721.connect(depositor).approve(escrow.address, 1);
      await erc721.connect(depositor).approve(escrow.address, 2);
      escrow
        .connect(depositor)
        .createDepositERC721(receiver.address, erc721.address, [1, 2]);

      // Act
      await expect(
        escrow.connect(otherAccount).requestCancel(1)
      ).to.be.revertedWithCustomError(escrow, "OnlyDepositor");
    });

    it("[FAIL] Does not allow non-owner to approve cancel", async function () {
      // Arrange
      const { escrow, erc721, depositor, receiver, otherAccount } =
        await loadFixture(deployEscrow);

      await erc721.connect(depositor).approve(escrow.address, 1);
      await erc721.connect(depositor).approve(escrow.address, 2);
      escrow
        .connect(depositor)
        .createDepositERC721(receiver.address, erc721.address, [1, 2]);

      // Act
      await escrow.connect(depositor).requestCancel(1);

      // Assert
      await expect(
        escrow.connect(otherAccount).approveCancel(1)
      ).to.be.revertedWithCustomError(escrow, "OnlyOwner");
    });

    it("[FAIL] Does not allow non-receiver to request release of ERC721", async function () {
      // Arrange
      const { escrow, erc721, depositor, receiver, otherAccount } =
        await loadFixture(deployEscrow);

      await erc721.connect(depositor).approve(escrow.address, 1);
      await erc721.connect(depositor).approve(escrow.address, 2);
      escrow
        .connect(depositor)
        .createDepositERC721(receiver.address, erc721.address, [1, 2]);

      // Act
      await expect(
        escrow.connect(otherAccount).requestRelease(1)
      ).to.be.revertedWithCustomError(escrow, "OnlyReceiver");
    });

    it("[FAIL] Does not allow non-owner to approve release of ERC721", async function () {
      // Arrange
      const { escrow, erc721, depositor, receiver, otherAccount } =
        await loadFixture(deployEscrow);

      await erc721.connect(depositor).approve(escrow.address, 1);
      await erc721.connect(depositor).approve(escrow.address, 2);
      escrow
        .connect(depositor)
        .createDepositERC721(receiver.address, erc721.address, [1, 2]);

      // Act
      await escrow.connect(receiver).requestRelease(1);

      // Assert
      await expect(
        escrow.connect(otherAccount).approveRelease(1)
      ).to.be.revertedWithCustomError(escrow, "OnlyOwner");
    });

    it("[FAIL] Does not allow to approve release of non-requested deposit", async function () {
      // Arrange
      const { escrow, erc721, depositor, receiver } = await loadFixture(
        deployEscrow
      );

      await erc721.connect(depositor).approve(escrow.address, 1);
      await erc721.connect(depositor).approve(escrow.address, 2);
      escrow
        .connect(depositor)
        .createDepositERC721(receiver.address, erc721.address, [1, 2]);

      // Act
      await expect(escrow.approveRelease(1)).to.be.revertedWithCustomError(
        escrow,
        "ReleaseNotRequested"
      );
    });
  });

  describe("Fees", function () {
    it("[SUCCESS] Allows to withdraw fees (ETH)", async function () {
      // Arrange
      const { escrow, depositor, receiver, otherAccount } = await loadFixture(
        deployEscrow
      );
      const prevOtherAccountBalance = await ethers.provider.getBalance(
        otherAccount.address
      );

      await escrow.connect(depositor).createDepositETH(receiver.address, {
        value: ONE_ETHER,
      });
      await escrow.connect(receiver).requestRelease(1);
      await escrow.approveRelease(1);

      // Act
      await escrow.withdrawFeesETH(otherAccount.address);

      // Assert
      const feePct = await escrow.fee();
      const fee = feePct.mul(ONE_ETHER).div(100000);
      expect(await ethers.provider.getBalance(otherAccount.address)).to.eq(
        prevOtherAccountBalance.add(fee)
      );
      expect(await ethers.provider.getBalance(escrow.address)).to.eq(0);
    });

    it("[SUCCESS] Allows to withdraw fees (ERC20)", async function () {
      // Arrange
      const { escrow, erc20, depositor, receiver, otherAccount } =
        await loadFixture(deployEscrow);
      await erc20.connect(depositor).approve(escrow.address, ONE_ETHER);

      await escrow
        .connect(depositor)
        .createDepositERC20(receiver.address, erc20.address, ONE_ETHER);
      await escrow.connect(receiver).requestRelease(1);
      await escrow.approveRelease(1);

      // Act
      await escrow.withdrawFeesERC20(otherAccount.address, erc20.address);

      // Assert
      const feePct = await escrow.fee();
      const fee = feePct.mul(ONE_ETHER).div(100000);
      expect(await erc20.balanceOf(otherAccount.address)).to.eq(fee);
      expect(await erc20.balanceOf(escrow.address)).to.eq(0);
    });
  });

  describe("Ownership", async function () {
    it("[SUCCESS] Allows to transfer ownership", async function () {
      // Arrange
      const { escrow, otherAccount } = await loadFixture(
        deployEscrow
      );

      // Act
      await escrow.setOwner(otherAccount.address);

      // Assert
      expect(await escrow.owner()).to.eq(otherAccount.address);
    });

    it("[FAIL] Does not allow non-owner to transfer ownership", async function () {
      // Arrange
      const { escrow, otherAccount } = await loadFixture(
        deployEscrow
      );

      // Act
      await expect(
        escrow.connect(otherAccount).setOwner(otherAccount.address)
      ).to.be.revertedWithCustomError(escrow, "OnlyOwner");
    });
  });
});
