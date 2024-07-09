const {GivenOrValidAddressInput: GivenOrValidAddressInput_} = require("../common/addresses");
const {GivenOrValidAccountInput: GivenOrValidAccountInput_} = require("../common/accounts");
const {isAddress} = require('viem');
const {Enquirer, promptClasses} = require("../core");
const {getHRE} = require("../common/hre");
const {GivenOrDeployedContractSelect: GivenOrDeployedContractSelect_, listDeployedContracts} = require("../common/deployments");

function validateAccount(hre) {
    return async (v) => {
        if (typeof v === "string") {
            if (!/^\d+$/.test(v)) return false;
            v = parseInt(v);
            return v >= 0 && v < (await hre.viem.getWalletClients()).length;
        } else return !!(v && v.account && v.account.address);
    }
}

/**
 * An input that takes a given value and/or asks and validates
 * the input until a valid address (or account index, if that
 * is given as an index) is given.
 */
class GivenOrValidAddressInput extends GivenOrValidAddressInput_ {
    constructor({hre, ...options}) {
        hre = hre || getHRE();
        if (!hre) {
            throw new Error(
                "This prompt type can only be used when hardhat-enquirer-plus is installed " +
                "as a plug-in in a hardhat project"
            );
        }
        super(options, (v) => {
            return isAddress(v, {strict: true});
        }, validateAccount(hre), async (v) => {
            return (await hre.viem.getWalletClients())[parseInt(v)].account.address
        });
    }
}

/**
 * An input that takes a given value and/or asks and validates
 * the input until a valid account index is given.
 */
class GivenOrValidAccountInput extends GivenOrValidAccountInput_ {
    constructor({hre, ...options}) {
        hre = hre || getHRE();
        if (!hre) {
            throw new Error(
                "This prompt type can only be used when hardhat-enquirer-plus is installed " +
                "as a plug-in in a hardhat project"
            );
        }
        super(options, validateAccount(hre), async (v) => {
            return (await hre.viem.getWalletClients())[parseInt(v)];
        });
    }
}

async function normalizeDeploymentId(hre, deploymentId) {
    const chainId = await (await hre.viem.getWalletClients())[0].getChainId()
    return deploymentId || `chain-${chainId}`;
}

/**
 * A Select prompt to choose a deployed ignition contract in the current network.
 */
class GivenOrDeployedContractSelect extends GivenOrDeployedContractSelect_ {
    constructor({hre, deploymentId, ...options}) {
        super({hre, deploymentId, ...options});
    }

    async getChainId() {
        return await (await this._hre.viem.getWalletClients())[0].getChainId();
    }
}

function viemExtender() {
    Enquirer.GivenOrValidAddressInput = GivenOrValidAddressInput;
    Enquirer.GivenOrValidAccountInput = GivenOrValidAccountInput;
    Enquirer.GivenOrDeployedContractSelect = GivenOrDeployedContractSelect;
    promptClasses["plus:hardhat:given-or-valid-address-input"] = GivenOrValidAddressInput;
    promptClasses["plus:hardhat:given-or-valid-account-input"] = GivenOrValidAccountInput;
    promptClasses["plus:hardhat:given-or-deployed-contract-select"] = GivenOrDeployedContractSelect;
}

module.exports = viemExtender;
