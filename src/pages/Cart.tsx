import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Typography, Card, CardMedia, CardContent, TextField, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { updateQuantity, removeFromCart, CartItem } from '../store/cartSlice';
import { Link } from 'react-router-dom'; 

interface Product {
  id: number;
  title: string;
  quantity: number;
  images: string[];
  price: number;
}

const Cart: React.FC = () => {
  const cartItems = useSelector((state: { cart: CartItem[] }) => state.cart);
  const dispatch = useDispatch();

  const handleQuantityChange = (item: Product, newQuantity: number) => {
    dispatch(updateQuantity({ itemId: item.id, newQuantity }));
  };

  const handleDeleteItem = (e: any) => {
    dispatch(removeFromCart(e.id));    
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <Typography variant="h4" component="h1" align="left" mt={4} mb={2}>
        Shopping Cart
      </Typography>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <Card key={item.id} style={{ display: "flex", marginBottom: "16px", width: "600px" }}>
                {/* Rest of the card content */}
                <CardMedia
                component="img"
                style={{
                  width: "250px",
                  height: "180px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
                image={item.images[0]}
                alt={item.title}
              />
              <CardContent style={{ flex: 1, paddingLeft: "16px" }}>
                <Typography variant="h6" component="div" mb={1}>
                  {item.title}
                </Typography>
                <Typography variant="body1" color="primary">
                  Price: ${item.price}
                </Typography>
                <div style={{ display: "flex", alignItems: "center", marginTop: "16px" }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    startIcon={<RemoveIcon />}
                    onClick={() => handleQuantityChange(item, item.quantity - 1)}
                  />
                  <Typography variant="body1" style={{ margin: "0 8px" }}>
                    {item.quantity}
                  </Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    startIcon={<AddIcon />}
                    onClick={() => handleQuantityChange(item, item.quantity + 1)}
                  />
                  <Button
                    variant="text"
                    color="secondary"
                    size="small"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDeleteItem(item)}
                    style={{ marginLeft: "auto" }}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
              </Card>
            ))
          ) : (
              <div>
                <Typography>Your cart is empty</Typography><br/>
                <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Button variant="outlined">back to shopping</Button>
                </Link>
              </div>
          )}
          {cartItems.map((item) => (
            <Card key={item.id} style={{ display: "flex", marginBottom: "16px", width: "600px" }}>
              {/* <CardMedia
                component="img"
                style={{
                  width: "250px",
                  height: "180px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
                image={item.images[0]}
                alt={item.title}
              />
              <CardContent style={{ flex: 1, paddingLeft: "16px" }}>
                <Typography variant="h6" component="div" mb={1}>
                  {item.title}
                </Typography>
                <Typography variant="body1" color="primary">
                  Price: ${item.price}
                </Typography>
                <div style={{ display: "flex", alignItems: "center", marginTop: "16px" }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    startIcon={<RemoveIcon />}
                    onClick={() => handleQuantityChange(item, item.quantity - 1)}
                  />
                  <Typography variant="body1" style={{ margin: "0 8px" }}>
                    {item.quantity}
                  </Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    startIcon={<AddIcon />}
                    onClick={() => handleQuantityChange(item, item.quantity + 1)}
                  />
                  <Button
                    variant="text"
                    color="secondary"
                    size="small"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDeleteItem(item)}
                    style={{ marginLeft: "auto" }}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent> */}
            </Card>
          ))}
        </div>
        <div style={{ border: "1px solid #ccc", padding: "16px", marginLeft: "16px", width: "50%", height: "80%" }}>
          <Typography variant="h6" component="div" mb={1}>
            Shipping Details
          </Typography>
          <TextField label="Your Name" fullWidth margin="normal" />
          <TextField label="Phone Number" fullWidth margin="normal" />
          <TextField label="Email" fullWidth margin="normal" />
          <TextField label="Home Address" fullWidth margin="normal" />
          <TextField label="Postal Code" fullWidth margin="normal" />
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "16px" }}>
            <Button variant="contained" color="primary" fullWidth>
              Check Out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
