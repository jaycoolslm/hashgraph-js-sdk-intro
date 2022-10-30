require('dotenv').config()

const {
    AccountCreateTransaction,
    PrivateKey,
    Client
} = require("@hashgraph/sdk")

const fs = require("fs")

const accountId = process.env.ACCOUNT_ID
const privateKey = process.env.PRIVATE_KEY
const client = Client.forTestnet().setOperator(accountId, privateKey)

async function generateAccounts(amount = 3) {
    for (let i = 0; i < amount; i++) {
        // generate the private key
        const key = PrivateKey.generate()
        // create the account creation transaction
        const accountCreateTx = new AccountCreateTransaction()
            .setKey(key.publicKey)
            .setInitialBalance(100)
        // execute and submit to hedera network
        const submitAccountCreate = await accountCreateTx.execute(client)
        // get the receipt
        const accountCreateRx = await submitAccountCreate.getReceipt(client)
        // get the account id from the receipt
        const accountId = accountCreateRx.accountId
        // log the new account id
        console.log("The new account ID is " + accountId);
        // add the new data into .env file
        fs.appendFile(".env", `
ID_${i + 1}=${accountId}
KEY_${i + 1}=${key}
        `, (err) => {
            if (err) throw err;
            console.log(`Saved ${i + 1}/${amount} new accounts into .env`)
        })
    }
}

generateAccounts()