const path = require("path");
const fs = require("fs");
const Enquirer_ = require("enquirer-plus");

/**
 * Lists all the deployed contract ids in a deployment id.
 * @param hre The hardhat runtime environment.
 * @param deploymentId The deployment id to get the contracts from.
 * @returns {Promise<string[]>} The list of contract ids.
 */
async function listDeployedContracts(hre, deploymentId) {
    deploymentId = deploymentId || `chain-${(await hre.common.getChainId())}`;
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
        super({...options, choices: ["Loading..."]});
        this._deploymentId = deploymentId;
        this._hre = hre;
    }

    async run() {
        const deployedContracts = (await listDeployedContracts(this._hre, this._deploymentId)).map((e) => {
            return {name: e, message: e};
        });
        this.choices = deployedContracts;
        this.options.choices = deployedContracts;
        return await super.run();
    }
}

module.exports = {
    listDeployedContracts, GivenOrDeployedContractSelect
}