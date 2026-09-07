import Enquirer_ from "enquirer-plus";

/**
 * An input that takes a given value and/or asks and validates
 * the input until a valid account index is given.
 */
export class GivenOrValidAccountInput extends Enquirer_.GivenOrValidInput {
    constructor({hre, ...options}) {
        super({
            ...options, validate: (v) => this._isAccount(v),
            makeInvalidInputMessage: (v) => `Invalid account index: ${v}`,
            onInvalidGiven: (v) => console.error(`Invalid given account index: ${v}`)
        });
        this._hre = hre;
    }

    async _isAccount(v) {
        return await this._hre.common.getSigner(parseInt(v));
    }

    async result(v) {
        try {
            return await this._hre.common.getSigner(parseInt(v));
        } catch(e) {
            return null;
        }
    }
}
