import React,{ useState} from 'react'
import { Button, TextField, } from '@mui/material';
import { deleteProduct } from '../../store/adminReducer';
import { useDispatch } from 'react-redux';



const Delete = () =>
{
  const dispatch = useDispatch();
  
  const [id, setId] = useState<number | undefined>(undefined);
  
  const handleDelete = (productId: number | undefined) => {
    if (productId !== undefined) {
      dispatch(deleteProduct(productId) as any);
    }
  };
  
  return (
    <div style={{ marginLeft: '18vw', marginRight: '18vw', marginTop: '5vh' }}>
          <form>
            <TextField
              label="id"
              value={id === undefined ? '' : id.toString()}
              onChange={(e) => setId(e.target.value !== '' ? parseInt(e.target.value) : undefined)}
              fullWidth
              margin="normal"
            />
            <Button variant="contained" onClick={() => handleDelete(id)}>
              Delete This Product
            </Button>
          </form>
        </div>
  )
}

export default Delete