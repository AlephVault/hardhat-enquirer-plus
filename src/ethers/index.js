const {GivenOrValidAddressInput: GivenOrValidAddressInput_} = require("../common/addresses");

class GivenOrValidAddressInput extends GivenOrValidAddressInput_ {
    constructor(options, hre) {
        super(options, (v) => {

        }, (v) => {

        }, async (v) => {
            return (await hre.ethers.getSigners())[parseInt(v)].address;
        });
    }
}

function ethersExtender() {

}

module.exports = ethersExtender;
