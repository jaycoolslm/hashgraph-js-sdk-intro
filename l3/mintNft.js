require('dotenv').config()

const {
    TokenMintTransaction,
    Client,
    PrivateKey
} = require("@hashgraph/sdk")

const accountId = process.env.ACCOUNT_ID
const privateKey = PrivateKey.fromString(process.env.PRIVATE_KEY)
const client = Client.forTestnet().setOperator(accountId, privateKey)

const tokenId = "0.0.48813351"

async function mintNft() {
    const transcation = new TokenMintTransaction()
        .setTokenId(tokenId)
        .setMetadata([Buffer.from("QmPfKFgyvCvu9KY4chdRWUn5jgekU2dssBo9WWZJ5fmJtv")])

    const submit = await transcation.execute(client)
    const receipt = await submit.getReceipt(client)

    console.log(`- Minted NFT ${tokenId} with serial: ${receipt.serials[0].low} \n`);

}

mintNft()