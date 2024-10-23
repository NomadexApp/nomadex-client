import { Algodv2, encodeAddress, makeEmptyTransactionSigner } from "algosdk";
import { SmartAssetClient } from './SmartAssetClient'
import type { TransactionSignerAccount } from "@algorandfoundation/algokit-utils/types/account";

export class MySmartAsset {
    assetClient: SmartAssetClient;

    constructor(id: number, nodeClient: Algodv2, signer?: TransactionSignerAccount) {
        this.assetClient = new SmartAssetClient(
            {
                id: id,
                resolveBy: 'id',
                sender: signer ?? {
                    addr: 'DYX2V5XF4IKOHE55Z63XAHVBJTMYM723HK5WJZ72BDZ5AFEFKJ5YP4DOQQ',
                    signer: makeEmptyTransactionSigner()
                },
            },
            nodeClient
        );
    }

    static from(id: number, nodeClient: Algodv2) {
        return new MySmartAsset(id, nodeClient);
    }

    async arc200Symbol(): Promise<string> {
        const composer = this.assetClient.compose();
        const { returns: [symbolBuffer] } = await composer.arc200Symbol({}).simulate({
            allowMoreLogging: true,
            allowEmptySignatures: true,
            allowUnnamedResources: true
        });
        return Buffer.from(symbolBuffer).toString().replace(/\u0000/g, '');
    }


    async arc200Name(): Promise<string> {
        const composer = this.assetClient.compose();
        const { returns: [nameBuffer] } = await composer.arc200Name({}).simulate({
            allowMoreLogging: true,
            allowEmptySignatures: true,
            allowUnnamedResources: true
        });
        return Buffer.from(nameBuffer).toString().replace(/\u0000/g, '');
    }

    async arc200Decimals(): Promise<number> {
        const composer = this.assetClient.compose();
        const { returns: [decimals] } = await composer.arc200Decimals({}).simulate({
            allowMoreLogging: true,
            allowEmptySignatures: true,
            allowUnnamedResources: true
        });
        return decimals;
    }


    async arc200TotalSupply(): Promise<bigint> {
        const composer = this.assetClient.compose();
        const { returns: [supply] } = await composer.arc200TotalSupply({}).simulate({
            allowMoreLogging: true,
            allowEmptySignatures: true,
            allowUnnamedResources: true
        });
        return supply;
    }

    async manager(): Promise<string> {
        const composer = this.assetClient.compose();
        const { returns: [manager] } = await composer.manager({}).simulate({
            allowMoreLogging: true,
            allowEmptySignatures: true,
            allowUnnamedResources: true
        });
        return manager;
    }

    async arc200BalanceOf(address: string): Promise<bigint> {
        const composer = this.assetClient.compose();
        const { returns: [balance] } = await composer.arc200BalanceOf({ owner: address }).simulate({
            allowMoreLogging: true,
            allowEmptySignatures: true,
            allowUnnamedResources: true
        });
        return balance;
    }


    async arc200Allowance(spender: string, owner: string): Promise<bigint> {
        const composer = this.assetClient.compose();
        const { returns: [allowance] } = await composer.arc200Allowance({ spender, owner }).simulate({
            allowMoreLogging: true,
            allowEmptySignatures: true,
            allowUnnamedResources: true
        });
        return allowance;
    }


    async hasBox(owner: string, spender = encodeAddress(new Uint8Array(32))): Promise<boolean> {
        const composer = this.assetClient.compose();
        const ret = await composer.hasBox({ owner, spender }).simulate({
            allowMoreLogging: true,
            allowEmptySignatures: true,
            allowUnnamedResources: true
        });
        return ret.returns[0];
    }
}