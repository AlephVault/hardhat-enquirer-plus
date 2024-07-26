# hardhat-enquirer-plus
A hardhat plugin leveraging the power of enquirer (and our enquirer-plus) to have many new prompt types and utilities.

# Installation
Run this command to install it from NPM:

```shell
npm install --save-dev hardhat-common-tools@^1.4.0 hardhat-enquirer-plus@^1.4.3
```

# Usage
This is a hardhat plugin, so the first thing to do is to install it in your hardhat.config.ts file:

```javascript
require("hardhat-common-tools");
require("hardhat-enquirer-plus");
```

Once there, you can make use of it (this supports both viem-enabled and ethers-enabled projects):

## Using the `Enquirer.prompt` method:

```javascript
console.log(await hre.enquirerPlus.Enquirer.prompt([
    // Asking for a checksum address or account index. Obtaining an address.
    {type: "plus:hardhat:given-or-valid-address-input", message: "Give an address", name: "address1", allowAccountIndex: true},
    // Asking for a checksum address. Obtaining an address.
    {type: "plus:hardhat:given-or-valid-address-input", message: "Give an address", name: "address2"},
    // Asking for an account index. Obtaining an ethers or viem signer object.
    {type: "plus:hardhat:given-or-valid-account-input", message: "Give an account", name: "account"},
    // Asking for one of the built contracts (artifacts).
    {type: "plus:hardhat:given-or-contract-select", message: "Select a contract", name: "contract"},
    // Asking for one of the ignition-deployed contracts (artifacts) in the current network.
    {type: "plus:hardhat:given-or-deployed-contract-select", message: "Select a deployed contract", name: "deployed-contract"},
    // Asking for one native amount (expressed with units like this: "2ether", "1.5 ether", "0.5gwei", ...).
    {type: "plus:hardhat:given-or-valid-token-amount-input", message: "Enter an amount", name: "amount"},
    // Asking to pick one of the installed Solidity versions.
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

These types are already registered:

- `"plus:hardhat:given-or-contract-select"` refers to `hre.enquirerPlus.Enquirer.GivenOrContractSelect`.
- `"plus:hardhat:given-or-valid-token-amount-input"` refers to `hre.enquirerPlus.Enquirer.GivenOrValidTokenAmountInput`.
- `"plus:hardhat:given-or-solidity-version-select"` refers to `hre.enquirerPlus.Enquirer.GivenOrSolidityVersionSelect`.
- `"plus:hardhat:given-or-valid-address-input"` refers to `hre.enquirerPlus.Enquirer.GivenOrValidAddressInput`.
- `"plus:hardhat:given-or-valid-account-input"` refers to `hre.enquirerPlus.Enquirer.GivenOrValidAccountInput`.
- `"plus:hardhat:given-or-deployed-contract-select"` refers to `hre.enquirerPlus.Enquirer.GivenOrDeployedContractSelect`.
