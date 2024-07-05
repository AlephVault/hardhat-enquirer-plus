const Enquirer_ = require("enquirer-plus");

/**
 * The registered prompt classes.
 */
let promptClasses = {};

/**
 * The registered utils.
 */
let utils = {};

/**
 * An extended Enquirer class, also registering hardhat-related
 * prompts.
 */
class Enquirer extends Enquirer_ {
    constructor(options, answers) {
        super(options, answers);
        Object.keys(promptClasses).forEach((key) => {
            this.register(key, promptClasses[key]);
        })
    }
}

module.exports = {
    Enquirer, promptClasses, utils
}