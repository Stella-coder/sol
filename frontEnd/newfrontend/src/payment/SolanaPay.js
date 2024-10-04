import { createQR, encodeURL } from '@solana/pay';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import BigNumber from 'bignumber.js';

const SolanaPay = () => {
  const handlePayment = () => {
    const connection = new Connection(clusterApiUrl('mainnet-beta'));
    const recipient = new PublicKey('your_merchant_public_key');
    const amount = new BigNumber(1.5); // Example: $1.5 worth of SOL
    const reference = new PublicKey('unique_reference_id');
    const label = 'SolRiggs Energy';
    const message = 'Payment for renewable energy product';
    const memo = 'Order_123';

    const url = encodeURL({ recipient, amount, reference, label, message, memo });
    const qrCode = createQR(url, 512, 'transparent');
    qrCode.appendTo(document.getElementById('qr-code-container'));
  };

  return (
    <div>
      <h1>Pay with Solana Pay</h1>
      <div id="qr-code-container"></div>
      <button onClick={handlePayment}>Generate Payment QR Code</button>
    </div>
  );
};

export default SolanaPay;
