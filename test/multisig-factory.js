const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MultisigFactory", function () {
    let Multisig;
    let MultisigFactory;
    let multisigFactory;
    let owner;
    let addr1;
    let addr2;
    let addr3;
    let addr4;

    beforeEach(async function () {
        [owner, addr1, addr2, addr3, addr4] = await ethers.getSigners();

        Multisig = await ethers.getContractFactory("Multisig");
        MultisigFactory = await ethers.getContractFactory("MultisigFactory");
        multisigFactory = await MultisigFactory.deploy();
        await multisigFactory.deployed;
    });

    it("Should deploy a new Multisig contract and store its address", async function () {
        const quorum = 2;
        const validSigners = [addr1, addr2, addr3, addr4];
    
        // Call the function to create a new Multisig contract
        const tx = await multisigFactory.createMultisigClone(quorum, validSigners);
        const receipt = await tx.wait();

        const multisigs = await multisigFactory.getMultisigs()

        expect(multisigs.length).to.be.equal(1);
    });
    

    it("Should store multiple deployments in state", async function () {
        const quorum = 2;
        const validSigners = [addr1, addr2, addr3, addr4];

        // Deploy first Multisig contract
        await multisigFactory.createMultisigClone(quorum, validSigners);

        // Deploy second Multisig contract
        await multisigFactory.createMultisigClone(quorum, validSigners);

        // Deploy third Multisig contract
        await multisigFactory.createMultisigClone(quorum, validSigners);

        // Check the number of deployed Multisig contracts
        const multisigs = await multisigFactory.getMultisigs();
        expect(multisigs.length).to.equal(3);
    });
});
