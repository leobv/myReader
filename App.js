import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom'
import Search from './Views/Search.jsx'
import BookShelf from './Components/BookShelf'
import Home from './Views/Home.jsx';
import Layout from './Components/Layout'





function App() {

  
  return (
    <div className="App">
            <Routes>
                <Route exact path="/" element={<Layout />}> 
                        <Route index element={<Home />} /> 
                        <Route path="Bookshelf" element={<BookShelf />} />
                        <Route path="Search" element={<Search />} />
                </Route> 
            </Routes>
    </div>
  );
}

export default App;
