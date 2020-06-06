// src/index.js
const Web3 = require('web3');
const { setupLoader } = require('@openzeppelin/contract-loader');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

async function main() {
  // Set up web3 object, connected to the local development network, and a contract loader
  const web3 = new Web3('http://localhost:8545');
  const loader = setupLoader({ provider: web3 }).web3;

  // Set up a web3 contract, representing our deployed Box instance, using the contract loader
  const address = '0x9561C133DD8580860B6b7E504bC5Aa500f0f06a7';
  const CheckAccount = loader.fromArtifact('CheckAccount', address);
 
  readline.question('What\'s your address?', async account => {   
    var hasQueried = await CheckAccount.methods.hasQueried(account);
    
    if (hasQueried) {
      console.log('You\'ve already queried your balance.');
    } else {
      CheckAccount.methods.registerBalance(account);
    }

    const balance = await CheckAccount.methods.retrieveBalance(account).call();
    console.log("The balance of the value is", balance);
    readline.close();
  })
}

main();
