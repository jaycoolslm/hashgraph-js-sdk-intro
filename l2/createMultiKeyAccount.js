require('dotenv').config()

const {
    AccountCreateTransaction,
    PrivateKey,
    Client,
    KeyList
} = require('@hashgraph/sdk')

const accountId = process.env.ACCOUNT_ID
const privateKey = process.env.PRIVATE_KEY
const client = Client.forTestnet().setOperator(accountId, privateKey)


const key1 = PrivateKey.fromString(process.env.KEY_1)
const key2 = PrivateKey.fromString(process.env.KEY_2)
const key3 = PrivateKey.fromString(process.env.KEY_3)

async function createMultiKeyAccount() {
    const keyList = [key1.publicKey, key2.publicKey, key3.publicKey]
    const multiKey = new KeyList(keyList)
    // create multi key account transaction
    const transaction = new AccountCreateTransaction()
        .setKey(multiKey)
        .setInitialBalance(100)
    // submit to the hedera hashgraph
    const submit = await transaction.execute(client)
    // get receipt
    const receipt = await submit.getReceipt(client)
    // get account id from receipt
    const accountId = receipt.accountId

    console.log("Multi key account id: " + accountId)
}

createMultiKeyAccount()