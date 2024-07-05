const Enquirer_ = require("enquirer-plus");

/**
 * An input that takes a given value and/or asks and validates
 * the input until a valid address (or account index, if that
 * is allowed as an option) is given.
 */
class GivenOrValidAddressInput extends Enquirer_.GivenOrValidInput {

}

function ethersExtender(hre) {

}

module.exports = ethersExtender;
