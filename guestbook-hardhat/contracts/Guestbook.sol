// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

contract Guestbook {
  // ----- State variables -----
  // Max number of signatures.
  uint8 public maxNumberOfSignatures;
  // Signature counter
  uint8 public numberOfSignatures;

  // Create struct Signature
  struct Signature {
    address id;
    string name;
    string message;
    uint time;
  }

  // lets test this...
  mapping(address => Signature) public guestbookSignatures;

  // We initialize maxNumberOfSignatures i.e. the length of the guestbook.
  constructor(uint8 _maxNumberOfSignatures){
    maxNumberOfSignatures = _maxNumberOfSignatures;
  }

  // Create the signature added event
  event SignatureAdded(address indexed sender, string message);

  // The function for adding a new signature on th guestbook
  function signGuestbook(string memory _name, string memory _message) public {
    // validation that makes sure that the guestbook is not filled, the name is not empty,
    // the message is not empy and that the user hasnt already signed the guestbook.
    require(numberOfSignatures <  maxNumberOfSignatures, "The guestbook is filled!");
    require(bytes(_name).length > 0, "Please enter your name!");
    require(bytes(_message).length > 0, "Please enter a message!");

    // Create and add the new signature to the mapping guestbookSignatures
    guestbookSignatures[msg.sender] = Signature(msg.sender, _name, _message, block.timestamp);

    // Emit the new signature event
    emit SignatureAdded(msg.sender, "Guestbook signed!");
    // Increment the number of signatures
    numberOfSignatures = numberOfSignatures + 1;
  }
}