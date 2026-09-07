import fs from "fs";
import path from "path";
import Enquirer_ from "enquirer-plus";

import * as pathsUtils from "./paths.js";

/**
 * Collects all the contract names from the compiled artifacts.
 * @param hre The hardhat runtime environment.
 * @returns {*[]} The list of contract names.
 */
export function collectContractNames(hre) {
    let contractNames = [];
    let contractArtifactsDirectoryName = path.resolve(hre.config.paths.artifacts, "contracts");
    let startPos = contractArtifactsDirectoryName.length + 1;
    let stat = null;
    try {
        // We retrieve the stat. If it does NOT exist, then
        // we return [] since the contracts are NOT compiled,
        // but any other error will bubble.
        stat = fs.statSync(contractArtifactsDirectoryName);
    } catch(e) {
        if (e.code === "ENOENT") return [];
        throw e;
    }
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
export class GivenOrContractSelect extends Enquirer_.GivenOrSelect {
    constructor({hre, ...options}) {
        const choices = collectContractNames(hre);
        if (choices.length === 0) {
            throw new Error(
                "A contract cannot be selected because there's no contract successfully compiled (you can fix this " +
                "by ensuring your project has valid non-abstract solidity files and run the `npx hardhat compile` " +
                "CLI command)"
            );
        }
        super({...options, choices});
    }
}
