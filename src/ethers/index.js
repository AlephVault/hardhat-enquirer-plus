const {GivenOrValidAddressInput: GivenOrValidAddressInput_} = require("../common/addresses");
const {Enquirer, promptClasses} = require("../core");
const {GivenOrContractSelect} = require("../common/contracts");

/**
 * An input that takes a given value and/or asks and validates
 * the input until a valid address (or account index, if that
 * is given as an index) is given.
 */
class GivenOrValidAddressInput extends GivenOrValidAddressInput_ {
    constructor({...options, hre}) {
        super(options, (v) => {
            try {
                hre.ethers.getAddress(v);
                return true;
            } catch(e) {
                return false;
            }
        }, async (v) => {
            if (!/^\d+$/.test(v)) return false;
            v = parseInt(v);
            return v >= 0 && v < (await hre.ethers.getSigners()).length;
        }, async (v) => {
            return (await hre.ethers.getSigners())[parseInt(v)].address;
        });
    }
}

function ethersExtender() {
    Enquirer.GivenOrContractSelect = GivenOrContractSelect;
    promptClasses["hardhat-enquirer-plus:given-or-contract-select"] = GivenOrContractSelect;
}

module.exports = ethersExtender;
