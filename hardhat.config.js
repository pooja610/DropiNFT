require("@nomiclabs/hardhat-waffle");
// const fs = require("fs")
// const projectId = "F9n4vbebShnJO2KG_oFxjxsIZsePXZWD"
// const privateKey = fs.readFileSync(".secret").toString()

require("dotenv").config();
const projectId = process.env.projectId

module.exports = {
  networks:{
    hardhat: {
      chainId: 1337
    },
    mumbai: {
      url:`https://polygon-mumbai.g.alchemy.com/v2/${projectId}`,
      accounts: [process.env.privateKey]
    }
  },
  solidity: "0.8.4",
};
