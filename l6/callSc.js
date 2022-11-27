require('dotenv').config()

const {
    Client,
    ContractCallQuery,
    ContractFunctionParameters
} = require("@hashgraph/sdk")

const accountId = process.env.ACCOUNT_ID
const privateKey = process.env.PRIVATE_KEY
const client = Client.forTestnet().setOperator(accountId, privateKey)

const contractId = "0.0.48978135"

async function main() {

    const transaction = new ContractCallQuery()
        .setContractId(contractId)
        .setGas(100000)
        .setFunction("returnString", new ContractFunctionParameters()
            .addString("This is the string!")
        )

    const submit = await transaction.execute(client)
    const returnedString = submit.getString(0)
    console.log("The string you entered was: " + returnedString);
}

main()