import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
const dotenv = require('dotenv');
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.9",
     networks: {
    hardhat: {
      forking: {
        // @ts-ignore
        url: process.env.FORKING_MAINNET_URL,
      }
    }
  }
};

export default config;
