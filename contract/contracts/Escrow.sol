//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

/// @title Escrow
/// @author Karolis Ramanauskas
contract Escrow {
    /*==============================================================
                            CONSTANTS
    ==============================================================*/

    /// @notice The owner of the contract
    address public immutable owner;

    /*==============================================================
                            VARIABLES
    ==============================================================*/

    enum DepositType {
        ETH,
        ERC20,
        ERC721
    }

    /// @notice The deposit struct
    struct Deposit {
        /// @notice The buyer address
        address buyer;
        /// @notice The seller address
        address seller;
        /// @notice The amount of the deposit (applies when deposit type is ETH or ERC20)
        uint256 amount;
        /// @notice The token address (if the deposit is ERC20 or ERC721)
        address token;
        /// @notice The token ID (if the deposit is ERC721)
        uint256 tokenId;
        /// @notice The deposit type (ETH, ERC20, ERC721)
        DepositType depositType;
        /// @notice Whether the deposit has been executed
        bool executed;
    }

    /// @notice The current deposit ID
    uint256 public currentId;

    /// @notice The accrued fees
    uint256 public accruedFees;

    /// @notice The deposits mapping
    mapping(uint256 => Deposit) public deposits;

    /*==============================================================
                            MODIFIERS
    ==============================================================*/

    /// @notice Only owner can execute
    modifier onlyOwner() {
        if (msg.sender != owner) {
            revert OnlyOwner();
        }
        _;
    }

    /// @notice Deposit not executed and buyer is the caller
    /// @param _id The deposit ID
    modifier releaseGuard(uint256 _id) {
        Deposit storage deposit = deposits[_id];
        if (deposit.buyer != msg.sender) {
            revert OnlyBuyer();
        }

        if (deposit.executed == true) {
            revert AlreadyReleased();
        }
        _;
    }

    /*==============================================================
                            FUNCTIONS
    ==============================================================*/

    constructor() {
        owner = msg.sender;
    }

    /// @notice Creates a new ETH deposit
    /// @param _seller The seller address
    /// @param _email The seller email
    function createDepositETH(
        address _seller,
        // TODO: is email needed, it's public
        string memory _email
    ) external payable {
        if (msg.value == 0) {
            revert DepositAmountZero();
        }

        currentId++;
        deposits[currentId] = Deposit({
            buyer: msg.sender,
            seller: _seller,
            amount: msg.value,
            depositType: DepositType.ETH,
            token: address(0),
            tokenId: 0,
            executed: false
        });

        emit NewDeposit(msg.sender, _seller, msg.value, currentId, _email);
    }

    /// @notice Allows the buyer to release the ETH deposit
    /// @param _id The deposit ID
    function releaseDepositETH(uint256 _id) external releaseGuard(_id) {
        Deposit storage deposit = deposits[_id];
        deposit.executed = true;

        uint256 tax = deposit.amount / 200;
        uint256 releaseAmount = deposit.amount - tax;
        accruedFees += tax;

        (bool success, ) = payable(deposit.seller).call{value: releaseAmount}(
            ""
        );
        if (!success) {
            revert FailedToSendReleasedETH();
        }

        emit DepositReleased(deposit.buyer, deposit.seller, releaseAmount, _id);
    }

    /// @notice Creates a new ERC20 deposit
    /// @param _seller The seller address
    /// @param _token The token address
    /// @param _amount The amount of tokens
    function createDepositERC20(
        address _seller,
        address _token,
        uint256 _amount
    ) external {
        if (_seller == address(0)) {
            revert SellerAddressEmpty();
        }

        if (_token == address(0)) {
            revert TokenAddressEmpty();
        }

        if (_amount == 0) {
            revert DepositAmountZero();
        }

        currentId++;
        deposits[currentId] = Deposit({
            buyer: msg.sender,
            seller: _seller,
            amount: _amount,
            token: _token,
            depositType: DepositType.ERC20,
            tokenId: 0,
            executed: false
        });

        bool success = IERC20(_token).transferFrom(
            msg.sender,
            address(this),
            _amount
        );
        if (!success) {
            revert FailedToTransferERC20();
        }
    }

    /// @notice Allows the buyer to release the ERC20 deposit
    /// @param _id The deposit ID
    function releaseDepositERC20(uint256 _id) external releaseGuard(_id) {
        Deposit storage deposit = deposits[_id];
        deposit.executed = true;

        uint256 tax = deposit.amount / 200;
        uint256 releaseAmount = deposit.amount - tax;

        bool success = IERC20(deposit.token).transfer(
            deposit.seller,
            releaseAmount
        );
        if (!success) {
            revert FailedToSendReleasedERC20();
        }

        emit DepositReleased(deposit.buyer, deposit.seller, releaseAmount, _id);
    }

    /// @notice Creates a new ERC721 deposit
    /// @param _seller The seller address
    /// @param _token The token address
    /// @param _tokenId The token ID
    function createDepositERC721(
        address _seller,
        address _token,
        uint256 _tokenId
    ) external {
        if (_seller == address(0)) {
            revert SellerAddressEmpty();
        }

        if (_token == address(0)) {
            revert TokenAddressEmpty();
        }

        currentId++;
        deposits[currentId] = Deposit({
            buyer: msg.sender,
            seller: _seller,
            token: _token,
            tokenId: _tokenId,
            depositType: DepositType.ERC721,
            amount: 1,
            executed: false
        });

        IERC721(_token).safeTransferFrom(
            msg.sender,
            address(this),
            _tokenId
        );
    }

    /// @notice Allows the buyer to release the ERC721 deposit
    /// @param _id The deposit ID
    function releaseDepositERC721(uint256 _id) external releaseGuard(_id) {
        Deposit storage deposit = deposits[_id];
        deposit.executed = true;

        IERC721(deposit.token).safeTransferFrom(
            address(this),
            deposit.seller,
            deposit.tokenId
        );

        emit DepositReleased(deposit.buyer, deposit.seller, 1, _id);
    }

    /// @notice Allows the owner to withdraw the accrued fees
    function withdraw() external onlyOwner {
        if (accruedFees == 0) {
            revert NoFeesAccrued();
        }

        accruedFees = 0;

        (bool success, ) = payable(owner).call{value: accruedFees}("");
        if (!success) {
            revert FailedToSendWithdrawnETH();
        }
    }

    /// @notice Allows the owner to release a deposit
    /// @param _to The address to send the funds to
    /// @param _amount The amount to send
    /// @param _id The current deposit id
    function divineIntervention(
        address _to,
        uint256 _amount,
        uint _id
    ) external onlyOwner {
        deposits[_id].executed = true;

        (bool sent, ) = payable(_to).call{value: _amount}("");
        require(sent, "Failed to send.");

        emit OwnerWasHere(_to, _amount, _id);
    }

    /*==============================================================
                            EVENTS
    ==============================================================*/

    /// @notice Emitted when a new deposit is created
    /// @param buyerAddress The buyer address
    /// @param sellerAddress The seller address
    /// @param amount The amount of the deposit
    /// @param currentId The current deposit id
    /// @param email The seller email
    event NewDeposit(
        address buyerAddress,
        address sellerAddress,
        uint256 amount,
        uint256 currentId,
        string email
    );

    /// @notice Emitted when a deposit is released
    /// @param buyerAddress The buyer address
    /// @param sellerAddress The seller address
    /// @param amount The amount of the deposit
    /// @param currentId The current deposit id
    event DepositReleased(
        address buyerAddress,
        address sellerAddress,
        uint256 amount,
        uint256 currentId
    );

    /// @notice Emitted when the owner withdraws fees
    /// @param to The address to which the fees are sent
    /// @param amount The amount of fees withdrawn
    /// @param currentId The current deposit id
    event OwnerWasHere(address to, uint256 amount, uint256 currentId);

    /*==============================================================
                            ERRORS
    ==============================================================*/

    error OnlyOwner();

    error OnlyBuyer();

    error AlreadyReleased();

    error FailedToSendReleasedETH();

    error FailedToSendWithdrawnETH();

    error NoFeesAccrued();

    error DepositAmountZero();

    error TokenAddressEmpty();

    error SellerAddressEmpty();

    error FailedToTransferERC20();

    error FailedToTransferERC721();

    error FailedToSendReleasedERC20();

    error FailedToSendReleasedERC721();
}
