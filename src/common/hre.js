
/**
 * The current hre instance.
 * @type {null}
 */
let hre = null;


/**
 * Inits this package with the given arguments.
 * @param _hre The HRE instance.
 */
function init({hre: _hre}) {
    hre = _hre
}

/**
 * Returns the current hre instance.
 * @returns The HRE instance.
 */
function getHRE() {
    return hre;
}

module.exports = {
    init, getHRE
}