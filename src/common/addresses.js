const Enquirer_ = require("enquirer-plus");
const {checkNotInteractive} = require("enquirer-plus/src/common");
const {Input} = require("enquirer");

/**
 * An input that takes a given value and/or asks and validates
 * the input until a valid address (or account index, if that
 * is allowed as an option) is given.
 */
class GivenOrValidAddressInput extends Enquirer_.GivenOrValidInput {
    constructor(options, validate, convert) {
        super({
            ...options, validate,
            makeInvalidInputMessage: (v) => `Invalid account index or address: ${v}`,
            onInvalidGiven: (v) => console.error(`Invalid given account index or address: ${v}`)
        });
        this._convert = convert;
    }

    /**
     * Runs the base input and properly converts the value.
     */
    async run() {
        return this._convert(await super.run());
    }
}

module.exports = {
    GivenOrValidAddressInput
}