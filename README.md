# hardhat-enquirer-plus
A hardhat plugin leveraging the power of enquirer (and our enquirer-plus) to have many new prompt types and utilities.

# Installation
Run this command to install it from NPM:

```shell
npm install hardhat-enquirer-plus@^1.0.0
```

# Usage
This is a hardhat plugin, so the first thing to do is to install it in your hardhat.config.ts file:

```javascript
require("hardhat-enquirer-plus");
```

Once there, you can make use of it (this supports both viem-enabled and ethers-enabled projects):

## Using the `Enquirer.prompt` method:

```javascript
const answers = await hre.enquirerPlus.Enquirer.prompt([
    // Asking for a checksum address or account index. Obtaining an address.
    {type: "plus:hardhat:given-or-valid-address-input", message: "Give an address", name: "address1", allowAccountIndex: true},
    // Asking for a checksum address. Obtaining an address.
    {type: "plus:hardhat:given-or-valid-address-input", message: "Give an address", name: "address2"},
    // Asking for an account index. Obtaining an ethers or viem signer object.
    {type: "plus:hardhat:given-or-valid-account-input", message: "Give an account", name: "account"},
    // Asking for one of the built contracts (artifacts).
    {type: "plus:hardhat:given-or-contract-select", message: "Select a contract", name: "contract"},
    // Asking for one native amount (expressed with units like this: "2ether", "1.5 ether", "0.5gwei", ...).
    {type: "plus:hardhat:given-or-token-amount-input", message: "Enter an amount", name: "amount"}
]);
```

All these prompt types also support a `given` option key. If a value is set there and passes the proper
criteria, then it used directly without actually starting the prompting.

Also, all these prompts support the `nonInteractive` option key. If a true value is set there, and the
prompting starts (out of no valid `given` value being set among the options), an error will be raised
telling that the current action is not meant to become interactive.