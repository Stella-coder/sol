import { findReference, validateTransactionSignature } from '@solana/pay';
import { Connection, clusterApiUrl } from '@solana/web3.js'; // Solana connection
import { doc, updateDoc } from 'firebase/firestore'; // Firestore functions
import { firestore } from '../base'; // Your Firebase config file

// Function to check the payment status and update Firestore
const checkPaymentStatus = async (reference, orderId) => {
  const connection = new Connection(clusterApiUrl('mainnet-beta'));

  try {
    // Find reference and check the status of the payment
    const result = await findReference(connection, reference, { finality: 'confirmed' });
    
    if (result.confirmationStatus === 'finalized') {
      console.log('Payment confirmed');

      // Once the payment is confirmed, update the order status in Firestore
      const orderRef = doc(firestore, 'orders', orderId); // Get the order document by orderId
      await updateDoc(orderRef, {
        status: 'Payment Confirmed', // Update the payment status field
        paymentTimestamp: new Date(), // Optionally add the timestamp
      });

      console.log('Order status updated successfully in Firestore.');
    } else {
      console.log('Payment not finalized yet.');
    }
  } catch (error) {
    console.error('Error checking payment status:', error);
  }
};

export default checkPaymentStatus;
