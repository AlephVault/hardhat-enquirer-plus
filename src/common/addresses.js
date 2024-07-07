const Enquirer_ = require("enquirer-plus");

/**
 * An input that takes a given value and/or asks and validates
 * the input until a valid address (or account index, if that
 * is given as an index) is given.
 */
class GivenOrValidAddressInput extends Enquirer_.GivenOrValidInput {
    constructor({allowAccountIndex, ...options}, validateChecksumAddress, validateAccount, convertAccount) {
        super({
            ...options, validate: async (v) => {
                v = typeof v === "string" ? v.trim() : (v || "");
                if (/^0x[a-fA-F0-9]{40}$/.test(v) && validateChecksumAddress(v)) {
                    return true;
                }
                return !!(allowAccountIndex && await validateAccount(v));

            },
            makeInvalidInputMessage: (v) => `Invalid account index or address: ${v}`,
            onInvalidGiven: (v) => console.error(`Invalid given account index or address: ${v}`)
        });
        this._convertAccount = convertAccount;
        this._allowAccountIndex = allowAccountIndex;
    }

    async result(v) {
        if (/^0x[a-fA-F0-9]{40}$/.test(v) || !this._allowAccountIndex) {
            return v;
        } else {
            return await this._convertAccount(v);
        }
    }
}

module.exports = {
    GivenOrValidAddressInput
}