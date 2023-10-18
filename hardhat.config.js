require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  defaultNetwork: "hardhat",
  networks:{
    mumbai: {
      url: "", // sepolia RPC endpoint
      chainId: 80001, // sepolia chain ID
      accounts: [""],
    }
  },
};
