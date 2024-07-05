const {GivenOrValidAddressInput: GivenOrValidAddressInput_} = require("../common/addresses");

class GivenOrValidAddressInput extends GivenOrValidAddressInput_ {
    constructor(options, hre) {
        super(options, (v) => {
            return hre.viem
        }, (v) => {

        }, async (v) => {
            (await hre.viem.getWalletClients())[0].account.address
        });
    }
}

function viemExtender() {

}

module.exports = viemExtender;
