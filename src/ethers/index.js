const {GivenOrValidAddressInput: GivenOrValidAddressInput_} = require("../common/addresses");

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

}

module.exports = ethersExtender;
