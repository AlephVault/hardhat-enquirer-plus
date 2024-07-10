const path = require("path");
const fs = require("fs");
const Enquirer_ = require("enquirer-plus");
const {getHRE} = require("./hre");

/**
 * Lists all the deployed contract ids in a deployment id.
 * @param hre The hardhat runtime environment.
 * @param deploymentId The deployment id to get the contracts from.
 * @returns {Promise<string[]>} The list of contract ids.
 */
async function listDeployedContracts(hre, deploymentId) {
    const fullPath = path.resolve(
        hre.config.paths.root, "ignition", "deployments", deploymentId, "deployed_addresses.json"
    );
    return Object.keys(JSON.parse(fs.readFileSync(fullPath, {encoding: 'utf8'})));
}

/**
 * A Select prompt to choose a deployed ignition contract in the current network.
 */
class GivenOrDeployedContractSelect extends Enquirer_.GivenOrSelect {
    constructor({hre, deploymentId, ...options}) {
        hre = hre || getHRE();
        if (!hre) {
            throw new Error(
                "This prompt type can only be used when hardhat-enquirer-plus is installed " +
                "as a plug-in in a hardhat project"
            );
        }
        super({...options, choices: ["Loading..."]});
        this._deploymentId = deploymentId;
        this._hre = hre;
    }

    async listDeployedContracts() {
        const deploymentId = this._deploymentId || `chain-${(await this._hre.common.getChainId())}`;
        return listDeployedContracts(this._hre, deploymentId);
    }

    async run() {
        const deployedContracts = await this.listDeployedContracts();
        this.choices = deployedContracts;
        this.options.choices = deployedContracts;
        return await super.run();
    }
}

module.exports = {
    listDeployedContracts, GivenOrDeployedContractSelect
}