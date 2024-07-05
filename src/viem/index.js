const {GivenOrValidAddressInput: GivenOrValidAddressInput_} = require("../common/addresses");
const {isAddress} = require('viem'); // This module will be available by this point.

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

}

module.exports = viemExtender;
