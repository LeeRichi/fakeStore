import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Card, CardContent, CardMedia, Box, Button, Grid, IconButton } from '@mui/material';
import { useParams } from 'react-router-dom';
import { addToCart } from "../store/cartSlice";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

import { CartItem } from '../store/cartSlice';

const ProductDetail = () => {
  const { id } = useParams();
  const products = useSelector((state: any) => state.products.products);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  if (!products) {
    return <Typography variant="body1">Loading...</Typography>;
  }

  const product = products.find((product: any) => product.id.toString() === id);

  if (!product) {
    return <Typography variant="body1">Product not found</Typography>;
  }

  const handleAddToCart = () => {
    const cartItem: CartItem = {
        id: product.id,
        title: product.title,
        images: product.images,
        price: product.price,
        quantity: quantity,
    };
    dispatch(addToCart(cartItem));
  };



  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div style={{ marginLeft: '18vw', marginRight: '18vw', marginTop: '10vh' }}>
      <Typography variant="h4">{product.title}</Typography>
      <Card>
        <Grid container spacing={2} overflow='hidden'>
          {/* First image */}
          <Grid item xs={12}>
            <CardMedia
              component="img"
              src={product.images[0]}
              alt={product.title}
              style={{
                width: '100%',
                height: 400,
                objectFit: 'cover',
              }}
            />
          </Grid>

          {/* Second and third images */}
          <Grid item container xs={12} spacing={2}>
            {product.images.slice(1).map((image: string, index: number) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <CardMedia
                  component="img"
                  src={image}
                  alt={product.title}
                  style={{
                    width: '100%',
                    height: 200,
                    objectFit: 'cover',
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>

        <CardContent>
          <Typography variant="body1">{product.description}</Typography>
          <Typography variant="h6">Price: ${product.price}</Typography>
          <Box display="flex" alignItems="center" mt={2}>
            <IconButton onClick={handleDecreaseQuantity}>
              <RemoveIcon />
            </IconButton>
            <Typography variant="body1">{quantity}</Typography>
            <IconButton onClick={handleIncreaseQuantity}>
              <AddIcon />
            </IconButton>
          </Box>
          <Button variant="contained" color="primary" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProductDetail;
