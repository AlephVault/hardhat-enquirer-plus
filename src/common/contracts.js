const Enquirer_ = require("enquirer-plus");
const pathsUtils = require("./paths");
const fs = require("fs");
const path = require("path");
const {getHRE} = require("./hre");

/**
 * Collects all the contract names from the compiled artifacts.
 * @param hre The hardhat runtime environment.
 * @returns {*[]} The list of contract names.
 */
function collectContractNames(hre) {
    let contractNames = [];
    let contractArtifactsDirectoryName = path.resolve(hre.config.paths.artifacts, "contracts");
    let startPos = contractArtifactsDirectoryName.length + 1;
    let stat = fs.statSync(contractArtifactsDirectoryName);
    if (stat.isDirectory()) {
        pathsUtils.traverseDirectory(contractArtifactsDirectoryName, (subPath, filename) => {
            if (filename.endsWith('.json') && !filename.endsWith('.dbg.json')) {
                const contractName = path.basename(filename, '.json');
                contractNames.push({
                    name: contractName,
                    path: subPath.substring(startPos)
                });
            }
        });
    }

    return contractNames;
}

/**
 * A Select of the current in-project contract artifacts.
 */
class GivenOrContractSelect extends Enquirer_.GivenOrSelect {
    constructor({hre, ...options}) {
        hre = hre || getHRE();
        if (!hre) {
            throw new Error(
                "This prompt type can only be used when hardhat-enquirer-plus is installed " +
                "as a plug-in in a hardhat project"
            );
        }
        super({...options, choices: collectContractNames(hre)});
    }
}


module.exports = {
    GivenOrContractSelect, collectContractNames
}
