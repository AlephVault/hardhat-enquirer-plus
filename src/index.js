function installEnquirerPlus(hre, modules) {
    const {Enquirer, utils, promptClasses} = modules.core;
    const fixedpoint = modules.fixedpoint.default ?? modules.fixedpoint;
    const {collectContractNames, GivenOrContractSelect: GivenOrContractSelect_} = modules.contracts;
    const {GivenOrSolidityVersionSelect: GivenOrSolidityVersionSelect_} = modules.solidity;
    const {GivenOrValidTokenAmountInput, tokenAmounts} = modules.tokens;
    const {GivenOrValidAddressInput: GivenOrValidAddressInput_} = modules.addresses;
    const {GivenOrValidAccountInput: GivenOrValidAccountInput_} = modules.accounts;
    const {GivenOrDeployedContractSelect: GivenOrDeployedContractSelect_, listDeployedContracts} = modules.deployments;

    utils.fixedpoint = fixedpoint;
    utils.contractNames = collectContractNames;
    utils.tokenAmounts = tokenAmounts;
    utils.registerPromptClass = (classId, type) => {
        if (promptClasses[classId]) {
            throw new Error(`Class id ${classId} already registered`);
        }
        promptClasses[classId] = type;
    }

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
    promptClasses["plus:hardhat:given-or-valid-token-amount-input"] = GivenOrValidTokenAmountInput;
    promptClasses["plus:hardhat:given-or-solidity-version-select"] = GivenOrSolidityVersionSelect;
    promptClasses["plus:hardhat:given-or-valid-address-input"] = GivenOrValidAddressInput;
    promptClasses["plus:hardhat:given-or-valid-account-input"] = GivenOrValidAccountInput;
    promptClasses["plus:hardhat:given-or-deployed-contract-select"] = GivenOrDeployedContractSelect;
    hre.enquirerPlus = {
        Enquirer, utils
    };

    if (hre.ignition) {
        hre.ignition.listDeployedContracts = (deploymentId) => listDeployedContracts(hre, deploymentId);
    }
}

const hardhatEnquirerPlusPlugin = {
    id: "hardhat-enquirer-plus",
    npmPackage: "hardhat-enquirer-plus",
    hookHandlers: {
        hre: async () => ({
            default: async () => ({
                created: async (_context, hre) => {
                    const modules = {
                        core: await import("./core.js"),
                        fixedpoint: await import("./fixedpoint.js"),
                        contracts: await import("./contracts.js"),
                        solidity: await import("./solidity.js"),
                        tokens: await import("./tokens.js"),
                        addresses: await import("./addresses.js"),
                        accounts: await import("./accounts.js"),
                        deployments: await import("./deployments.js"),
                    };
                    installEnquirerPlus(hre, modules);
                },
            }),
        }),
    },
};

export default hardhatEnquirerPlusPlugin;
