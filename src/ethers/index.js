const {GivenOrValidAddressInput: GivenOrValidAddressInput_} = require("../common/addresses");
const {GivenOrValidAccountInput: GivenOrValidAccountInput_} = require("../common/accounts");
const {Enquirer, promptClasses} = require("../core");

function validateAccount(hre) {
    return async (v) => {
        if (!/^\d+$/.test(v)) return false;
        v = parseInt(v);
        return v >= 0 && v < (await hre.ethers.getSigners()).length;
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
            try {
                hre.ethers.getAddress(v);
                return true;
            } catch(e) {
                return false;
            }
        }, validateAccount, async (v) => {
            return (await hre.ethers.getSigners())[parseInt(v)].address;
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
            return (await hre.ethers.getSigners())[parseInt(v)];
        });
    }
}

function ethersExtender() {
    Enquirer.GivenOrValidAddressInput = GivenOrValidAddressInput;
    Enquirer.GivenOrValidAccountInput = GivenOrValidAccountInput;
    promptClasses["hardhat-enquirer-plus:given-or-valid-address-input"] = GivenOrValidAddressInput;
    promptClasses["hardhat-enquirer-plus:given-or-valid-account-input"] = GivenOrValidAccountInput;
}

module.exports = ethersExtender;
