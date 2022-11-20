require('dotenv').config()

const {
    TransferTransaction,
    Client,
    PrivateKey
} = require("@hashgraph/sdk")

const accountId = process.env.ACCOUNT_ID
const privateKey = PrivateKey.fromString(process.env.PRIVATE_KEY)

const hashpackId = process.env.HASHPACK_ID
const hashpackKey = PrivateKey.fromString(process.env.HASHPACK_KEY)
const client = Client.forTestnet().setOperator(accountId, privateKey)

// info of nft to sell 
const nftId = "0.0.48813351"
const serial = 2

async function atomicSwap() {
    const transaction = new TransferTransaction()
        .addHbarTransfer(hashpackId, 100)
        .addHbarTransfer(accountId, -100)
        .addNftTransfer(nftId, serial, hashpackId, accountId)
        .freezeWith(client)

    const signedByHashpack = await transaction.sign(hashpackKey)
    const submit = await signedByHashpack.execute(client)

    const receipt = await submit.getReceipt(client)

    console.log("Status:" + receipt.status)

}

atomicSwap()

