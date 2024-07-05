const {GivenOrValidAddressInput: GivenOrValidAddressInput_} = require("../common/addresses");
const {isAddress} = require('viem');
const {Enquirer, promptClasses} = require("../core");
const {GivenOrContractSelect} = require("../common/contracts"); // This module will be available by this point.

/**
 * An input that takes a given value and/or asks and validates
 * the input until a valid address (or account index, if that
 * is given as an index) is given.
 */
class GivenOrValidAddressInput extends GivenOrValidAddressInput_ {
    constructor({...options, hre}) {
        super(options, (v) => {
            return isAddress(v, {strict: true});
        }, async (v) => {
            if (!/^\d+$/.test(v)) return false;
            v = parseInt(v);
            return v >= 0 && v < (await hre.viem.getWalletClients()).length;
        }, async (v) => {
            (await hre.viem.getWalletClients())[parseInt(v)].account.address
        });
    }
}

function viemExtender() {
    Enquirer.GivenOrContractSelect = GivenOrContractSelect;
    promptClasses["hardhat-enquirer-plus:given-or-contract-select"] = GivenOrContractSelect;
}

module.exports = viemExtender;
