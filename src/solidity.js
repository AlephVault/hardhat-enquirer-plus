import GivenOrSelect from "enquirer-plus/src/given-or-select.js";

function compareVersions(v1, v2) {
    const v1parts = v1.split(".").map((part) => parseInt(part));
    const v2parts = v2.split(".").map((part) => parseInt(part));

    for (let i = 0; i < 3; i++) {
        if (v1parts[i] > v2parts[i]) return 1;
        if (v1parts[i] < v2parts[i]) return -1;
    }

    return 0;
}

/**
 * Gets the {initial, choices} settings of solidity versions
 * for a hardhat project, so they can be used in a hardhat.
 * @param hre The hardhat runtime environment.
 * @returns {Promise<{initial: string, choices: {name: *, message: *}[]}>}
 * The settings (async function).
 */
export function getSolidityVersionSettings(hre) {
    let compilerVersions = [];
    try {
        const profiles = hre.config.solidity.profiles;
        const compilers = profiles
            ? Object.values(profiles).flatMap((profile) => profile.compilers || [])
            : hre.config.solidity.compilers;

        compilerVersions = [...new Set(compilers.map((entry) => {
            return (entry.version || "").trim();
        }).filter((version) => {
            return /^\d+\.\d+\.\d+$/.test(version);
        }))];
    } catch(e) {
        throw new Error(
            "Your Hardhat config seems to not have the appropriate format " +
            "for the solidity compilers. Please ensure that section is properly " +
            "configured and try again."
        );
    }

    if (compilerVersions.length === 0) throw new Error(
        "The current Hardhat configuration has no valid compiler entries. " +
        "Define at least one Solidity compiler entry (with proper version format)."
    );

    const initial = compilerVersions.reduce((v1, v2) => compareVersions(v1, v2) >= 0 ? v1 : v2);

    const choices = compilerVersions.map((version) => {
        return {name: version, message: version}
    });

    return {initial, choices};
}

/**
 * A Select for the solidity version prompt.
 */
export class GivenOrSolidityVersionSelect extends GivenOrSelect {
    constructor({hre, ...options}) {
        const newOptions = {...options, ...(getSolidityVersionSettings(hre))};
        super(newOptions);
    }
}
