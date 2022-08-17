import { Link } from '@mui/material'
import React, {useContext, useState, useEffect} from 'react'
import { BookContext } from '../context/BookProvider'
import Search from '../Views/Search'



const BookShelf = () => {
  const {  mappedBooks, renderBook } = useContext(BookContext)
  // get all books that are reading
  const currentlyReading = mappedBooks.filter(book => book.shelf === 'currentlyReading')
  const wantToRead = mappedBooks.filter(book => book.shelf === 'wantToRead')
  const read = mappedBooks.filter(book => book.shelf === 'read')
  const none = mappedBooks.filter(book => book.shelf === 'none')

return (
  <div className="list-books">
    <div className="bookshelf">
      <div className="bookshelf-books">
        <ol className="books-grid">
          {currentlyReading.map(renderBook)}
        </ol>
      </div>
    </div>
    <div className="bookshelf">
      <div className="bookshelf-books">
        <ol className="books-grid">
          {wantToRead.map(renderBook)}
        </ol>
      </div>
    </div>
    <div className="bookshelf">
      <div className="bookshelf-books">
        <ol className="books-grid">
          {read.map(renderBook)}
        </ol>
      </div>
    </div>
    <div className="bookshelf">
      <div className="bookshelf-books">
        <ol className="books-grid">
          {none.map(renderBook)}
        </ol>
      </div>
    </div>
    </div>

)

}
export default BookShelf 