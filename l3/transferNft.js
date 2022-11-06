require('dotenv').config()

const {
    TransferTransaction,
    Client,
    PrivateKey
} = require("@hashgraph/sdk")

const accountId = process.env.ACCOUNT_ID
const privateKey = PrivateKey.fromString(process.env.PRIVATE_KEY)
const client = Client.forTestnet().setOperator(accountId, privateKey)

const tokenId = "0.0.48813351"

async function transferNft() {
    const transaction = new TransferTransaction()
        .addNftTransfer(tokenId, 3, accountId, "0.0.34008195")
        .freezeWith(client)

    const submit = await transaction.execute(client)
    const receipt = await submit.getReceipt(client)

    console.log("CODE:" + receipt.status)
}

transferNft()