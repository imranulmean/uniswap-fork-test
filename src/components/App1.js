import React, { Component } from 'react'
import Web3 from 'web3'
// import DaiToken from '../abis/DaiToken.json'
// import DappToken from '../abis/DappToken.json'
// import TokenFarm from '../abis/TokenFarm.json'
import Token1 from '../core/abis/Token1.json'
import Token2 from '../core/abis/Token2.json'
import UniswapV2Factory from '../core/abis/UniswapV2Factory.json'
import Navbar from './Navbar'
//import Main from './Main'
import './App.css'

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadBlockchainData() {

    const web3 = window.web3
    const networkId = await web3.eth.net.getId()
    const accounts = await web3.eth.getAccounts()
    console.log(accounts);
    console.log('Network ID:'+networkId);
    // Load Token1 data
    const token1Data = Token1.networks[networkId];
    if(token1Data) {
      
      const token1 = new web3.eth.Contract(Token1.abi, token1Data.address);
      let token1Name= await token1.methods.name().call();
      let token1Supply= await token1.methods.totalSupply().call();      
      let token1Balance = await token1.methods.balanceOf(accounts[0]).call()
      
      this.setState({ token1});
      
       this.setState({token1:{
          name:token1Name,
          address:token1Data.address,
          totalSupply:token1Supply,
          balance:token1Balance.toString()
       } });
    }
    else {
      window.alert('Token1 contract not deployed to detected network.');
    }    
    // Load Token2 data
    const token2Data = Token2.networks[networkId];
    if(token2Data) {
      
      const token2 = new web3.eth.Contract(Token2.abi, token2Data.address);
      let token2Name= await token2.methods.name().call()      
      let token2Supply= await token2.methods.totalSupply().call();
      let token2Balance = await token2.methods.balanceOf(accounts[0]).call()

      this.setState({ token2});
       this.setState({token2:{
          name:token2Name,
          address:token2Data.address,
          totalSupply:token2Supply,
          balance:token2Balance.toString()
       } });
    }
    else {
      window.alert('Token1 contract not deployed to detected network.');
    }  

    // Load Factory Pair data
    const factoryData = UniswapV2Factory.networks[networkId];
    if(factoryData) {
      
      const factory = new web3.eth.Contract(UniswapV2Factory.abi, factoryData.address);
      console.log(factory);
      let factoryPairLength= await factory.methods.allPairsLength().call();
      let factoryPairByIndex= await factory.methods.allPairs(0).call();  
      let factoryPairByTokenAddress= await factory.methods.getPair(token1Data.address, token2Data.address).call();          

      this.setState({ factory});
       this.setState({factory:{
          pairLength:factoryPairLength,
          factoryPairByIndex:factoryPairByIndex,
          factoryPairByTokenAddress:factoryPairByTokenAddress
       } });
    }
    else {
      window.alert('Token1 contract not deployed to detected network.');
    }  
    

    // const web3 = window.web3

    // const accounts = await web3.eth.getAccounts()
    // this.setState({ account: accounts[0] })

    // const networkId = await web3.eth.net.getId()

    // // Load DaiToken
    // const daiTokenData = DaiToken.networks[networkId]
    // if(daiTokenData) {
    //   const daiToken = new web3.eth.Contract(DaiToken.abi, daiTokenData.address)
    //   this.setState({ daiToken })
    //   let daiTokenBalance = await daiToken.methods.balanceOf(this.state.account).call()
    //   this.setState({ daiTokenBalance: daiTokenBalance.toString() })
    // } else {
    //   window.alert('DaiToken contract not deployed to detected network.')
    // }

    // // Load DappToken
    // const dappTokenData = DappToken.networks[networkId]
    // if(dappTokenData) {
    //   const dappToken = new web3.eth.Contract(DappToken.abi, dappTokenData.address)
    //   this.setState({ dappToken })
    //   let dappTokenBalance = await dappToken.methods.balanceOf(this.state.account).call()
    //   this.setState({ dappTokenBalance: dappTokenBalance.toString() })
    // } else {
    //   window.alert('DappToken contract not deployed to detected network.')
    // }

    // // Load TokenFarm
    // const tokenFarmData = TokenFarm.networks[networkId]
    // if(tokenFarmData) {
    //   const tokenFarm = new web3.eth.Contract(TokenFarm.abi, tokenFarmData.address)
    //   this.setState({ tokenFarm })
    //   let stakingBalance = await tokenFarm.methods.stakingBalance(this.state.account).call()
    //   this.setState({ stakingBalance: stakingBalance.toString() })
    // } else {
    //   window.alert('TokenFarm contract not deployed to detected network.')
    // }

    // this.setState({ loading: false })
  }

  async loadWeb3() {
     if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  // stakeTokens = (amount) => {
  //   this.setState({ loading: true })
  //   this.state.daiToken.methods.approve(this.state.tokenFarm._address, amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
  //     console.log(amount);
  //     this.state.tokenFarm.methods.stakeTokens(amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
  //       this.setState({ loading: false })
  //     })
  //   })
  // }

  // unstakeTokens = (amount) => {
  //   this.setState({ loading: true })
  //   this.state.tokenFarm.methods.unstakeTokens().send({ from: this.state.account }).on('transactionHash', (hash) => {
  //     this.setState({ loading: false })
  //   })
  // }

  constructor(props) {
    super(props)
    this.state = {
      // account: '0x0',
      // daiToken: {},
      // dappToken: {},
      // tokenFarm: {},
      // daiTokenBalance: '0',
      // dappTokenBalance: '0',
      // stakingBalance: '0',
      loading: true,
      token1:{},
      token2:{},
      factory:{}
    }
  }

  render() {
     

    if(this.state.loading) {
      //content = <p id="loader" className="text-center">Loading...</p>
    }
    // else {
    //   content = <Main
    //     daiTokenBalance={this.state.daiTokenBalance}
    //     dappTokenBalance={this.state.dappTokenBalance}
    //     stakingBalance={this.state.stakingBalance}
    //     stakeTokens={this.stakeTokens}
    //     unstakeTokens={this.unstakeTokens}
    //   />
    // }

    return (
      <div>
        // <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '600px' }}>
              <div className="content mr-auto ml-auto">
                <a
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                </a>

                <p>Token1 Name: {this.state.token1.name}</p>
                <p>Token1 Address: {this.state.token1.address}</p>
                <p>Token1 Total Supply: {this.state.token1.totalSupply}</p>
                <p>Token1 account balance: {this.state.token1.balance}</p>
                
                <p>---------------------------------------------------</p>
                <p>Token2 Name: {this.state.token2.name}</p>
                <p>Token2 Address: {this.state.token2.address}</p>
                <p>Token2 Total Supply: {this.state.token2.totalSupply}</p>
                <p>Token2 account balance: {this.state.token2.balance}</p>
                <p>----------------Factory Data Load-----------------------------------</p>
                <p>Factory Pair Length: {this.state.factory.pairLength}</p>
                <p>Factory All Pairs by index[]: {this.state.factory.factoryPairByIndex}</p>
                <p>Factory Pair by Tokens Name or address[][]: {this.state.factory.factoryPairByTokenAddress}</p>
                

              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
