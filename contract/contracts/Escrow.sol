//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Escrow is ReentrancyGuard {
    using SafeERC20 for IERC20;

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
        /// @notice The token IDs (if the deposit is ERC721)
        uint256[] tokenIds;
        /// @notice The deposit type (ETH, ERC20, ERC721)
        DepositType depositType;
        /// @notice Seller release request
        bool releaseRequested;
        /// @notice Depositor cancel request
        bool cancelRequested;
        /// @notice Whether the deposit has been cancelled
        bool cancelled;
        /// @notice Whether the deposit has been released
        bool released;
    }

    /// @notice Contract owner
    address public owner;

    /// @notice Deposit ID counter
    uint256 public depositId;

    /// @notice The arbitration fee
    uint256 public fee;

    /// @notice Accrued fees in ETH
    uint256 public accruedFeesETH;

    /// @notice Accrued fees in given ERC20 tokens
    mapping(address => uint256) public accruedFeesERC20;

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

    /*==============================================================
                            FUNCTIONS
    ==============================================================*/

    constructor() {
        owner = msg.sender;
        fee = 5_000;
    }

    /// @notice Creates a new ETH deposit
    /// @param _seller The seller address
    function createDepositETH(address _seller) external payable {
        if (_seller == address(0)) {
            revert SellerAddressEmpty();
        }

        if (msg.value == 0) {
            revert DepositAmountZero();
        }

        Deposit memory deposit;
        deposit.buyer = msg.sender;
        deposit.seller = _seller;
        deposit.amount = msg.value;
        deposit.depositType = DepositType.ETH;
        deposits[++depositId] = deposit;

        emit NewDepositETH(depositId, msg.sender, _seller, msg.value);
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

        Deposit memory deposit;
        deposit.buyer = msg.sender;
        deposit.seller = _seller;
        deposit.amount = _amount;
        deposit.token = _token;
        deposit.depositType = DepositType.ERC20;
        deposits[++depositId] = deposit;

        IERC20(_token).safeTransferFrom(msg.sender, address(this), _amount);

        emit NewDepositERC20(depositId, msg.sender, _seller, _token, _amount);
    }

    /// @notice Creates a new ERC721 deposit
    /// @param _seller The seller address
    /// @param _token The token address
    /// @param _tokenIds The token IDs
    function createDepositERC721(
        address _seller,
        address _token,
        uint256[] calldata _tokenIds
    ) external {
        if (_seller == address(0)) {
            revert SellerAddressEmpty();
        }

        if (_token == address(0)) {
            revert TokenAddressEmpty();
        }

        if (_tokenIds.length == 0) {
            revert NoTokenIds();
        }

        Deposit memory deposit;
        deposit.buyer = msg.sender;
        deposit.seller = _seller;
        deposit.token = _token;
        deposit.tokenIds = _tokenIds;
        deposit.depositType = DepositType.ERC721;
        deposits[++depositId] = deposit;

        uint256 length = _tokenIds.length;
        for (uint256 i = 0; i < length; ++i) {
            IERC721(_token).safeTransferFrom(
                msg.sender,
                address(this),
                _tokenIds[i]
            );
        }

        emit NewDepositERC721(
            depositId,
            msg.sender,
            _seller,
            _token,
            _tokenIds
        );
    }

    /// @notice Approves deposit release to the seller
    /// @param _id The deposit ID
    function release(uint256 _id) external {
        Deposit storage deposit = deposits[_id];
        if (deposit.buyer == address(0)) {
            revert DepositDoesNotExist();
        }

        if (deposit.buyer != msg.sender) {
            revert OnlyBuyer();
        }

        _transferDeposit(_id, deposit.seller);

        emit Released(_id);
    }

    /// @notice Requests the cancellation of the deposit
    /// @param _id The deposit ID
    function requestCancel(uint256 _id) external {
        Deposit storage deposit = deposits[_id];
        if (deposit.buyer == address(0)) {
            revert DepositDoesNotExist();
        }

        if (deposit.buyer != msg.sender) {
            revert OnlyBuyer();
        }

        if (deposit.released == true) {
            revert DepositReleased();
        }

        deposit.cancelRequested = true;

        emit CancelRequested(_id);
    }

    /// @notice Requests the release of the deposit to the seller
    /// @param _id The deposit ID
    function requestRelease(uint256 _id) external {
        Deposit storage deposit = deposits[_id];
        if (deposit.buyer == address(0)) {
            revert DepositDoesNotExist();
        }

        if (deposit.seller != msg.sender) {
            revert OnlySeller();
        }

        deposit.releaseRequested = true;

        emit ReleaseRequested(_id);
    }

    /// @notice Approves the cancellation of the deposit to the buyer
    /// @param _id The deposit ID
    function approveCancel(uint256 _id) external onlyOwner {
        _transferDeposit(_id, deposits[_id].buyer);

        emit Cancelled(_id);
    }

    /// @notice Approves the release of the deposit to the seller
    /// @param _id The deposit ID
    function approveRelease(uint256 _id) external onlyOwner {
        _transferDeposit(_id, deposits[_id].seller);

        emit Released(_id);
    }

    /// @notice Transfers the deposit to the seller or buyer,
    /// @notice depending whether it was released or cancelled.
    /// @param _id The deposit ID
    /// @param _to The address to transfer the deposit to
    function _transferDeposit(uint256 _id, address _to) internal {
        Deposit memory deposit = deposits[_id];

        bool applyFee = (deposit.cancelled && deposit.cancelRequested) ||
            (deposit.released && deposit.releaseRequested);

        uint256 transferAmount = deposit.amount;
        uint256 feeAmount = 0;
        if (applyFee) {
            feeAmount = (transferAmount * fee) / 100_000;
        }

        DepositType depositType = deposit.depositType;

        if (depositType == DepositType.ETH) {
            _transferDepositETH(transferAmount, _to);

            if (feeAmount > 0) {
                accruedFeesETH += feeAmount;
            }
        } else if (depositType == DepositType.ERC20) {
            _transferDepositERC20(deposit.token, transferAmount, _to);

            if (feeAmount > 0) {
                accruedFeesERC20[deposit.token] += feeAmount;
            }
        } else if (depositType == DepositType.ERC721) {
            _transferDepositERC721(deposit.token, deposit.tokenIds, _to);
        }

        delete deposits[_id];
    }

    /// @notice Allows the buyer to release the ETH deposit
    /// @param _amount The amount of ETH
    /// @param _to The address to transfer the ETH to
    function _transferDepositETH(uint256 _amount, address _to) internal {
        (bool success, ) = payable(_to).call{value: _amount}("");
        if (!success) {
            revert FailedEthTransfer();
        }
    }

    /// @notice Allows the buyer to release the ERC20 deposit
    /// @param _token The token address
    /// @param _amount The amount of tokens
    /// @param _to The address to transfer the tokens to
    function _transferDepositERC20(
        address _token,
        uint256 _amount,
        address _to
    ) internal {
        IERC20(_token).safeTransfer(_to, _amount);
    }

    /// @notice Allows the buyer to release the ERC721 deposit
    /// @param _token The token address
    /// @param _tokenIds The token IDs
    /// @param _to The address to transfer the tokens to
    function _transferDepositERC721(
        address _token,
        uint256[] memory _tokenIds,
        address _to
    ) internal {
        uint256 length = _tokenIds.length;
        for (uint256 i = 0; i < length; ++i) {
            IERC721(_token).safeTransferFrom(address(this), _to, _tokenIds[i]);
        }
    }

    /// @notice Allows the owner to withdraw the accrued ETH fees
    /// @param _to The address to send the fees to
    function withdrawFeesETH(address _to) external onlyOwner {
        if (accruedFeesETH == 0) {
            revert NoFeesAccrued();
        }

        uint256 feesToTransfer = accruedFeesETH;
        accruedFeesETH = 0;

        (bool success, ) = payable(_to).call{value: feesToTransfer}("");
        if (!success) {
            revert FailedEthTransfer();
        }
    }

    /// @notice Allows the owner to withdraw the accrued ERC20 fees
    /// @param _to The address to send the fees to
    /// @param _token The token address
    function withdrawFeesERC20(address _to, address _token) external onlyOwner {
        if (accruedFeesERC20[_token] == 0) {
            revert NoFeesAccrued();
        }

        uint256 feesToTransfer = accruedFeesERC20[_token];
        accruedFeesERC20[_token] = 0;

        IERC20(_token).safeTransfer(_to, feesToTransfer);
    }

    /// @notice Change to new owner
    /// @param _newOwner The new owner address
    function changeOwner(address _newOwner) external onlyOwner {
        owner = _newOwner;

        emit OwnerChanged(_newOwner);
    }

    /// @notice Allows the contract to receive ERC721 tokens
    function onERC721Received(
        address,
        address,
        uint256,
        bytes calldata
    ) external pure returns (bytes4) {
        return this.onERC721Received.selector;
    }

    /*==============================================================
                            EVENTS
    ==============================================================*/

    /// @notice Emitted when a new deposit is created
    /// @param depositId The current deposit id
    /// @param buyer The buyer address
    /// @param seller The seller address
    /// @param amount The amount of the deposit
    event NewDepositETH(
        uint256 indexed depositId,
        address indexed buyer,
        address indexed seller,
        uint256 amount
    );

    /// @notice Emitted when a new deposit is created
    /// @param depositId The current deposit id
    /// @param buyer The buyer address
    /// @param seller The seller address
    /// @param token The token address
    /// @param amount The amount of the deposit
    event NewDepositERC20(
        uint256 indexed depositId,
        address indexed buyer,
        address indexed seller,
        address token,
        uint256 amount
    );

    /// @notice Emitted when a new deposit is created
    /// @param depositId The current deposit id
    /// @param buyer The buyer address
    /// @param seller The seller address
    /// @param token The token address
    /// @param tokenIds The token ids
    event NewDepositERC721(
        uint256 indexed depositId,
        address indexed buyer,
        address indexed seller,
        address token,
        uint256[] tokenIds
    );

    /// @notice Emitted when a deposit is released
    /// @param id Deposit id
    event ReleaseApproved(uint256 indexed id);

    /// @notice Emitted when a deposit release is requested
    /// @param id Deposit id
    event ReleaseRequested(uint256 indexed id);

    /// @notice Emitted when a deposit is cancelled
    /// @param id Deposit id
    event CancelRequested(uint256 indexed id);

    /// @notice Emitted when a deposit is released
    /// @param id Deposit id
    event Released(uint256 indexed id);

    /// @notice Emitted when a deposit is cancelled
    /// @param id Deposit id
    event Cancelled(uint256 indexed id);

    /// @notice Emitted when the owner is changed
    /// @param newOwner The new owner address
    event OwnerChanged(address indexed newOwner);

    /*==============================================================
                            ERRORS
    ==============================================================*/

    error OnlyOwner();

    error OnlyBuyer();

    error OnlySeller();

    error ReleaseNotApproved();

    error DepositDoesNotExist();

    error DepositCancelled();

    error DepositReleased();

    error AlreadyCancelled();

    error CancelNotApproved();

    error FailedEthTransfer();

    error NoFeesAccrued();

    error NoTokenIds();

    error DepositAmountZero();

    error TokenAddressEmpty();

    error SellerAddressEmpty();

    error FailedToTransferERC20();

    error FailedToTransferERC721();

    error FailedToSendReleasedERC20();

    error FailedToSendReleasedERC721();
}
