const {collectContractNames, GivenOrContractSelect} = require("./contracts");
const {utils, promptClasses, Enquirer} = require("../core");

function commonExtender() {
    utils.decimals = require("./decimals");
    utils.contractNames = collectContractNames;
    Enquirer.GivenOrContractSelect = GivenOrContractSelect;
    promptClasses["plus:hardhat:given-or-contract-select"] = GivenOrContractSelect;
}

module.exports = commonExtender;
