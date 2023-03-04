// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

contract Guestbook {
  // Max number of signatures.
  uint8 public maxNumberOfSignatures;
    // Max length of name.
  uint8 public maxLengthOfName;
    // Max number of message.
  uint8 public maxLengthOfMessage;
  // Signature counter
  uint8 public numberOfSignatures;

  // Create struct Signature
  struct Signature {
    address id;
    string name;
    string message;
    uint time;
  }

  Signature[] public guestbookSignatures;
  mapping(address => bool) public guestbookAddressesLog;

  // We initialize maxNumberOfSignatures i.e. the length of the guestbook.
  constructor(uint8 _maxNumberOfSignatures, uint8 _maxLengthOfName, uint8 _maxLengthOfMessage){
    maxNumberOfSignatures = _maxNumberOfSignatures;
    maxLengthOfName = _maxLengthOfName;
    maxLengthOfMessage = _maxLengthOfMessage;
  }

  // Create the signature added event
  event SignatureAdded(address indexed sender, string message);

  // The function for adding a new signature on the guestbook
  function signGuestbook(string memory _name, string memory _message) public {
    require(numberOfSignatures <  maxNumberOfSignatures, "The guestbook is filled!");
    require(bytes(_name).length > 0, "Please enter your name!");
    require(bytes(_name).length <= maxLengthOfName, "Please enter a shorter name!");
    require(bytes(_message).length > 0, "Please enter a message!");
    require(bytes(_message).length > maxLengthOfMessage, "Please enter a shorter message!");
    require(guestbookAddressesLog[msg.sender] == false, "You have already signed the guestbook!");

    guestbookSignatures.push(Signature(msg.sender, _name, _message, block.timestamp));
    guestbookAddressesLog[msg.sender] = true;
    numberOfSignatures = numberOfSignatures + 1;

    emit SignatureAdded(msg.sender, "Guestbook signed!");
  }

  function getGuestbookSignatures() public view returns(Signature[] memory){
    return guestbookSignatures;
  }
}