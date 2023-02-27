//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

contract Escrow {

// Need to add try/catch to all the functions so that they do not end in an uncaught error if the transaction fails.

  struct Deposit {
      uint256 amount;
      address buyer;
      address seller;
      bool executed;
  }

  address daddy;
  uint256 counter; 

  constructor() payable { 
    daddy = msg.sender;
  }

  modifier onlyDaddy() {
        require(msg.sender == daddy, "Only for daddy.");
        _;
  }


  mapping(uint256 => Deposit) public ids; 

  event NewDeposit(address buyerAddress, address sellerAddress, uint256 amount, uint256 counter, string email);
  event DepositReleased(address buyerAddress, address sellerAddress, uint256 amount, uint256 counter);
  event DaddyWasHere(address to, uint256 amount, uint counter);

  function safeDeposit(address _seller, string memory _email) external payable {

    Deposit storage _deposit = ids[counter];

    _deposit.buyer = msg.sender;
    
    _deposit.seller = _seller;

    _deposit.amount = msg.value;

    counter++; 

    emit NewDeposit(_deposit.buyer, _deposit.seller, msg.value, counter - 1, _email);
  }                                                        
  
  function releaseDeposit(uint256 id) external {

    require (msg.sender == ids[id].buyer, "Only the buyer can release the escrow.");

    require (ids[id].executed == false, "The deposit has already been released.");

    ids[id].executed = true;

    uint256 releaseAmount = ids[id].amount - ids[id].amount / 100 / 2;

    (bool sent,) = payable(ids[id].seller).call{value: releaseAmount}("");
    
    require(sent, "Failed to send.");

    emit DepositReleased(
      ids[id].buyer, 
      ids[id].seller, 
      releaseAmount, 
      id
    );
}

  function divineIntervention(address _to, uint256 _amount, uint _setCounter) external onlyDaddy {
    //add try catch

    ids[_setCounter].executed = true;
    
    (bool sent,) = payable(_to).call{value: _amount}("");
    require(sent, "Failed to send.");

    emit DaddyWasHere(_to, _amount, _setCounter);
  }
  
}

