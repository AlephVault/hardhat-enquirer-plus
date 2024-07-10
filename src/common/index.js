const {collectContractNames, GivenOrContractSelect} = require("./contracts");
const {utils, promptClasses, Enquirer} = require("../core");
const {GivenOrSolidityVersionSelect} = require("./solidity");
const {GivenOrValidTokenAmountInput} = require("./tokens");
const {GivenOrValidAddressInput} = require("./addresses");
const {GivenOrValidAccountInput} = require("./accounts");
const {GivenOrDeployedContractSelect} = require("./deployments");
const fixedpoint = require("./fixedpoint");
const tokenAmounts = require("./tokens");

function commonExtender(hre) {
    utils.fixedpoint = fixedpoint;
    utils.contractNames = collectContractNames;
    utils.tokenAmounts = tokenAmounts;
    // TODO: Actually, create one subclass for each of these, dynamically providing
    //       the hre instance among the options, and get rid of the setHRE calls.
    Enquirer.GivenOrSolidityVersionSelect = GivenOrSolidityVersionSelect;
    Enquirer.GivenOrContractSelect = GivenOrContractSelect;
    Enquirer.GivenOrValidTokenAmountInput = GivenOrValidTokenAmountInput;
    Enquirer.GivenOrValidAddressInput = GivenOrValidAddressInput;
    Enquirer.GivenOrValidAccountInput = GivenOrValidAccountInput;
    Enquirer.GivenOrDeployedContractSelect = GivenOrDeployedContractSelect;
    promptClasses["plus:hardhat:given-or-contract-select"] = GivenOrContractSelect;
    promptClasses["plus:hardhat:given-or-token-amount-input"] = GivenOrValidTokenAmountInput;
    promptClasses["plus:hardhat:given-or-solidity-version-select"] = GivenOrSolidityVersionSelect;
    promptClasses["plus:hardhat:given-or-valid-address-input"] = GivenOrValidAddressInput;
    promptClasses["plus:hardhat:given-or-valid-account-input"] = GivenOrValidAccountInput;
    promptClasses["plus:hardhat:given-or-deployed-contract-select"] = GivenOrDeployedContractSelect;
}

module.exports = commonExtender;
