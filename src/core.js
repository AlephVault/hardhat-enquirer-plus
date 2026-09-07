import Enquirer_ from "enquirer-plus";

/**
 * The registered prompt classes.
 */
export let promptClasses = {};

/**
 * The registered utils.
 */
export let utils = {};

/**
 * An extended Enquirer class, also registering hardhat-related
 * prompts.
 */
export class Enquirer extends Enquirer_ {
    constructor(options, answers) {
        super(options, answers);
        Object.keys(promptClasses).forEach((key) => {
            this.register(key, promptClasses[key]);
        })
    }
}
