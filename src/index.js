const {extendEnvironment} = require("hardhat/config");
const {Enquirer, utils, promptClasses} = require("./core");
const fixedpoint = require("./fixedpoint");
const {collectContractNames, GivenOrContractSelect: GivenOrContractSelect_} = require("./contracts");
const {GivenOrSolidityVersionSelect: GivenOrSolidityVersionSelect_} = require("./solidity");
const {GivenOrValidTokenAmountInput, tokenAmounts} = require("./tokens");
const {GivenOrValidAddressInput: GivenOrValidAddressInput_} = require("./addresses");
const {GivenOrValidAccountInput: GivenOrValidAccountInput_} = require("./accounts");
const {GivenOrDeployedContractSelect: GivenOrDeployedContractSelect_} = require("./deployments");

extendEnvironment((hre) => {
    utils.fixedpoint = fixedpoint;
    utils.contractNames = collectContractNames;
    utils.tokenAmounts = tokenAmounts;

    class GivenOrContractSelect extends GivenOrContractSelect_ {
        constructor(options) {
            super({hre, ...options});
        }
    }

    class GivenOrSolidityVersionSelect extends GivenOrSolidityVersionSelect_ {
        constructor(options) {
            super({hre, ...options});
        }
    }

    class GivenOrValidAddressInput extends GivenOrValidAddressInput_ {
        constructor(options) {
            super({hre, ...options});
        }
    }

    class GivenOrValidAccountInput extends GivenOrValidAccountInput_ {
        constructor(options) {
            super({hre, ...options});
        }
    }

    class GivenOrDeployedContractSelect extends GivenOrDeployedContractSelect_ {
        constructor(options) {
            super({hre, ...options});
        }
    }

    Enquirer.GivenOrContractSelect = GivenOrContractSelect;
    Enquirer.GivenOrValidTokenAmountInput = GivenOrValidTokenAmountInput;
    Enquirer.GivenOrSolidityVersionSelect = GivenOrSolidityVersionSelect;
    Enquirer.GivenOrValidAddressInput = GivenOrValidAddressInput;
    Enquirer.GivenOrValidAccountInput = GivenOrValidAccountInput;
    Enquirer.GivenOrDeployedContractSelect = GivenOrDeployedContractSelect;
    promptClasses["plus:hardhat:given-or-contract-select"] = GivenOrContractSelect;
    promptClasses["plus:hardhat:given-or-token-amount-input"] = GivenOrValidTokenAmountInput;
    promptClasses["plus:hardhat:given-or-solidity-version-select"] = GivenOrSolidityVersionSelect;
    promptClasses["plus:hardhat:given-or-valid-address-input"] = GivenOrValidAddressInput;
    promptClasses["plus:hardhat:given-or-valid-account-input"] = GivenOrValidAccountInput;
    promptClasses["plus:hardhat:given-or-deployed-contract-select"] = GivenOrDeployedContractSelect;
    hre.enquirerPlus = {
        Enquirer, utils
    };
});

module.exports = {};
