require('dotenv').config()

const {
    TokenCreateTransaction,
    Client,
    TokenType,
    PrivateKey
} = require("@hashgraph/sdk")

const accountId = process.env.ACCOUNT_ID
const privateKey = PrivateKey.fromString(process.env.PRIVATE_KEY)
const client = Client.forTestnet().setOperator(accountId, privateKey)

async function createNft() {
    const transaction = new TokenCreateTransaction()
        .setTokenName("Circle Students NFT")
        .setTokenSymbol("CS")
        .setTokenType(TokenType.NonFungibleUnique)
        .setTreasuryAccountId(accountId)
        .setSupplyKey(privateKey.publicKey)

    const submit = await transaction.execute(client)
    const receipt = await submit.getReceipt(client)

    console.log("The token ID is: " + receipt.tokenId)
}

createNft()