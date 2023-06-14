import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Slider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  OutlinedInput,
  Collapse,
} from '@mui/material';
// import { fetchProductsByPrice, fetchProductsByJoin,  sortByPriceLowest, sortByPriceHighest, sortByName } from '../store/actions/productActions';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { ChangeEvent } from 'react';
import { SelectChangeEvent } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { sortProductsByName, sortProductsByPriceLowest, sortProductsByPriceHighest } from '../store/productSlice';



interface SidebarProps {
  searchProps: string;
  setSearchProps: Dispatch<SetStateAction<string>>;
  minPrice: number;
  maxPrice: number;
  setMinPrice: Dispatch<SetStateAction<number>>;
  setMaxPrice: Dispatch<SetStateAction<number>>;
  sortingOption: string;
  setSortingOption: Dispatch<SetStateAction<string>>;
}

const Filterbar: React.FC<SidebarProps> = ({
  searchProps,
  setSearchProps,
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
  sortingOption,
  setSortingOption
}) => {
  const [isPriceFilterOpen, setIsPriceFilterOpen] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const [isSearchTextEmpty, setIsSearchTextEmpty] = useState(true);
  const [clearSort, setClearSort] = useState('-')
  
  const handleMinInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setMinPrice(Math.min(999, value));
  };

  const handleMaxInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setMaxPrice(Math.min(999, value));
  };

  const handleSearchPropsChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchInput(value);
    setIsSearchTextEmpty(value === '');
  };

  const handleSearchPropsClick = () =>
  {
    setSearchProps(searchInput);
  }

  const handleSortByChange = (event: SelectChangeEvent<string>) => {
    const option = event.target.value as string;
    setSortingOption(option)
  }


  //clean up button function
  const handleClearClick = () => {
      setSearchInput('');
      setIsSearchTextEmpty(true);
      setSearchProps('');
      setClearSort('')
  };

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" p={2} mb={2} flexDirection={{ xs: 'column', sm: 'row' }} >
      <Box display="flex" alignItems="center" gap={2} sx={{ width: '600px' }} mb={{ xs: 2, sm: 0 }}>
        <Button variant="outlined" color="primary" onClick={()=>setIsPriceFilterOpen(prev => !prev)} sx={{ width: 200}}>
          Price Range
        </Button>
        <Collapse in={isPriceFilterOpen}>
          <Box display="flex" alignItems="center" gap={2}>
            <FormControl variant="outlined" size="small" >
              <InputLabel htmlFor="min-input">Min</InputLabel>
              <OutlinedInput
                id="min-input"
                value={minPrice === 0 ? '' : minPrice}
                onChange={handleMinInputChange}
                label="Min"
                type="number"
              />
            </FormControl>
            <Slider
              value={[minPrice, maxPrice]}
              onChange={(_, newValue) => {
                if (Array.isArray(newValue)) {
                  setMinPrice(newValue[0]);
                  setMaxPrice(newValue[1]);
                }
              }}
              min={0}
              max={999}
              step={10}
              valueLabelDisplay="auto"
            />
            <FormControl variant="outlined" size="small">
              <InputLabel htmlFor="max-input">Max</InputLabel>
              <OutlinedInput
                id="max-input"
                value={maxPrice === 999 ? '' : maxPrice}
                onChange={handleMaxInputChange}
                label="Max"
                type="number"
              />
            </FormControl>
          </Box>
        </Collapse>
      </Box>
      <Box display="flex" alignItems="center" gap={2}>
        <FormControl variant="outlined" size="small" sx={{ width: '100px' }}>
          <InputLabel id="sort-by-label">Sort By</InputLabel>
          <Select
            labelId="sort-by-label"
            id="sort-by"
            onChange={handleSortByChange}
            value={clearSort}
            label="Sort By"
          >
            <MenuItem value="">-</MenuItem>
            <MenuItem value="price-lowest">Price (Lowest First)</MenuItem>
            <MenuItem value="price-highest">Price (Highest First)</MenuItem>
            <MenuItem value="name">Name</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchInput}
          onChange={handleSearchPropsChange}
        />
        <Button variant="contained" color="primary" onClick={() => handleSearchPropsClick()}>
          Search
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleClearClick}
          // disabled={isSearchTextEmpty}
          size="small"
          sx={{ minWidth: 42, minHeight: 32, p: 0 }}
        >
          clear
        </Button>
      </Box>
    </Box>
  )
}

export default Filterbar