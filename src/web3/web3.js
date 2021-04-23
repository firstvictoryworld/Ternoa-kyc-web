import Web3 from 'web3';

let web3;

const loadWeb3 = async () => {
  if (window.ethereum) {
    const givenProvider = Web3.givenProvider;

    const httpProvider = new Web3.providers.HttpProvider(
      'https://rinkeby.infura.io/v3/b478a669bf7048d09287e797ee0049e0'
    );
    web3 = new Web3(givenProvider || httpProvider);

    try {
      const account = await window.ethereum.enable();
      console.log(account);
    } catch (error) {
      //error
    }
  } else if (window.web3) {
    web3 = new Web3(web3.currentProvider);
  } else {
    //The user is not running metamask
    alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    const provider = new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/b478a669bf7048d09287e797ee0049e0');
    web3 = new Web3(provider);
  }
};

loadWeb3();

export default web3;
