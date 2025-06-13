import { Connection } from '@solana/web3.js';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const signature = params.id;

  if (!signature) {
    return NextResponse.json({ error: 'Transaction signature is required' }, { status: 400 });
  }

  try {
    const connection = new Connection('https://api.mainnet-beta.solana.com');
    
    const txData = await connection.getParsedTransaction(signature, {
      maxSupportedTransactionVersion: 0,
    });

    if (!txData) {
      return NextResponse.json({ error: 'Transaction not found.' }, { status: 404 });
    }
    
    return NextResponse.json(txData);

  } catch (e: any) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to fetch transaction data. Please check the signature." },
      { status: 500 }
    );
  }
}

