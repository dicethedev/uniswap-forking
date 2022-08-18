import { ethers } from "hardhat";

async function main() {
     //interact with uinswap swapTokenforExactToken Function
     //swap usdt to dai
     //TO-DO
        //erc20 token interface
        //Aprrove the uniswap contract
        //check balance calling the function
        //check balance after swap. 

        //go to etherscan and look for this Token addresses and copy it here
    const USDTAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
    const DAIAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
    const UNIRouter = "0xf164fC0Ec4E93095b804a4795bBe1e041497b92a";
    //the amount // 2000e6
    const amountOut = 2e6;
    const amountInMax = 4e6;
  
    //impersonating the signer to intract with this contract
     const helpers = require("@nomicfoundation/hardhat-network-helpers");
      //this can be any holder address and must be a USDT address
    const USDTHolder = "0xf584f8728b874a6a5c7a8d4d387c9aae9172d621";
    await helpers.impersonateAccount(USDTHolder);
    const impersonatedSigner = await ethers.getSigner(USDTHolder);
    
    //the token that I'm swapping is USDT & DAI
    const USDT = await ethers.getContractAt("IERC20", USDTAddress, impersonatedSigner);
    const DAI = await ethers.getContractAt("IERC20", DAIAddress, impersonatedSigner);
    //the Router connecting to help the Swapping successful [UNISWAP format]
    const ROUTER = await ethers.getContractAt("IUniswap", UNIRouter, impersonatedSigner);

    await USDT.approve(UNIRouter, amountInMax);
    const usdtBal = await USDT.balanceOf(USDTHolder);
     const daiBal = await DAI.balanceOf(USDTHolder);

    console.log("balance before swap", usdtBal, daiBal);

    //change epoch time = 1660680419
    await ROUTER.swapTokensForExactTokens(amountOut, amountInMax, [USDTAddress, DAIAddress],
    USDTHolder, 1660680419 );

    const usdtBalAfter = await USDT.balanceOf(USDTHolder);
    const daiBalAfter = await DAI.balanceOf(USDTHolder);

    console.log("balance after swap", usdtBalAfter, daiBalAfter);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
