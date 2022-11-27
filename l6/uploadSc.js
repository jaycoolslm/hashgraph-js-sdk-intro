require('dotenv').config()

const {
    Client,
    ContractCreateFlow
} = require("@hashgraph/sdk")

const json = require("./contract/Contract.json")

const bytecode = json.data.bytecode.object

const accountId = process.env.ACCOUNT_ID
const privateKey = process.env.PRIVATE_KEY
const client = Client.forTestnet().setOperator(accountId, privateKey)


async function main() {
    const transaction = new ContractCreateFlow()
        .setGas(100000)
        .setBytecode(bytecode)


    const submit = await transaction.execute(client);
    const receipt = await submit.getReceipt(client);
    const newContractId = receipt.contractId;
    console.log("The new contract ID is " + newContractId);
}

main()