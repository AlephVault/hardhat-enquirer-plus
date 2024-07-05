const Enquirer_ = require("enquirer-plus");

/**
 * An input that takes a given value and/or asks and validates
 * the input until a valid account index is given.
 */
class GivenOrValidAccountInput extends Enquirer_.GivenOrValidInput {
    constructor(options, validateAccount, convertAccount) {
        super({
            ...options, validate: async (v) => {
                v = (v || "").trim();
                return validateAccount(v);
            },
            makeInvalidInputMessage: (v) => `Invalid account index: ${v}`,
            onInvalidGiven: (v) => console.error(`Invalid given account index: ${v}`)
        });
        this._convertAccount = convertAccount;
    }

    /**
     * Runs the base input and properly converts the value.
     */
    async run() {
        let result = (await super.run()).trim();
        return await this._convertAccount(result);
    }
}

module.exports = {
    GivenOrValidAccountInput
}