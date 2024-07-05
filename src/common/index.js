const pathsUtils = require("./paths");
const fs = require("fs");
const path = require("path");

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

function commonExtender(hre) {
    hre.enquirerPlus ||= {};
    hre.enquirerPlus.utils ||= {};
    hre.enquirerPlus.utils.collectContractNames = () => collectContractNames(hre);
}

module.exports = commonExtender;
