import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/productSlice";
import { Box, Card, CardContent, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { addToCart } from "../store/cartSlice";

const Home = () =>
{
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 25;

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    dispatch(addToCart(product));
  };
  
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    
  return (
    <Box display="flex">
      {/* <Sidebar categories={categories} setCategories={setCategories} fetchProducts={fetchProducts} setMinPrice={setMinPrice} setMaxPrice={setMaxPrice} /> */}
      <Box flex="1" p={2}>
        {/* <TopBar searchProps={searchProps} setSearchProps={setSearchProps} minPrice={minPrice} setMinPrice={setMinPrice} maxPrice={maxPrice} setMaxPrice={setMaxPrice} /> */}
        <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2}>
          {currentProducts.map((product) => (
            <Card key={product.id} sx={{ width: 300 }}>
              <Link to={`/products/${product.id}`}>
                <Box sx={{ height: 200, overflow: 'hidden' }}>
                  <img src={product.category.image} alt="Product" style={{ width: '100%', objectFit: 'cover' }} />
                </Box>
                <CardContent>
                  <Typography variant="h6" component="div" mb={2}>
                    {product.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" mb={2}>
                    {product.description}
                  </Typography>
                  <Typography variant="h6" color="primary">
                    Price: ${product.price}
                  </Typography>
                  <Button variant="contained" color="primary" onClick={(e) => handleAddToCart(e, product)}>
                      Add to Cart
                  </Button>
                </CardContent>
              </Link>
            </Card>
          ))}
        </Box>
        <Box display="flex" justifyContent="center" mt={4}>
          <Button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous Page
          </Button>
          {/* this line show the pages */}
          {Array(Math.ceil(products.length / productsPerPage))
          .fill()
          .map((_, index) => (
            <Button
              key={index}
              variant={currentPage === index + 1 ? "contained" : "outlined"}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </Button>
          ))}
          <Button
            disabled={indexOfLastProduct >= products.length}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next Page
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
