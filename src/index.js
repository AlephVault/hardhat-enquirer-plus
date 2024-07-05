const {extendEnvironment} = require("hardhat/config");
const {Enquirer, utils} = require("./core");

extendEnvironment((hre) => {
    const commonExtender = require("./common");
    commonExtender();
    if (hre.ethers) {
        const ethersExtender = require("./ethers");
        ethersExtender(hre);
    }
    if (hre.viem) {
        const viemExtender = require("./viem");
        viemExtender(hre);
    }

    hre.enquirerPlus = {
        Enquirer, utils
    };
});

module.exports = {};
