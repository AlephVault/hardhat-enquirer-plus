const {GivenOrValidAddressInput: GivenOrValidAddressInput_} = require("../common/addresses");
const {GivenOrValidAccountInput: GivenOrValidAccountInput_} = require("../common/accounts");
const {isAddress} = require('viem');
const {Enquirer, promptClasses} = require("../core");

function validateAccount(hre) {
    return async (v) => {
        if (typeof v === "string") {
            if (!/^\d+$/.test(v)) return false;
            v = parseInt(v);
            return v >= 0 && v < (await hre.viem.getWalletClients()).length;
        } else return !!(v && v.account && v.account.address);
    }
}

/**
 * An input that takes a given value and/or asks and validates
 * the input until a valid address (or account index, if that
 * is given as an index) is given.
 */
class GivenOrValidAddressInput extends GivenOrValidAddressInput_ {
    constructor({hre, ...options}) {
        super(options, (v) => {
            return isAddress(v, {strict: true});
        }, validateAccount(hre), async (v) => {
            return (await hre.viem.getWalletClients())[parseInt(v)].account.address
        });
    }
}

/**
 * An input that takes a given value and/or asks and validates
 * the input until a valid account index is given.
 */
class GivenOrValidAccountInput extends GivenOrValidAccountInput_ {
    constructor({hre, ...options}) {
        super(options, validateAccount(hre), async (v) => {
            return (await hre.viem.getWalletClients())[parseInt(v)];
        });
    }
}

function viemExtender() {
    Enquirer.GivenOrValidAddressInput = GivenOrValidAddressInput;
    Enquirer.GivenOrValidAccountInput = GivenOrValidAccountInput;
    promptClasses["plus:hardhat:given-or-valid-address-input"] = GivenOrValidAddressInput;
    promptClasses["plus:hardhat:given-or-valid-account-input"] = GivenOrValidAccountInput;
}

module.exports = viemExtender;
