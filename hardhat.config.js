require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  defaultNetwork: "hardhat",
  networks:{
    mumbai: {
      url: process.env.MUMBAI_RPCURL, 
      chainId: process.env.CHAINID, 
      accounts: [process.env.PRIVATEKEY1, process.env.PRIVATEKEY2],
    }
  },
};
