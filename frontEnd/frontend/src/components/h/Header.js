import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/styles";
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

// Ensure to handle 'data' and 'dispatch' if used

const Header = () => {
    const [toggle, setToggle] = useState(false);
    const [cartToggle, setCartToggle] = useState(false);
    const [navbar, setNavbar] = useState(false);

    const changeToggle = () => {
        setToggle(prev => !prev);
        console.log(toggle);
    };

    const changeCartToggle = () => {
        setCartToggle(prev => !prev);
        console.log(cartToggle, "cart");
    };

    const changeBgColor = () => {
        if (window.scrollY >= 100) {
            setNavbar(true);
        } else {
            setNavbar(false);
        }
    };

    useEffect(() => {
        changeBgColor();
        window.addEventListener("scroll", changeBgColor);

        // Cleanup event listener on component unmount
        return () => window.removeEventListener("scroll", changeBgColor);
    }, []);

    return (
        <>
            <MyContainer sx={{ backgroundColor: navbar ? "#1B2024" : "black" }}>
                <Wrapper>
                    <MenuH onClick={changeToggle}><MenuIcon /></MenuH>
                    <Logo>logo</Logo>
                    <Wrapper2>
                        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                            <MyTypography sx={{ fontSize: "12px" }}>Home</MyTypography>
                        </Link>
                        <Link to="/menu" style={{ textDecoration: "none", color: "white" }}>
                            <MyTypography sx={{ fontSize: "12px" }}>Our Menu</MyTypography>
                        </Link>
                        <Link to="/gallery" style={{ textDecoration: "none", color: "white" }}>
                            <MyTypography sx={{ fontSize: "12px" }}>Gallery</MyTypography>
                        </Link>
                        <Link to="/contact" style={{ textDecoration: "none", color: "white" }}>
                            <MyTypography sx={{ fontSize: "12px" }}>Contact</MyTypography>
                        </Link>
                    </Wrapper2>
                    <Cart onClick={changeCartToggle}>
                        <ShoppingCartIcon />
                        <div style={{ position: "absolute", fontSize: "10px", color: "#DEA954", left: 20, bottom: 0, fontWeight: "bold" }}>
                            {/* {data?.length} */}
                        </div>
                    </Cart>
                </Wrapper>
            </MyContainer>
            {toggle && (
                <MobileWrapper>
                    <div style={{ width: "100%", display: "flex", justifyContent: "center", cursor: "pointer" }} onClick={changeToggle}>X</div>
                    <WrapText>
                        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                            <MyTypographyMobile onClick={changeToggle} sx={{ fontSize: "12px" }}>Home</MyTypographyMobile>
                        </Link>
                        <Link to="/menu" style={{ textDecoration: "none", color: "white" }}>
                            <MyTypographyMobile onClick={changeToggle} sx={{ fontSize: "12px" }}>Our Menu</MyTypographyMobile>
                        </Link>
                        <Link to="/gallery" style={{ textDecoration: "none", color: "white" }}>
                            <MyTypographyMobile onClick={changeToggle} sx={{ fontSize: "12px" }}>Gallery</MyTypographyMobile>
                        </Link>
                        <Link to="/contact" onClick={changeToggle} style={{ textDecoration: "none", color: "white" }}>
                            <MyTypographyMobile sx={{ fontSize: "12px" }}>Contact</MyTypographyMobile>
                        </Link>
                    </WrapText>
                </MobileWrapper>
            )}
            {cartToggle && (
                <CartContainer>
                    <CartWrapper>
                        <CartHeader>
                            <HoldH>SIGN IN</HoldH>
                            <HoldH>VIEW ORDER</HoldH>
                            <div style={{ marginRight: "20px", cursor: "pointer" }} onClick={changeCartToggle}>X</div>
                        </CartHeader>
                        {/* Uncomment and handle properly if using data and dispatch */}
                        {/* 
                        <HoldScroll>
                            {data?.length > 0 ?
                                data.map((props) => (
                                    <CartCard key={props.id}>
                                        <Hold>
                                            <Text>
                                                <Name>{props.name}</Name>
                                                <div style={{ display: "flex" }}>
                                                    {props.qty} x <Price># {props.price}</Price>
                                                </div>
                                            </Text>
                                            <CartImage src={props.avatar} />
                                        </Hold>
                                        <DeleteIconHold onClick={() => {
                                            dispatch(removeOrder(props));
                                        }}><DeleteIcon sx={{ fontSize: "15px", color: "tomato" }} /></DeleteIconHold>
                                    </CartCard>
                                )) : "No item"
                            }
                        </HoldScroll>
                        <SubTotal>
                            SubTotal: <Price># {totalCost}</Price>
                        </SubTotal>
                        <Link to="/order" style={{ textDecoration: "none", color: "white" }}>
                            <Checkout onClick={changeCartToggle}>Checkout</Checkout>
                        </Link>
                        */}
                        <div>hello</div>
                    </CartWrapper>
                </CartContainer>
            )}
        </>
    );
};

