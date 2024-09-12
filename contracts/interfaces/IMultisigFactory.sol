// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.24;

import {Multisig} from '../Multisig.sol';

interface IMultisigFactory {

    function createMultisigClone(uint256 _quorum, address[] memory _validSigners) external returns(Multisig multisig_, uint256 length_);

    function getMultisigs() external view returns(Multisig[] memory multisigs_);
}