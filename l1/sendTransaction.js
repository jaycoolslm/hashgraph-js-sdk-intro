require('dotenv').config()

const {
    AccountId,
    PrivateKey,
    Client,
    TransferTransaction
} = require('@hashgraph/sdk')

const accountId = process.env.ACCOUNT_ID
const privateKey = process.env.PRIVATE_KEY
const client = Client.forTestnet().setOperator(accountId, privateKey)

async function sendTransaction() {
    const transferTx = new TransferTransaction()
        .addHbarTransfer('0.0.34008195', 100)
        .addHbarTransfer(accountId, -100)

    const executeTx = await transferTx.execute(client)
    const transactionId = executeTx.transactionId

    console.log("Transaction Id: " + transactionId)
}

sendTransaction()