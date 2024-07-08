
/**
 * The current hre instance. Intentionally project-wide.
 * @type {null}
 */
global.__hre = null;

/**
 * Sets the initializing hre in this package.
 * @param _hre The HRE instance.
 */
function setHRE(_hre) {
    global.__hre = _hre
}

/**
 * Returns the current hre instance.
 * @returns The HRE instance.
 */
function getHRE() {
    return global.__hre;
}

module.exports = {
    setHRE, getHRE
}