import { run, ethers } from "hardhat";
import { verify } from "../helper-functions";

async function main() {
  await run("compile");
  const TRexContract = await ethers.getContractFactory("TRex");
  const trex = await TRexContract.deploy();
  await trex.deployed();
  console.log("T. Rex deployed to:", trex.address);
  await trex.deployTransaction.wait(6);
  if (process.env.ETHERSCAN_API_KEY) {
    console.log("Verifying...");
    await verify(trex.address, []);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
