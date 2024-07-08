const {extendEnvironment} = require("hardhat/config");
const {Enquirer, utils} = require("./core");
const {setHRE} = require("./common/hre");

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

    setHRE(hre);
    hre.enquirerPlus = {
        Enquirer, utils
    };
});

module.exports = {};
