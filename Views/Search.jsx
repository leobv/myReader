import React, {useContext, useState, useEffect} from 'react'
import * as BooksAPI from '../BooksAPI.js'
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { BookContext } from '../context/BookProvider.jsx';

const SearchNav = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));
const Search = () => {
  const {books, setBooks, updateBook, mappedBooks, renderBook, searchBooks} = useContext(BookContext)
  const [search, setSearch] = useState('')
  const searcher = (e) => {
    setSearch(e.target.value)
    console.log(e.target.value)
  }
let results = []
if(!search) {
  results = []
} else {
  results = books.filter(book => book.title.toLowerCase().includes(search.toLocaleLowerCase()))
}

  useEffect(() => {
    searchBooks(search)
  }, [search])
  
  return (
    <div>
      <SearchNav>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
          onChange={searcher}
        />
      </SearchNav>
      <div className="search-books-results">
        <ol className="books-grid">
          {results.map(renderBook)}
        </ol>
      </div>
    </div>
  )
}

export default Search