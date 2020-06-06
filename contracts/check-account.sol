// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract CheckAccount is Ownable {
    struct Query {
        address sender;
        bool queried;
        uint256 balance;
    }

    Query[] private queries;

    function registerBalance(address sender) public {
        queries.push(Query({sender: sender, queried: true, balance: sender.balance}));
    }

    function retrieveBalance(address sender) public view returns (uint256) {
        return address(sender).balance;
    }

    function hasQueried(address someone) public onlyOwner view returns (bool) {
        for (uint256 i = 0; i < queries.length; i++) {
            if (queries[i].sender == someone && queries[i].queried) {
                return true;
            }
        }
        return false;
    }
}