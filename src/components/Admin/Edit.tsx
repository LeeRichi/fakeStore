import React, {useState} from 'react'
import { Avatar, Typography, Button, TextField, Box } from '@mui/material';
import { editProduct } from '../../store/adminReducer';
import { useDispatch } from 'react-redux';



const Edit = () =>
{
  const [id, setId] = useState('')
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [images, setImages] = useState(['']);

  const dispatch = useDispatch(); 

  const handleGenerateRandomImageUrl = () => {
    const randomImageUrl = `https://placeimg.com/640/480/any?random=${Math.floor(
      Math.random() * 1000
    )}`;

    setImages([randomImageUrl]);
  };

  const handleEdit = () =>
  {
    dispatch(editProduct(
      {id,
      title,
      price: parseFloat(price),
      description,
      categoryId: parseInt(categoryId),
      images,}
    ) as any)
  }

  return (
    <div style={{ marginLeft: '18vw', marginRight: '18vw', marginTop: '5vh' }}>
          <form>
            <TextField
              label="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              fullWidth
              margin="normal"
            />
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
                    style={{ marginBottom: '8px' }}
                />
                <Button
                    variant="contained"
                    onClick={handleGenerateRandomImageUrl}
                    style={{ marginTop: '8px', marginLeft: '15px', height: '50px', color: '#757575', backgroundColor: '#f5f5f5', borderColor:'blue' }} // Add margin top for spacing
                >
                    Generate Random Image URL
                </Button>
            </Box>
            <Button variant="contained" onClick={handleEdit}>
              Edit The Product
            </Button>
          </form>
        </div>
  )
}

export default Edit