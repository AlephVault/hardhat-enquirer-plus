const {extendEnvironment} = require("hardhat/config");
const {Enquirer, utils} = require("./core");

extendEnvironment((hre) => {
    const commonExtender = require("./common");
    commonExtender(hre);
    hre.enquirerPlus = {
        Enquirer, utils
    };
});

module.exports = {};
