const contracts = require("./contracts");

function commonExtender(hre) {
    hre.enquirerPlus ||= {};
    hre.enquirerPlus.utils ||= {};
    hre.enquirerPlus.utils.decimals = require("./decimals");
    hre.enquirerPlus.utils.collectContractNames = () => collectContractNames(hre);
}

module.exports = commonExtender;
