const path = require("path");
const fs = require("fs");
const Enquirer_ = require("enquirer-plus");

/**
 * Returns the JSON file of deployed addresses.
 */
async function getDeployedAddressesJsonContent(hre, deploymentId) {
    deploymentId = deploymentId || `chain-${(await hre.common.getChainId())}`;
    const fullPath = path.resolve(
        hre.config.paths.root, "ignition", "deployments", deploymentId, "deployed_addresses.json"
    );
    return JSON.parse(fs.readFileSync(fullPath, {encoding: 'utf8'}));
}

/**
 * Lists all the deployed contract ids in a deployment id.
 * @param hre The hardhat runtime environment.
 * @param deploymentId The deployment id to get the contracts from.
 * @returns {Promise<Array[]>} The list of contract ids.
 */
async function listDeployedContracts(hre, deploymentId) {
    return Object.entries(await getDeployedAddressesJsonContent(hre, deploymentId));
}

/**
 * A Select prompt to choose a deployed ignition contract in the current network.
 */
class GivenOrDeployedContractSelect extends Enquirer_.GivenOrSelect {
    constructor({hre, deploymentId, returnAddress, ...options}) {
        super({...options, choices: ["Loading..."]});
        this._deploymentId = deploymentId;
        this._returnAddress = returnAddress;
        this._hre = hre;
    }

    async run() {
        const deployedContracts = (await listDeployedContracts(this._hre, this._deploymentId)).map(([id, addr]) => {
            return {name: this._returnAddress ? addr : id, message: id};
        });
        this.choices = deployedContracts;
        this.options.choices = deployedContracts;
        const deploymentContractId = await super.run();
        if (!this._returnAddress) {
            return deploymentContractId;
        } else {
            return (await getDeployedAddressesJsonContent(this._hre, this._deploymentId))[deploymentContractId];
        }
    }
}

module.exports = {
    listDeployedContracts, GivenOrDeployedContractSelect
}