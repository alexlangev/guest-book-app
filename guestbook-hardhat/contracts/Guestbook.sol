// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.17;

contract Guestbook {
  uint public immutable MAX_NUM_SIGN;
  uint public immutable MAX_NAME_LENGTH;
  uint public immutable MAX_MSG_LENGTH;
  uint public numOfSign;

  struct Signature {
    address addr;
    string message;
    string name;
    uint timestamp;
  }

  mapping(address => bool) public signatureLog;

  Signature[] public signatures;

  event SignatureCreated(address indexed addr, uint timestamp);

  constructor(uint _maxNumSign, uint _maxNameLength, uint _maxMsgLength) {
    require(_maxNumSign > 0);
    require(_maxNameLength > 0 && _maxNameLength <= type(uint).max);
    require(_maxMsgLength > 0 && _maxMsgLength <= type(uint).max);

    MAX_NUM_SIGN = _maxNumSign;
    MAX_NAME_LENGTH = _maxNameLength;
    MAX_MSG_LENGTH = _maxMsgLength;
  }

  function getAllSignatures() public view returns (Signature[] memory){
    return signatures;
  }

  function getHasUserSigned() public view returns (bool) {
    return signatureLog[msg.sender];
  }

  function addSignature(string memory _msg, string memory _name) public {
    require(signatureLog[msg.sender] == false);
    require(numOfSign < MAX_NUM_SIGN);
    // require string length
    signatures.push(Signature(msg.sender, _msg, _name, block.timestamp));
    signatureLog[msg.sender] = true;
    numOfSign += 1;
    emit SignatureCreated(msg.sender, block.timestamp);
  }
}