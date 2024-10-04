import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';
import { collection, getDocs, query, where } from 'firebase/firestore'; // Firebase Firestore imports
import { firestore } from '../base'; // Firebase Firestore instance
import { useAuth } from '../utilities/AuthState'; // Custom hook to get the authenticated user

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state for when data is being fetched
  const { user } = useAuth(); // Get the authenticated user (company)
  
  useEffect(() => {
    const fetchCompanyData = async () => {
      if (!user) return; // Exit if no user is authenticated

      setLoading(true); // Start loading
      try {
        const companyUid = user.uid; // Get the UID of the signed-in company
        
        // Query Firestore for products where the `companyUid` matches the signed-in user
        const productsQuery = query(
          collection(firestore, 'companies', companyUid, 'products')
        );
        const productsSnapshot = await getDocs(productsQuery);
        const productsList = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(productsList);
    
        // Query Firestore for transactions where the `companyUid` matches the signed-in user
        const transactionsQuery = query(
          collection(firestore, 'transactions'),
          where('companyUid', '==', companyUid)
        );
        const transactionsSnapshot = await getDocs(transactionsQuery);
        const transactionsList = transactionsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setTransactions(transactionsList);

      } catch (error) {
        console.error('Error fetching company data: ', error);
      } finally {
        setLoading(false); // Stop loading when data is fetched
      }
    };

    fetchCompanyData();
  }, [user]);

  return (
    <Container maxWidth="lg" sx={{ padding: { xs: 1, md: 3 }, mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Welcome, {user?.displayName || 'Company'}
      </Typography>

      {/* Overview Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Company Overview
        </Typography>
        <Typography variant="body1">
          <strong>Registration Number:</strong> {user?.businessNumber || 'N/A'}
        </Typography>
        <Typography variant="body1">
          <strong>Contact Email:</strong> {user?.email || 'N/A'}
        </Typography>
        <Button variant="contained" sx={{ mt: 2 }}>Edit Profile</Button>
      </Box>

      {/* Loader while fetching data */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* Products Table */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom>
              Products
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.length > 0 ? (
                    products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.description}</TableCell>
                        <TableCell>{product.price}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3}>No products available</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          {/* Transactions Table */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom>
              Transactions
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Transaction ID</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactions.length > 0 ? (
                    transactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>{transaction.id}</TableCell>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell>{transaction.amount}</TableCell>
                        <TableCell>{transaction.status}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4}>No transactions available</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </>
      )}
    </Container>
  );
};

export default Dashboard;
