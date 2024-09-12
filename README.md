# Multisig Solidity Contract with Factory Deployment on Lisk-Sepolia

This project demonstrates a multisig contract system deployed on the **Lisk-Sepolia** network using Solidity and Hardhat. The project includes a factory contract that deploys multiple instances of the multisig contract. It also contains tests and interaction scripts for deployed contracts.

## Features

- **Multisig Factory**: A factory that deploys multisig contracts.
- **Lisk-Sepolia Integration**: Deploys contracts to the Lisk-Sepolia network, a testnet of the Lisk blockchain.
- **Hardhat Ignition Module**: Utilizes the `@nomicfoundation/hardhat-ignition` module to automate deployment.
- **Test Suite**: Includes tests for the deployed multisig factory and multisig contracts.
- **Contract Interaction**: Scripts to interact with the multisig factory contract and delployed multisig contracts.

## Project Structure

```
├── artifacts/                         # Compiled contract files
├── contracts/
│   ├── interfaces/
│   │   ├── Multisig.sol               # The multisig wallet contract
│   │   ├── MultisigFactory.sol        # Factory contract to deploy multisig wallets
│   │   └── Web3CXI.sol                # Web3 contract interface for interactions (if needed)
├── coverage/                          # Code coverage results
├── ignition/
│   ├── deployments/                   # Deployment files
│   └── modules/
│       └── MultisigFactory.ts         # Hardhat Ignition module for deployment
├── scripts/
│   └── interaction.ts                 # Script to interact with deployed contracts
├── test/
│   ├── multisig-factory.js            # Unit tests for the multisig factory
│   └── multisig.ts                    # Unit tests for multisig wallet
├── .env                               # Environment variables (private keys, etc.)
├── hardhat.config.ts                  # Hardhat configuration
├── package.json                       # Node.js package configuration
├── tsconfig.json                      # TypeScript configuration
└── README.md                          # Project documentation
```

## Prerequisites

- **Node.js**: Ensure that Node.js is installed.
- **Hardhat**: Hardhat is required to compile and test and deploy contracts.

### Install Dependencies

To get started, clone the repository and install the required dependencies:

```
git clone https://github.com/michojekunle/multi-sig.git 
cd multi-sig
npm install
```

## Environment Setup

Create a `.env` file in the root of your project and add the following variables:

```
WALLET_KEY=your_private_key 
RANDOM_WALLET_KEY=another_private_key OTHER_ACCOUNT_WALLET_KEY=additional_private_key
```

> Note: Additional private keys are included to ensure valid signers for interacting with deployed multisig contracts.

## Hardhat Configuration

The Hardhat configuration includes the Lisk-Sepolia test network settings:

```
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
dotenv.config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    // for testnet
    "lisk-sepolia": {
      url: "https://rpc.sepolia-api.lisk.com",
      accounts: [process.env.WALLET_KEY, process.env.RANDOM_WALLET_KEY ,process.env.OTHER_ACCOUNT_WALLET_KEY],
      gasPrice: 1000000000,
    },
  },
  etherscan: {
    // Use "123" as a placeholder, because Blockscout doesn't need a real API key, and Hardhat will complain if this property isn't set.
    apiKey: {
      "lisk-sepolia": "123",
    },
    customChains: [
      {
        network: "lisk-sepolia",
        chainId: 4202,
        urls: {
          apiURL: "https://sepolia-blockscout.lisk.com/api",
          browserURL: "https://sepolia-blockscout.lisk.com",
        },
      },
    ],
  },
  sourcify: {
    enabled: false,
  },
};
```

## Deployment

We use **Hardhat Ignition** to deploy the `MultisigFactory` contract. Below is the ignition module setup:

```
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const MultisigFactoryModule = buildModule("MultisigFactoryModule", (m) => {

  const MultisigFactory = m.contract("MultisigFactory");

  return { MultisigFactory };
});

export default MultisigFactoryModule;
```

### Deploying the Factory Contract

To deploy the multisig factory contract, run:

```
npx hardhat ignition deploy ignition/modules/MultisigFactory.ts --network lisk-sepolia
```

This command deploys the factory contract to the Lisk-Sepolia network.

### Deploying Multisig Wallets from the Factory

Once the factory contract is deployed, you can create multisig wallets using the factory's `createMultisigClone` method. You can use the interaction script (`scripts/interaction.ts`) to deploy and interact with the wallets.

## Testing

We use Hardhat's testing framework to write and run tests. You can find the tests in the `test` directory.

To run the tests, use:

```
npx hardhat test
```

## Interacting with the Deployed Contracts

You can interact with the deployed contracts using scripts in the `scripts/` directory. For instance, to interact with the deployed multisig wallet, run:

```
npx hardhat run scripts/interaction.ts --network lisk-sepolia
```

## Verifying Contracts on Lisk-Sepolia Blockscout

To verify the deployed contracts on Blockscout, use:

```
npx hardhat verify --network lisk-sepolia <contract_address>
```

Since Blockscout doesn't require an actual API key, you can use `"123"` as a placeholder in the `hardhat.config.ts`.

## License

This project is licensed under the MIT License.