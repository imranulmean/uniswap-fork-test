const Migrations = artifacts.require("Migrations");
const LiquidityMigrator = artifacts.require("LiquidityMigrator.sol");
const BonusToken = artifacts.require("./BonusToken.sol");

module.exports = async function (deployer) {
  await deployer.deploy(BonusToken);
  const bonusToken= await BonusToken.Deployed();

  const routerAddress= '';
  const pairAddress='';
  const routerForkAddress= '';
  const pairForkAddress='';

  await LiquidityMigrator.deploy(LiquidityMigrator,routerAddress,pairAddress,routerForkAddress ,pairForkAddress, bonusToken.address);
  const liquidityMigrator= await LiquidityMigrator.Deployed();
  await bonusToken.setLiquidator(liquidityMigrator.address);

};
