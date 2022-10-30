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

const key1 = PrivateKey.fromString(process.env.KEY_1)
const key2 = PrivateKey.fromString(process.env.KEY_2)
const key3 = PrivateKey.fromString(process.env.KEY_3)

const multikeyAccount = process.env.MULTIKEY_ID
const thresholdAccount = process.env.THRESHOLD_KEY_ID


async function main() {
    // Try send a transaction with insufficient signatures
    try {
        console.log("------")
        console.log("- Try submit a transaction with insufficient signatures")
        const transaction1 = new TransferTransaction()
            .addHbarTransfer(multikeyAccount, -1)
            .addHbarTransfer('0.0.34008195', 1)
            .setNodeAccountIds([new AccountId(3)])
            .freezeWith(client)
        // create signatures
        const sig1 = key1.signTransaction(transaction1)
        const sig2 = key2.signTransaction(transaction1)
        // add signatures to transaction
        transaction1
            .addSignature(key1.publicKey, sig1)
            .addSignature(key2.publicKey, sig2)
        // try submit to network
        const submit1 = await transaction1.execute(client)
        const receipt1 = await submit1.getReceipt(client)
        console.log("Transaction:" + receipt1.status)
        console.log("------")
    } catch (err) {
        console.error(err)
        console.log("------")
    }

    // Try again with sufficient signatures
    try {
        console.log("------")
        console.log("- Create a transaction with all the necessary signatures")
        const transaction2 = new TransferTransaction()
            .addHbarTransfer(multikeyAccount, -1)
            .addHbarTransfer('0.0.34008195', 1)
            .setNodeAccountIds([new AccountId(3)])
            .freezeWith(client)
        // add signatures to transaction
        const sig1 = key1.signTransaction(transaction2)
        const sig2 = key2.signTransaction(transaction2)
        const sig3 = key3.signTransaction(transaction2)
        // add all the correct signatures
        transaction2
            .addSignature(key1.publicKey, sig1)
            .addSignature(key2.publicKey, sig2)
            .addSignature(key3.publicKey, sig3)

        const submit2 = await transaction2.execute(client)
        const receipt2 = await submit2.getReceipt(client)
        console.log("Transaction:" + receipt2.status)
        console.log("------")
    } catch (err) {
        console.error(err)
        console.log("------")
    }

    // try with insufficient keys on threshold account
    try {
        console.log("------")
        console.log("- Try submit a transaction with insufficient signatures using threshold key")
        const transaction1 = new TransferTransaction()
            .addHbarTransfer(thresholdAccount, -1)
            .addHbarTransfer('0.0.34008195', 1)
            .setNodeAccountIds([new AccountId(3)])
            .freezeWith(client)
        // create signatures
        const sig1 = key1.signTransaction(transaction1)
        // add signatures to transaction
        transaction1
            .addSignature(key1.publicKey, sig1)
        // try submit to network
        const submit1 = await transaction1.execute(client)
        const receipt1 = await submit1.getReceipt(client)
        console.log("Transaction:" + receipt1.status)
        console.log("------")
    } catch (err) {
        console.error(err)
        console.log("------")
    }
    // try with threshold account
    try {
        console.log("- Try submit a transaction with sufficient signatures using threshold key")
        const transaction1 = new TransferTransaction()
            .addHbarTransfer(thresholdAccount, -1)
            .addHbarTransfer('0.0.34008195', 1)
            .setNodeAccountIds([new AccountId(3)])
            .freezeWith(client)
        // create signatures
        const sig1 = key1.signTransaction(transaction1)
        const sig2 = key2.signTransaction(transaction1)
        // add signatures to transaction
        transaction1
            .addSignature(key1.publicKey, sig1)
            .addSignature(key2.publicKey, sig2)
        // try submit to network
        const submit1 = await transaction1.execute(client)
        const receipt1 = await submit1.getReceipt(client)
        console.log("Transaction:" + receipt1.status)
        console.log("------")
    } catch (err) {
        console.error(err)
        console.log("------")
    }
}

main()

// async function sendTransaction() {
//     const transferTx = new TransferTransaction()
//         .addHbarTransfer('0.0.34008195', 100)
//         .addHbarTransfer(accountId, -100)

//     const executeTx = await transferTx.execute(client)
//     const transactionId = executeTx.transactionId

//     console.log("Transaction Id: " + transactionId)
// }

// sendTransaction()