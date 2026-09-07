# hardhat-enquirer-plus
A hardhat plugin leveraging the power of enquirer (and our enquirer-plus) to have many new prompt types and utilities.

# Installation
Run this command to install it from NPM:

```shell
npm install --save-dev hardhat-common-tools@^3.0.0 hardhat-enquirer-plus@^3.0.0
```

# Usage
This is a Hardhat 3 plugin, so the first thing to do is to register it in your
`hardhat.config.ts` file:

```typescript
import { defineConfig } from "hardhat/config";
import hardhatCommonTools from "hardhat-common-tools";
import hardhatEnquirerPlus from "hardhat-enquirer-plus";

export default defineConfig({
    plugins: [
        hardhatCommonTools,
        hardhatEnquirerPlus,
    ],
    solidity: "0.8.24",
});
```

Once there, you can make use of it (this supports both viem-enabled and ethers-enabled projects):

## Using the `Enquirer.prompt` method:

```javascript
console.log(await hre.enquirerPlus.Enquirer.prompt([
    {type: "plus:hardhat:given-or-valid-address-input", message: "Give an address", name: "address1", allowAccountIndex: true},
    {type: "plus:hardhat:given-or-valid-address-input", message: "Give an address", name: "address2"},
    {type: "plus:hardhat:given-or-valid-account-input", message: "Give an account", name: "account"},
    {type: "plus:hardhat:given-or-contract-select", message: "Select a contract", name: "contract"},
    {type: "plus:hardhat:given-or-deployed-contract-select", message: "Select a deployed contract", name: "deployed-contract"}, 
    {type: "plus:hardhat:given-or-valid-token-amount-input", message: "Enter an amount", name: "amount"},
    {type: "plus:hardhat:given-or-solidity-version-select", message: "Pick an in-project solidity version", name: "version"}
]));
```

All these prompt types also support a `given` option key. If a value is set there and passes the proper
criteria, then it used directly without actually starting the prompting.

Also, all these prompts support the `nonInteractive` option key. If a true value is set there, and the
prompting starts (out of no valid `given` value being set among the options), an error will be raised
telling that the current action is not meant to become interactive.

## Registering a new type

Given that you create your own Enquirer-style prompt, you can register it like this:

```javascript
// Let SomePromptClass be an existing enquirer or enquirer-plus
// prompt class.
class YourPromptType extends SomePromptClass {
    // ...
}

hre.enquirerPlus.utils.registerPromptClass("your-prompt-type", YourPromptType);
```

You can inherit any Enquirer type (e.g. Input, or one from enquirer-plus: `GivenOrValidInput`):

```javascript
class YourPromptType extends hre.enquirerPlus.Enquirer.GivenOrValidInput {
    // ...
}
```

These prompt types are already registered:

- `"plus:hardhat:given-or-contract-select"` refers to `hre.enquirerPlus.Enquirer.GivenOrContractSelect`.
- `"plus:hardhat:given-or-token-amount-input"` refers to `hre.enquirerPlus.Enquirer.GivenOrValidTokenAmountInput`.
- `"plus:hardhat:given-or-valid-token-amount-input"` refers to `hre.enquirerPlus.Enquirer.GivenOrValidTokenAmountInput`.
- `"plus:hardhat:given-or-solidity-version-select"` refers to `hre.enquirerPlus.Enquirer.GivenOrSolidityVersionSelect`.
- `"plus:hardhat:given-or-valid-address-input"` refers to `hre.enquirerPlus.Enquirer.GivenOrValidAddressInput`.
- `"plus:hardhat:given-or-valid-account-input"` refers to `hre.enquirerPlus.Enquirer.GivenOrValidAccountInput`.
- `"plus:hardhat:given-or-deployed-contract-select"` refers to `hre.enquirerPlus.Enquirer.GivenOrDeployedContractSelect`.

The plugin also exposes these utilities:

- `hre.enquirerPlus.utils.fixedpoint.load(value, decimals)` converts a decimal string to a bigint using the given decimal precision.
- `hre.enquirerPlus.utils.fixedpoint.dump(value, decimals)` converts a bigint-like value back to a decimal string.
- `hre.enquirerPlus.utils.contractNames(hre)` lists compiled contract artifacts from the current project.
- `hre.enquirerPlus.utils.tokenAmounts.load(amount, unit)` converts values like `"1.5"` in units like `"ether"` or `"gwei"` to bigint values.
- `hre.enquirerPlus.utils.tokenAmounts.dump(amount, unit)` converts bigint-like token amounts back to unit-formatted strings.
- `hre.enquirerPlus.utils.registerPromptClass(classId, type)` registers custom prompt classes.

When Hardhat Ignition is available, the plugin also adds:

- `hre.ignition.listDeployedContracts(deploymentId)` lists deployed contract ids and addresses for an Ignition deployment.
