import React, { createContext, useState, useEffect } from 'react';
import * as BookAPI from '../BooksAPI';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';


export const BookContext = createContext();

const BookProvider = (props) => {
    const [books, setBooks] = useState([]);

    //load books from the API
    useEffect(() => {
     BookAPI.getAll().then(books => setBooks(books))
    }, [])
    //change the shelf of a book
    const updateBook = (book, shelf) => {
        BookAPI.update(book, shelf).then(() => {
            book.shelf = shelf
            setBooks(books.filter(b => b.id !== book.id).concat(book))
        })
    }
    //map the books to the shelf they are on
    const mappedBooks = books.map(book => {
        return {
            ...book,
            shelf: book.shelf ? book.shelf : 'none'
        }
    }
    )
    //search a book 
    const searchBooks = async (query) => {
       await BookAPI.search(query).then(books => {
                return books.map(book => {
                    const bookOnShelf = mappedBooks.find(b => b.id === book.id)
                    return bookOnShelf ? bookOnShelf : book
                })
            })
    }

    //render the books
    const renderBook = (book) => {
        return (
            <Card key={book.id}
                sx={{ display: 'flex', width: 350, height: 250, margin: 3, padding: 4 }}>
                <CardMedia
                    component='img'
                    image={book.imageLinks.thumbnail}
                    title={book.title}
                />
                <CardContent>
                    <h3>{book.title}</h3>
                    <p>{book.authors ? book.authors.join(', ') : ''}</p>
                    <p>{book.shelf}</p>
                    <div className="book-shelf-changer">
                        <select value={book.shelf} onChange={(e) => updateBook(book, e.target.value)}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </CardContent>

            </Card>
        )
    }
    return (
        <BookContext.Provider value={{ books, setBooks, updateBook, mappedBooks, renderBook, searchBooks }}>
            {props.children}
        </BookContext.Provider>
    )

}

export default BookProvider