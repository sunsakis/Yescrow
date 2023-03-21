// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract TestERC721 is ERC721 {
    constructor(address[] memory _to) ERC721("TestERC721", "T721") {
        for (uint i = 0; i < _to.length; i++) {
            for (uint j = 0; j < 5; j++) {
                _safeMint(_to[i], i * 5 + j);
            }
        }
    }
}
