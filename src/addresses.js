const Enquirer_ = require("enquirer-plus");

/**
 * An input that takes a given value and/or asks and validates
 * the input until a valid address (or account index, if that
 * is given as an index) is given.
 */
class GivenOrValidAddressInput extends Enquirer_.GivenOrValidInput {
    constructor({hre, allowAccountIndex, ...options}) {
        super({
            ...options, validate: async (v) => {
                v = typeof v === "string" ? v.trim() : (v || "");
                if (/^0x[a-fA-F0-9]{40}$/.test(v) && hre.common.isAddress(v)) {
                    return true;
                }
                return !!(allowAccountIndex && await this._validateAccount(v));
            },
            makeInvalidInputMessage: (v) => `Invalid account index or address: ${v}`,
            onInvalidGiven: (v) => console.error(`Invalid given account index or address: ${v}`)
        });
        this._hre = hre;
        this._allowAccountIndex = allowAccountIndex;
    }

    async _validateAccount(v) {
        if (typeof v === "string") {
            if (!/^\d+$/.test(v)) return false;
            v = parseInt(v);
            return v >= 0 && v < (await this._hre.common.getSigners()).length;
        } else {
            try {
                const signer = await this._hre.common.getSigner(parseInt(v));
                return !!(this._hre.common.getAddress(signer));
            } catch {
                return false;
            }
        }
    }

    async _convertAccount(v) {
        const signer = await this._hre.common.getSigner(parseInt(v));
        return this._hre.common.getAddress(signer);
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