const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
  'print cinnamon rescue volume soup visit pig regular card unable radio end',
  // remember to change this to your own phrase!
  'https://goerli.infura.io/v3/7cc9d9a1e9434138b7416d306e91085a'
  // remember to change this to your own endpoint!
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ gas: '1000000', from: accounts[0] });
  
  console.log(JSON.stringify(interface));
  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
};
deploy();
