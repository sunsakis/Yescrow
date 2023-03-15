//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

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
        NFT
    }

    /// @notice The deposit struct
    struct Deposit {
        /// @notice The buyer address
        address buyer;
        /// @notice The seller address
        address seller;
        /// @notice The amount of the deposit (applies when deposit type is ETH or ERC20)
        uint256 amount;
        /// @notice The token address (if the deposit is ERC20 or NFT)
        address token;
        /// @notice The token ID (if the deposit is NFT)
        uint256 tokenId;
        /// @notice The deposit type (ETH, ERC20, NFT)
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

    modifier onlyOwner() {
        if (msg.sender != owner) {
            revert OnlyOwner();
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
    function createDeposit(
        address _seller,
        DepositType _depositType,
        // TODO: is email needed, it's public
        string memory _email
    ) external payable {
        currentId++;

        deposits[currentId] = Deposit({
            buyer: msg.sender,
            seller: _seller,
            amount: msg.value,
            token: address(0),
            tokenId: 0,
            depositType: _depositType,
            executed: false
        });

        emit NewDeposit(msg.sender, _seller, msg.value, currentId, _email);
    }

    function releaseDeposit(uint256 id) external {
        Deposit storage deposit = deposits[id];

        if (deposit.buyer != msg.sender) {
            revert OnlyBuyer();
        }

        if (deposit.executed == true) {
            revert AlreadyReleased();
        }

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

        emit DepositReleased(deposit.buyer, deposit.seller, releaseAmount, id);
    }

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

    // function divineIntervention(
    //     address _to,
    //     uint256 _amount,
    //     uint _setcurrentId
    // ) external onlyOwner {
    //     deposits[_setcurrentId].executed = true;

    //     (bool sent, ) = payable(_to).call{value: _amount}("");
    //     require(sent, "Failed to send.");

    //     emit OwnerWasHere(_to, _amount, _setcurrentId);
    // }

    /*==============================================================
                            EVENTS
    ==============================================================*/

    event NewDeposit(
        address buyerAddress,
        address sellerAddress,
        uint256 amount,
        uint256 currentId,
        string email
    );

    event DepositReleased(
        address buyerAddress,
        address sellerAddress,
        uint256 amount,
        uint256 currentId
    );

    event OwnerWasHere(address to, uint256 amount, uint currentId);

    /*==============================================================
                            ERRORS
    ==============================================================*/

    error OnlyOwner();

    error OnlyBuyer();

    error AlreadyReleased();

    error FailedToSendReleasedETH();

    error FailedToSendWithdrawnETH();

    error NoFeesAccrued();
}
