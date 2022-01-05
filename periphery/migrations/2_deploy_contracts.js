const Router = artifacts.require("UniswapV2Router02.sol");
const WETH = artifacts.require("WETH.sol");

module.exports = async function (deployer,network) {
	let weth;
	const FACTORY_ADDRESS="FACTORY ADDRESS";
  	
  if(network==="mainnet"){
  	weth= await WETH.at('0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2');
  	token2Address='';
  }
  else{
  	await deployer.deploy(WETH);  	

  	weth= await WETH.deployed();
  	const token2= await Token2.deployed();
  	token1Address=token1.address;
  	token2Address=token2.address;  	

  }
  await deployer.deploy(Router, FACTORY_ADDRESS, weth.address);
};