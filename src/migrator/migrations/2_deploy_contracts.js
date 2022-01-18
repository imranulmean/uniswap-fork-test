const Migrations = artifacts.require("Migrations");
const LiquidityMigrator = artifacts.require("LiquidityMigrator.sol");
const BonusToken = artifacts.require("BonusToken.sol");

module.exports = async function (deployer) {
  await deployer.deploy(BonusToken);
  const bonusToken= await BonusToken.deployed();

  const routerAddress= '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';
  const pairAddress='0x3356c9A8f40F8E9C1d192A4347A76D18243fABC5';
  const routerForkAddress= '0xababC831d24CbE621c55A3EdbfD529283FfDF05A';
  const pairForkAddress='0x86eC149b79317f9608A22Ba116EF3D1A458941A1';

  await deployer.deploy(LiquidityMigrator,routerAddress,pairAddress,routerForkAddress ,pairForkAddress, bonusToken.address);
  const liquidityMigrator= await LiquidityMigrator.deployed();
  await bonusToken.setLiquidator(liquidityMigrator.address);

};
