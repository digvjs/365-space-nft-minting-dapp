# 365 Space Project

## Setup

1. Setup `.env` file from `.env.example`
2. Run -
    ```
    yarn
    ```

## Run Project

### Smart contract

* Testnet
    ```
    npx truffle compile
    npx truffle migrate --reset --network=rinkeby
    npx truffle run verify <contract_name>@<contract_address> --network=rinkeby
    ```

* Mainnet
    ```
    npx truffle compile
    npx truffle migrate --reset --network=mainnet
    npx truffle run verify <contract_name>@<contract_address> --network=mainnet
    ```

### Frontend
```
yarn start
```