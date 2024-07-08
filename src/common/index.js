const {collectContractNames, GivenOrContractSelect} = require("./contracts");
const {utils, promptClasses, Enquirer} = require("../core");
const GivenOrSolidityVersionSelect = require("./solidity");
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
    promptClasses["plus:hardhat:given-or-solidity-version-select"] = GivenOrSolidityVersionSelect;
}

module.exports = commonExtender;
