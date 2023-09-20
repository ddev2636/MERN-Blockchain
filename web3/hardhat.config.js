/** @type import('hardhat/config').HardhatUserConfig */

// PRIVATE_KEY->Account1
const PRIVATE_KEY =
  "20026908c3e25664f159bc080996056e146f067401e1bb1fc0819cc8fd1fedbf";
const RPC_URL = "https://rpc.ankr.com/polygon_mumbai";
module.exports = {
  defaultNetwork: "polygon_mumbai",
  networks: {
    hardhat: {
      chainId: 80001,
    },
    polygon_mumbai: {
      url: "https://rpc.ankr.com/polygon_mumbai",
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
