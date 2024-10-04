import React, { useState } from "react";
import { Button, Grid, TextField, MenuItem, Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { PublicKey, Transaction, Connection } from '@solana/web3.js';
import { createTransferTransaction } from './cryptoServices'; // You'll implement this service

const Checkout = () => {
  // State to store the selected payment options
  const [paymentOption, setPaymentOption] = useState("full"); // "full" or "installment"
  const [paymentMethod, setPaymentMethod] = useState("crypto"); // "crypto" or "naira"
  const [installments, setInstallments] = useState(1); // Number of installments for installment payment
  const [amount, setAmount] = useState(1000); // Example amount
  const [status, setStatus] = useState("");

  // Form submission handler
  const handleCheckout = async () => {
    if (paymentMethod === "crypto") {
      try {
        // Handle cryptocurrency payment
        const transactionId = await handleCryptoPayment(paymentOption, amount, installments);
        setStatus(`Payment successful: ${transactionId}`);
      } catch (error) {
        console.error(error);
        setStatus("Crypto payment failed.");
      }
    } else if (paymentMethod === "naira") {
      // Handle Naira payment using a payment gateway like Flutterwave or Paystack
      handleNairaPayment(paymentOption, amount, installments);
    }
  };

  // Function to handle Crypto payment
  const handleCryptoPayment = async (option, totalAmount, numInstallments) => {
    const connection = new Connection('https://api.devnet.solana.com', 'confirmed'); // Solana devnet connection
    const recipientPublicKey = new PublicKey('RECIPIENT_SOLANA_ADDRESS'); // Replace with seller’s public key
    const payer = window.solana; // User's wallet (assumes Phantom wallet integration)

    if (!payer) throw new Error("Solana wallet not connected");

    const installmentAmount = option === "installment" ? totalAmount / numInstallments : totalAmount;
    
    // Send crypto payment (createTransferTransaction is your function to generate the transaction)
    const transactionId = await createTransferTransaction(payer, recipientPublicKey, installmentAmount, connection);
    
    return transactionId;
  };

  // Function to handle Naira payment using a payment gateway
  const handleNairaPayment = (option, totalAmount, numInstallments) => {
    const installmentAmount = option === "installment" ? totalAmount / numInstallments : totalAmount;

    // Here you'd integrate with a payment gateway like Flutterwave or Paystack
    // For example, you'd redirect the user to the Flutterwave/Paystack checkout with the required details.
    console.log(`Processing Naira payment of ₦${installmentAmount}`);
    // Your actual implementation would make an API request to the payment processor here.
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4">Checkout</Typography>
      </Grid>

      {/* Payment Option: Full or Installment */}
      <Grid item xs={12}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Payment Option</FormLabel>
          <RadioGroup row value={paymentOption} onChange={(e) => setPaymentOption(e.target.value)}>
            <FormControlLabel value="full" control={<Radio />} label="Full Payment" />
            <FormControlLabel value="installment" control={<Radio />} label="Installment Payment" />
          </RadioGroup>
        </FormControl>
      </Grid>

      {/* Number of Installments (if installment is selected) */}
      {paymentOption === "installment" && (
        <Grid item xs={12}>
          <TextField
            label="Number of Installments"
            type="number"
            value={installments}
            onChange={(e) => setInstallments(e.target.value)}
            fullWidth
          />
        </Grid>
      )}

      {/* Payment Method: Crypto or Naira */}
      <Grid item xs={12}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Payment Method</FormLabel>
          <RadioGroup row value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
            <FormControlLabel value="crypto" control={<Radio />} label="Cryptocurrency (USDC)" />
            <FormControlLabel value="naira" control={<Radio />} label="Naira (₦)" />
          </RadioGroup>
        </FormControl>
      </Grid>

      {/* Total Amount */}
      <Grid item xs={12}>
        <TextField
          label="Total Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          fullWidth
        />
      </Grid>

      {/* Submit Button */}
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleCheckout}>
          Proceed to Payment
        </Button>
      </Grid>

      {/* Payment Status */}
      <Grid item xs={12}>
        <Typography variant="body1" color="textSecondary">
          {status}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Checkout;
