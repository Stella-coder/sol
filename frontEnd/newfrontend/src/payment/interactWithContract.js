import { Connection, PublicKey, Transaction, Keypair } from '@solana/web3.js';
import { Program, AnchorProvider, web3 } from '@project-serum/anchor';

const interactWithSmartContract = async () => {
  const connection = new Connection(clusterApiUrl('mainnet-beta'));
  const wallet = window.solana; // Use Solana wallet adapter
  const provider = new AnchorProvider(connection, wallet, AnchorProvider.defaultOptions());
  
  const programId = new PublicKey('your_program_id');
  const program = new Program(idl, programId, provider);

  const escrowAccount = Keypair.generate();
  
  // Call the createEscrow function from your contract
  const tx = await program.methods
    .createEscrow(new web3.BN(1000000)) // Amount in lamports
    .accounts({ escrowAccount: escrowAccount.publicKey })
    .rpc();
  
  console.log("Escrow created, tx:", tx);
};
