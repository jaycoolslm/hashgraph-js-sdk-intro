// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract TestContract {
    function returnString(
        string calldata _input
    ) public pure returns (string calldata) {
        return _input;
    }
}
