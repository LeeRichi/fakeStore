import React,{useState} from 'react'
import { Avatar, Typography, Button, TextField, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { postProduct } from '../../store/adminReducer';


const Add = () =>
{
  const dispatch = useDispatch(); 

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [images, setImages] = useState(['']);

  const productData = {
    title: title,
    price: parseFloat(price),
    description: description,
    categoryId: parseInt(categoryId),
    images: images,
  };

  const handleGenerateRandomImageUrl = () => {
    const randomImageUrl = `https://placeimg.com/640/480/any?random=${Math.floor(
      Math.random() * 1000
    )}`;

    setImages([randomImageUrl]); // Wrap randomImageUrl in an array
  };


  const handlePost = () =>
  {
    dispatch(postProduct(productData) as any)
  }
    
  return (
    <div style={{ marginLeft: '18vw', marginRight: '18vw', marginTop: '5vh' }}>
          <form>
            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Category ID"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              type="number"
              fullWidth
              margin="normal"
            />
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <TextField
                    label="Images"
                    value={images}
                    onChange={(e) => setImages([e.target.value])}
                    fullWidth
                    margin="normal"
                    style={{ marginBottom: '8px' }} // Add margin bottom for spacing
                />
                <Button
                    variant="contained"
                    onClick={handleGenerateRandomImageUrl}
                    style={{ marginTop: '8px', marginLeft: '15px', height: '50px', color: '#757575', backgroundColor: '#f5f5f5', borderColor:'blue' }} // Add margin top for spacing
                >
                    Generate Random Image URL
                </Button>
            </Box>
            <Button variant="contained" onClick={handlePost}>
              Create New Product
            </Button>
          </form>
        </div>
  )
}

export default Add