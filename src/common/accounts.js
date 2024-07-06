const Enquirer_ = require("enquirer-plus");

/**
 * An input that takes a given value and/or asks and validates
 * the input until a valid account index is given.
 */
class GivenOrValidAccountInput extends Enquirer_.GivenOrValidInput {
    constructor(options, validateAccount, convertAccount) {
        super({
            ...options, validate: async (v) => {
                return validateAccount(v);
            },
            makeInvalidInputMessage: (v) => `Invalid account index: ${v}`,
            onInvalidGiven: (v) => console.error(`Invalid given account index: ${v}`)
        });
        this._convertAccount = convertAccount;
    }

    async result(v) {
        try {
            return await this._convertAccount(v);
        } catch(e) {
            return null;
        }
    }
}

module.exports = {
    GivenOrValidAccountInput
}