export default Header;

const MyContainer = styled(Box)({
    height: "80px",
    width: "100%",
    position: "fixed",
    color: "white",
    zIndex: 10,
    transition: "all 350ms",
});

const Wrapper = styled(Box)({
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
});

const Logo = styled("div")({}); // Consider adding styles or removing if not needed

const WrapText = styled("div")({
    display: "flex",
    flexDirection: 'column',
    height: "50vh",
    justifyContent: "space-around",
    padding: "0px 20px",
});

const MenuH = styled("div")({
    "@media screen and (min-width: 768px)": {
        display: "none"
    }
});

const Wrapper2 = styled(Box)({
    display: "flex",
    justifyContent: "space-around",
    width: "400px",
    "@media screen and (max-width: 768px)": {
        display: "none"
    }
});

const Cart = styled(Box)({
    display: "flex",
    position: "relative",
    cursor: "pointer"
});

const MobileWrapper = styled(Box)({
    height: "100vh",
    width: "100vw",
    backgroundColor: "rgba(27,32,36, 0.99)",
    display: "flex",
    color: "white",
    position: "fixed",
    flexDirection: 'column',
    zIndex: 1000,
    "@media screen and (min-width: 768px)": {
        display: "none"
    }
});

const MyTypography = styled("div")({
    fontSize: "11px",
    textTransform: "uppercase",
    cursor: "pointer",
    transition: "all 350ms",
    "&:hover": {
        color: "#DEA954",
    }
});

const MyTypographyMobile = styled("div")({
    fontSize: "11px",
    textTransform: "uppercase",
    cursor: "pointer",
    transition: "all 350ms",
    borderBottom: "1px solid #DEA954",
    padding: "5px 0px",
    "&:hover": {
        color: "#DEA954",
    }
});

const CartContainer = styled("div")({
    width: "100%",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.2)",
    position: "fixed",
    display: "flex",
    justifyContent: "flex-end",
    color: "white",
    zIndex: 100,
});

const CartWrapper = styled("div")({
    width: "400px",
    height: "400px",
    backgroundColor: "#1B2024",
    marginTop: "80px",
    marginRight: "20px",
    borderTop: "1px solid #DEA954",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "@media screen and (max-width: 768px)": {
        width: "100vw",
        height: "100vh",
        margin: 0
    }
});

const CartHeader = styled("div")({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: "10px 20px",
    borderBottom: "1px solid #DEA954",
});

const HoldH = styled("div")({
    fontSize: "16px",
    fontWeight: "bold",
});

const HoldScroll = styled("div")({
    width: "100%",
    height: "calc(100% - 100px)",
    overflowY: "scroll",
});

const CartCard = styled("div")({
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    padding: "10px",
    borderBottom: "1px solid #DEA954",
});

const Hold = styled("div")({
    display: "flex",
    alignItems: "center",
});

const Text = styled("div")({
    display: "flex",
    flexDirection: "column",
});

const Name = styled("div")({
    fontWeight: "bold",
});

const Price = styled("div")({
    color: "#DEA954",
});

const CartImage = styled("img")({
    width: "50px",
    height: "50px",
    objectFit: "cover",
});

const DeleteIconHold = styled("div")({
    cursor: "pointer",
});

const SubTotal = styled("div")({
    marginTop: "10px",
    fontSize: "16px",
    fontWeight: "bold",
});

const Checkout = styled("div")({
    marginTop: "20px",
    padding: "10px",
    backgroundColor: "#DEA954",
    color: "white",
    textAlign: "center",
    cursor: "pointer",
});
