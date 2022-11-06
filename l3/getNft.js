require('dotenv').config()

const {
    TokenNftInfoQuery,
    TokenId,
    NftId,
    Client,
    PrivateKey
} = require("@hashgraph/sdk")

const accountId = process.env.ACCOUNT_ID
const privateKey = PrivateKey.fromString(process.env.PRIVATE_KEY)
const client = Client.forTestnet().setOperator(accountId, privateKey)

const tokenId = TokenId.fromString("0.0.48163190")

async function getNftInfo() {
    const transaction = await new TokenNftInfoQuery()
        .setNftId(new NftId(tokenId, 1))
        .execute(client)

    const metadata = transaction[0].metadata

    console.log(metadata)
    console.log(metadata.toString())
}

getNftInfo()