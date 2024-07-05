const {extendEnvironment} = require("hardhat/config");
const {Enquirer, utils} = require("./core");

extendEnvironment((hre) => {
    const commonExtender = require("./common");
    commonExtender();
    if (hre.ethers) {
        const ethersExtender = require("./ethers");
        ethersExtender();
    }
    if (hre.viem) {
        const viemExtender = require("./viem");
        viemExtender();
    }

    hre.enquirerPlus = {
        Enquirer, utils
    };
});

module.exports = {};
