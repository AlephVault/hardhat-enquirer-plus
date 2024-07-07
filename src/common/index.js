const {collectContractNames, GivenOrContractSelect} = require("./contracts");
const {utils, promptClasses, Enquirer} = require("../core");
const {GivenOrValidTokenAmountInput} = require("./tokens");
const fixedpoint = require("./fixedpoint");
const tokenAmounts = require("./tokens");

function commonExtender() {
    utils.fixedpoint = fixedpoint;
    utils.contractNames = collectContractNames;
    utils.tokenAmounts = tokenAmounts;
    Enquirer.GivenOrContractSelect = GivenOrContractSelect;
    Enquirer.GivenOrValidTokenAmountInput = GivenOrValidTokenAmountInput;
    promptClasses["plus:hardhat:given-or-contract-select"] = GivenOrContractSelect;
    promptClasses["plus:hardhat:given-or-token-amount-input"] = GivenOrValidTokenAmountInput;
}

module.exports = commonExtender;
