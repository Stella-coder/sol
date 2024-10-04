import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/system";
import { useNavigate, useParams } from "react-router-dom"; // For navigation
import pool from "../assets/image1.jpg"; // Your background image
import { addProducts, addToCart } from '../utilities/ReduxGlobal'; // Import actions from your slice
import { firestore } from '../base'; // Ensure you import your Firebase configuration
import { collectionGroup, getDocs } from 'firebase/firestore'; // Import collectionGroup to fetch from all sub-collections

const Products = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Navigation hook
  const products = useSelector((state) => state.marketplace.products); // Get products from Redux store
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetching products from all companies' Firestore sub-collections
  const fetchProducts = async () => {
    try {
      // Use collectionGroup to query across all 'products' sub-collections under 'companies'
      const productData = await getDocs(collectionGroup(firestore, "products"));
      const items = productData.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      dispatch(addProducts(items)); // Dispatch action to add products to Redux store
    } catch (error) {
      console.error("Error fetching products: ", error);
    }
  };

  // Search functionality: filter by search term
  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Filtering logic (search-based)
  useEffect(() => {
    let updatedProducts = products;

    if (searchTerm) {
      updatedProducts = updatedProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm)
      );
    }

    setFilteredProducts(updatedProducts);
  }, [searchTerm, products]);

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle adding products to the cart
  const handleAddToCart = (product) => {
    dispatch(addToCart(product)); // Dispatch action to add the product to the cart
  };

  // Handle navigation to product description page
  const handleViewMore = (productId) => {
    navigate(`/product/${productId}`); // Navigating to product description page
  };

  return (
    <Container>
      <Wrapper>
        <Header>
          <Overlay />
          <Content>
            <Title>SolRiggs Products</Title>
            <Subtitle>Your trusted source for renewable energy</Subtitle>
          </Content>
        </Header>

        <SearchInput
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearch}
        />

        <Room>
          {filteredProducts.map((product) => (
            <Card key={product.id}>
              <Img src={pool} alt={product.name} />
              <Text>
                <Name>{product.name}</Name>
                <Price>${product.price}</Price>
                <Category>Energy Output : {product.energyOutput}</Category>

                <Button onClick={() => handleAddToCart(product)}>Add to Cart</Button>
                <Button onClick={() => handleViewMore(product.id)}>View More</Button>
              </Text>
            </Card>
          ))}
        </Room>
      </Wrapper>
    </Container>
  );
};

export default Products;

// Styled Components

const Container = styled("div")({
  width: "100%",
  minHeight: "120vh",
  display: "flex",
  flexDirection: "column",
});

const Wrapper = styled("div")({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
});

const Header = styled("div")({
  width: "100%",
  height: "250px",
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: `url(${pool})`,
  backgroundPosition: "center",
  backgroundSize: "cover",
});

const Overlay = styled("div")({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay for the modal effect
});

const Content = styled("div")({
  color: "#fff",
  textAlign: "center",
  zIndex: 1, // Ensures content is above the overlay
});

const Title = styled("h1")({
  fontSize: "3rem",
});

const Subtitle = styled("span")({
  fontSize: "1.2rem",
  marginTop: "10px",
  display: "block",
});

const SearchInput = styled("input")({
  width: "80%",
  padding: "10px",
  margin: "20px auto",
  display: "block",
  fontSize: "1rem",
});

const Room = styled("div")({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-around",
});

const Card = styled("div")({
  width: "280px",
  margin: "20px",
  padding: "20px",
  boxShadow: "0 3px 8px rgba(0, 0, 0, 0.24)",
});

const Img = styled("img")({
  width: "100%",
  height: "200px",
  objectFit: "cover",
});

const Text = styled("div")({
  textAlign: "center",
  marginTop: "10px",
});

const Name = styled("div")({
  fontSize: "1.5rem",
  fontWeight: "bold",
});

const Price = styled("div")({
  fontSize: "1rem",
  margin: "5px 0",
});

const Category = styled("div")({
  fontSize: "0.9rem",
  color: "gray",
});

const Button = styled("button")({
  margin: "10px",
  padding: "10px 20px",
  backgroundColor: "rgb(46,107,98)",
  color: "white",
  border: "none",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#DEA954",
  },
});
