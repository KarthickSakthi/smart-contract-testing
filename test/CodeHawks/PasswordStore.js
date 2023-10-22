const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Password Store Contract should store and return a Password by only owner", async function () {
  let passwordStorage, signer,signers, password = "CodeHawks@2023";

  beforeEach( async function(){
    let PasswordStorage = await ethers.deployContract("PasswordStore");
    passwordStorage = await PasswordStorage.waitForDeployment(6);
    signers = await ethers.getSigners();
    signer = signers[0]
  })

  it("1. Should set a password by an Owner", async function () {
    const setPasswordTx = await passwordStorage.connect(signer).setPassword(password);
    await setPasswordTx.wait(6);
    await expect(setPasswordTx).to.not.be.null;
    await expect(setPasswordTx).to.emit(passwordStorage, "SetNetPassword");
});


  it("2. Should retrieve a Password by Owner", async function () {
    const transaction = await passwordStorage.connect(signer).setPassword(password);
    await transaction.wait(6);
    const currentPassword = await passwordStorage.connect(signer).getPassword();
    expect(currentPassword).to.equal(password);
  });

  it("3. Should not set a password by an other than Owner", async function () {
    let notOwner = signers[1];
    await expect(passwordStorage.connect(notOwner).setPassword(password)).to.be.revertedWithCustomError(
      passwordStorage,
      "PasswordStore__NotOwner"
    );
  });


  it("4. Should not retrieve a Password by other than Owner", async function () {
    let notOwner = signers[1];
    await passwordStorage.connect(signer).setPassword(password);
    await expect(passwordStorage.connect(notOwner).getPassword()).to.be.revertedWithCustomError(
      passwordStorage,
      "PasswordStore__NotOwner"
    );
  });
});
