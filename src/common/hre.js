
/**
 * The current hre instance.
 * @type {null}
 */
let hre = null;


/**
 * Sets the initializing hre in this package.
 * @param _hre The HRE instance.
 */
function setHRE(_hre) {
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
    setHRE, getHRE
}