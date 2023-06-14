import React, {useEffect} from 'react'
import { Box, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../store/productSlice';
import { lookup } from 'dns/promises';

interface SidebarProps {
  categoryId: string[];
  setCategoryId: React.Dispatch<React.SetStateAction<string[]>>;
}

const Sidebar: React.FC<SidebarProps> = ({ categoryId, setCategoryId }) =>
{    
    const dispatch = useDispatch();
    const categories = useSelector((state: any) => state.products.categories);

    useEffect(() => {
        dispatch(fetchCategories() as any);
    }, [dispatch]);

    const handleCategoryClick = (e: any) =>
    {
        setCategoryId(e)
        console.log(e);
    }        

  return (
    <div>
        <Box
            sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '120px',
            marginTop: '20px',
            marginLeft: '20px',
            transition: 'width 0.3s ease',
            }}
        >
            <Button
                sx={{ mb: 1, fontWeight: categoryId.length === 0 ? 'bold' : 'normal' }}
                onClick={() => handleCategoryClick('')}
            >
                All
            </Button>
            {categories.map((category: any) => (
            <Button
                key={category.id}
                sx={{
                    mb: 1,
                    fontWeight: categoryId === category.id ? 'bold' : 'normal',
                }}
                onClick={() => handleCategoryClick(category.id)}
            >
                {category.name}
            </Button>
            ))}
        </Box>
    </div>
  )
}

export default Sidebar