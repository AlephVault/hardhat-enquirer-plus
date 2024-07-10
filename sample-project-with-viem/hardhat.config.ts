import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import "hardhat-common-tools";
import "..";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
};

export default config;
