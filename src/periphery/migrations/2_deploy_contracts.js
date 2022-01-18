const Router = artifacts.require("UniswapV2Router02.sol");
const WETH = artifacts.require("WETH.sol");

module.exports = async function (deployer,network) {
	let weth;
	const FACTORY_ADDRESS="0xC5b9eC7d6a119C74854B069CE7F4874Cfb32EA31";
  	
  if(network==="mainnet"){
  	weth= await WETH.at('0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2');
  	token2Address='';
  }
  else{
  	await deployer.deploy(WETH);  	
  	weth= await WETH.deployed();

  }
  await deployer.deploy(Router, FACTORY_ADDRESS, weth.address);
};