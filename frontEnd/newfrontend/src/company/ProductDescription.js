import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button, CircularProgress, Paper, Grid, Divider } from '@mui/material';
import { styled } from '@mui/system';
import img from "../assets/image1.jpg"
// import { firestore } from '../base'; // Uncomment for Firebase integration

const ImageContainer = styled('div')(({ theme }) => ({
  width: '100%',
  height: '300px',
  background: `url(${img}) no-repeat center center`,
  backgroundSize: 'cover',
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(4),
}));

const DetailContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

const ProductDescriptionPage = ({ productId }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch product data from Firestore by productId
    /*
    const fetchProduct = async () => {
      try {
        const doc = await firestore.collection('products').doc(productId).get();
        if (doc.exists) {
          setProduct(doc.data());
        } else {
          console.log('No such product!');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
      setLoading(false);
    };
    fetchProduct();
    */
    // Mock data for testing
    setTimeout(() => {
      setProduct({
        name: 'Solar Power Panel',
        description: 'High-efficiency solar panels for residential use, with a lifespan of over 25 years.',
        price: 5000,
        installmentOptions: '6 months, 12 months',
        disputePolicy: 'Customers can raise disputes within 30 days of purchase for defective items.',
        imageUrl: {img}, // Replace with real image URL
        energyOutput: '300 kW/h per month',
        warranty: '10-year warranty included',
      });
      setLoading(false);
    }, 1500);
  }, [productId]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ padding: 2 , paddingTop:"70px"}}>
      {product && (
        <Paper sx={{ padding: 3 }}>
          {/* Product Image */}
          <ImageContainer sx={{ image: product.imageUrl }}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              {loading && <CircularProgress />}
            </Box>
          </ImageContainer>

          {/* Product Details */}
          <Typography variant="h4" gutterBottom>{product.name}</Typography>
          <Typography variant="body1" color="textSecondary" paragraph>{product.description}</Typography>

          {/* Price and Installment Options */}
          <DetailContainer>
            <Typography variant="h6">Price: ${product.price}</Typography>
            <Typography variant="h6">Installment Plans:</Typography>
            <Typography variant="body1" color="textSecondary">{product.installmentOptions}</Typography>
          </DetailContainer>

          {/* Additional Product Information */}
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={6}>
              <Typography variant="h6">Energy Output:</Typography>
              <Typography variant="body1" color="textSecondary">{product.energyOutput}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6">Warranty:</Typography>
              <Typography variant="body1" color="textSecondary">{product.warranty}</Typography>
            </Grid>
          </Grid>

          {/* Dispute Resolution */}
          <Box sx={{ mt: 4 }}>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="h6">Dispute Policy</Typography>
            <Typography variant="body1" color="textSecondary">{product.disputePolicy}</Typography>
          </Box>

          {/* CTA Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button variant="contained" color="primary" sx={{ bgcolor: '#2E6B62' }}>
              Buy Now
            </Button>
            <Button variant="outlined" color="secondary">
              Pay in Installments
            </Button>
          </Box>
        </Paper>
      )}
    </Container>
  );
};

export default ProductDescriptionPage;
