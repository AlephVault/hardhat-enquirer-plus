const Enquirer_ = require("enquirer-plus");

/**
 * An input that takes a given value and/or asks and validates
 * the input until a valid address (or account index, if that
 * is given as an index) is given.
 */
class GivenOrValidAddressInput extends Enquirer_.GivenOrValidInput {
    constructor(options, validateChecksumAddress, validateAccount, convertAccount) {
        super({
            ...options, validate: async (v) => {
                v = (v || "").trim();
                return (/^0x[a-fA-F0-9]{40}$/.test(v) && validateChecksumAddress(v) || (await validateAccount(v)));
            },
            makeInvalidInputMessage: (v) => `Invalid account index or address: ${v}`,
            onInvalidGiven: (v) => console.error(`Invalid given account index or address: ${v}`)
        });
        this._convertAccount = convertAccount;
    }

    /**
     * Runs the base input and properly converts the value.
     */
    async run() {
        let result = (await super.run()).trim();
        return /^0x[a-fA-F0-9]{40}$/.test(result) ? result : await this._convertAccount(result);
    }
}

module.exports = {
    GivenOrValidAddressInput
}