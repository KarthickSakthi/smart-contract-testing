const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Password Store Contract should store and return a Password by only owner", async function () {
  let passwordStorage, signer, password = "CodeHawks@2023";

  beforeEach( async function(){
    let PasswordStorage = await ethers.deployContract("PasswordStore");
    passwordStorage = await PasswordStorage.waitForDeployment(6);
    let  signers = await ethers.getSigners();
    signer = signers[0]
  })

  it("1. Should set a password by an Owner", async function () {
    const owner = await passwordStorage.s_owner();
    await passwordStorage.connect(signer);
    const transaction = await passwordStorage.setPassword(password);
    await transaction.wait(6);
    const address = await signer.address;
    expect(owner).to.equal(address);
  });

  it("2. Should retrieve a Password by Owner", async function () {
    await passwordStorage.connect(signer);
    const transaction = await passwordStorage.setPassword(password);
    await transaction.wait(6);
    const currentPassword = await passwordStorage.getPassword();
    expect(currentPassword).to.equal(password);
  });
});
