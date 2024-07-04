const {extendEnvironment} = require("hardhat/config");

extendEnvironment((hre) => {
    const commonExtender = require("./common");
    commonExtender(hre);
    if (hre.ethers) {
        const ethersExtender = require("./ethers");
        ethersExtender(hre);
    }
    if (hre.viem) {
        const viemExtender = require("./viem");
        viemExtender(hre);
    }
});

module.exports = {};
