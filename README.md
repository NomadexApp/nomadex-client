## nomadex-client

### Install 

```shell
npm i -d nomadex-client
```

### Swap
```ts
import { MyPool, TokenType } from 'nomadex-client';
import type { TransactionSigner, Algodv2 } from 'algosdk';

async function swap(
    poolId: number,
    network: 'voimain' | 'voitest',
    algod: Algodv2,
    signer: { addr: string; signer: TransactionSigner; },
    tokenA: { id: number, type: TokenType },
    tokenB: { id: number, type: TokenType },
    amountA: bigint,
    minAmountB: bigint,
    isDirectionAlphaToBeta: boolean,
) {
    try {
        const poolClient = new MyPool(
            poolId,
            network,
            algod,
            signer
        );
        const receivedAmount = await poolClient.swap(
            tokenA,
            tokenB,
            amountA,
            minAmountB,
            isDirectionAlphaToBeta
        );
        return receivedAmount;
    } catch (e) {
        console.error(e);
    }
}
```

### Add Liquidity
```ts
import { MyPool, TokenType } from 'nomadex-client';
import type { TransactionSigner, Algodv2 } from 'algosdk';

async function addLiquidity(
    poolId: number,
    network: 'voimain' | 'voitest',
    algod: Algodv2,
    signer: { addr: string; signer: TransactionSigner; },
    tokenA: { id: number, type: TokenType },
    tokenB: { id: number, type: TokenType },
    amountA: bigint,
    amountB: bigint,
) {
    try {
        const poolClient = new MyPool(
            poolId,
            network,
            algod,
            signer
        );
        const success = await poolClient.addLiquidity(
            tokenA,
            tokenB,
            amountA,
            amountB,
        );
        return success;
    } catch (e) {
        console.error(e);
    }
}
```

### Remove Liquidity
```ts
import { MyPool, TokenType } from 'nomadex-client';
import type { TransactionSigner, Algodv2 } from 'algosdk';

async function removeLiquidity(
    poolId: number,
    network: 'voimain' | 'voitest',
    algod: Algodv2,
    signer: { addr: string; signer: TransactionSigner; },
    amountLpt: bigint,
) {
    try {
        const poolClient = new MyPool(
            poolId,
            network,
            algod,
            signer
        );
        const success = await poolClient.removeLiquidity(amountLpt);
        return success;
    } catch (e) {
        console.error(e);
    }
}
```
