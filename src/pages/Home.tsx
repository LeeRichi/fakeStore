import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, fetchProductsByJoin } from "../store/productSlice";
import { Box, Card, CardContent, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { addToCart } from "../store/cartSlice";

import Sidebar from "../components/Sidebar";
import Filterbar from "../components/Filterbar";
import { log } from "console";


const Home = () =>
{
  const dispatch = useDispatch();
  const products = useSelector((state: any) => state.products.products);

  const [currentPage, setCurrentPage] = useState(1);
  const [categoryId, setCategoryId] = useState<string[]>([]);
  const [searchProps, setSearchProps] = useState<string>('');
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(999);
  const productsPerPage = 25;
  const [sortingOption, setSortingOption] = useState('');
  const [sortedProducts, setSortedProducts] = useState<any[]>([]);

 
  const handleAddToCart = (e: any, product: any) => {
    e.preventDefault();
    dispatch(addToCart(product));
  };

  useEffect(() => {
    dispatch(fetchProductsByJoin({ categoryId: String(categoryId), minPrice, maxPrice, searchProps }) as any);
  }, [categoryId, minPrice, maxPrice, searchProps]);  

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  
  useEffect(() => {
    let sortedProductsCopy = [...products];
    if (sortingOption) {
      switch (sortingOption) {
        case 'price-lowest':
          sortedProductsCopy = sortedProductsCopy.sort((a, b) => a.price - b.price);
          break;
        case 'price-highest':
          sortedProductsCopy = sortedProductsCopy.sort((a, b) => b.price - a.price);
          break;
        case 'name':          
          sortedProductsCopy = sortedProductsCopy.sort((a, b) => {
            const nameA = a.title || '';
            const nameB = b.title || '';
            return nameA.localeCompare(nameB);
          });
          break;
        default:
          break;
      }
    }
    setSortedProducts(sortedProductsCopy);
  }, [products, sortingOption]);
    
  return (
    <Box display="flex">
      <Sidebar categoryId={categoryId} setCategoryId={setCategoryId}/>
      <Box flex="1" p={2}>
        <Filterbar searchProps={searchProps} setSearchProps={setSearchProps} minPrice={minPrice} setMinPrice={setMinPrice} maxPrice={maxPrice} setMaxPrice={setMaxPrice} sortingOption={sortingOption} setSortingOption={setSortingOption} />
        <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2}>
          {currentProducts.map((product: any) => (
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
                  <Typography variant="h6" color="primary">
                    category: ${product.category.id}
                  </Typography>
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
          {Array(Math.ceil(products.length / productsPerPage))
          .fill(null)
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
