// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TestERC20 is ERC20 {
    constructor(address[] memory _to) ERC20("TestERC20", "T20") {
      for (uint i = 0; i < _to.length; i++) {
        _mint(_to[i], 10_000 ether);
      }
    }
}