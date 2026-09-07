import hardhatToolboxMochaEthers from "@nomicfoundation/hardhat-toolbox-mocha-ethers";
import { defineConfig } from "hardhat/config";
import hardhatCommonTools from "hardhat-common-tools";
import hardhatEnquirerPlus from "hardhat-enquirer-plus";

export default defineConfig({
  plugins: [
    hardhatToolboxMochaEthers,
    hardhatCommonTools,
    hardhatEnquirerPlus,
  ],
  solidity: "0.8.24",
  test: {
    solidity: {
      fuzz: {
        runs: 4,
      },
      invariant: {
        runs: 4,
        depth: 4,
        failOnRevert: true,
      },
    },
  },
});
