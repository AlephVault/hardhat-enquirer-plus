const {dump, load} = require("./fixedpoint");
const GivenOrValidInput = require("enquirer-plus/src/given-or-valid-input");

const unitMap = {
    'wei':          0,
    'kwei':         3,
    'ada':          3,
    'femtoether':   3,
    'mwei':         6,
    'babbage':      6,
    'picoether':    6,
    'gwei':         9,
    'shannon':      9,
    'nanoether':    9,
    'nano':         9,
    'szabo':        12,
    'microether':   12,
    'micro':        12,
    'finney':       15,
    'milliether':   15,
    'milli':        15,
    'ether':        18,
    'kether':       21,
    'grand':        21,
    'einstein':     21,
    'mether':       24,
    'gether':       27,
    'tether':       30
};

/**
 * Gets the decimals out of a given known unit name.
 * @param unit The unit, as a string.
 * @returns {Number} The amount of decimals.
 */
function decimalsFor(unit) {
    const decimals = unitMap[unit];
    if (decimals === undefined) {
        throw new Error("Invalid unit. It must be one among: " + Object.keys(unitMap).join(", "));
    }
    return decimals;
}

/**
 * Loads a token amount.
 * @param amount The amount, as a string.
 * @param unit The unit in which the textual amount must
 * be understood (e.g. "ether", "wei", "gwei" or others).
 * @returns {BigInt} The numeric amount.
 */
function loadAmount(amount, unit) {
    return load(amount, decimalsFor(unit));
}

/**
 * Dumps a numeric token amount as text.
 * @param amount The numeric amount to dump.
 * @param unit The unit in which the returned text must
 * be understood (e.g. "ether", "wei", "gwei" or others).
 * @returns {string} The string representation.
 */
function dumpAmount(amount, unit) {
    return dump(amount, decimalsFor(unit));
}

/**
 * Tries to parse a token amount, expressed in nominal
 * amount over one unit (e.g. "2.5 eth") returning both
 * parts (e.g. ["2.5", "eth"]).
 * @param amount The text amount.
 * @returns {[string, string]|null} The [amount, unit] pair. On
 * failure, returns null.
 */
function parseTokenAmount(amount) {
    const match = amount.match(/^(\d+(\.\d*)?|\.\d+)\s*([a-z]+)?$/);
    return match && [match[1], match[3] || "wei"];
}

/**
 * An input that takes a given value and/or asks and validates
 * the input until a valid token amount: one expressed in one
 * given unit and an amount of that unit (e.g. 2.5eth).
 */
class GivenOrValidTokenAmountInput extends GivenOrValidInput {
    constructor(options) {
        super({
            ...options, validate: async (v) => {
                const parsed_ = parseTokenAmount(typeof v === "string" ? v.trim() : (v || ""));
                if (!parsed_) return false;

                const [amount, unit] = parsed_;
                try {
                    loadAmount(amount, unit);
                    return true;
                } catch {
                    return false;
                }
            },
            makeInvalidInputMessage: (v) => `Invalid token amount: ${v}`,
            onInvalidGiven: (v) => console.error(`Invalid given token amount: ${v}`)
        });
    }

    async result(v) {
        const [amount, unit] = parseTokenAmount(v.trim());
        return loadAmount(amount, unit);
    }
}

module.exports = {
    tokenAmounts: {load: loadAmount, dump: dumpAmount},
    GivenOrValidTokenAmountInput
}