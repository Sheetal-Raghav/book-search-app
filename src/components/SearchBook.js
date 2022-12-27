import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios'
import './SearchBook.css'
import temp from '../css-bg/bgImage.jpg'

const SearchBook=()=>{
    const [book,setBook] = useState("")
    const [details,setDetails] = useState(null)
    const Search=(e)=>{
        e.preventDefault()
         axios.get(`https://www.googleapis.com/books/v1/volumes?q=${book}`)
        .then(res=>{
            console.log(res.data.items)
            setDetails(res.data.items)
        })
    }
    
    return(
        <BrowserRouter>
        <div>
            <div id="nav">
                <p>BOOK SEARCH</p>
            </div>
            <div id="home">
                <input type="text" value={book} onChange={e=>setBook(e.target.value)}/>
                <button onClick={Search}>Search</button>
                <div id="container">
                {details&&details.map((it)=>{
                    return(
                        <>
                        <a href={it.volumeInfo.infoLink}>
                        <div className="item" key={it}>
                            <div id="overlay"></div>
                            <div id="infos">
                            <p>{it.volumeInfo.title}</p>
                            <p id="author">{it.volumeInfo.authors}</p>
                            <p>{it.volumeInfo.pageCount}</p>
                            <p>{it.volumeInfo.averageRating}</p>
                            </div>
                            
                           <a href={it.volumeInfo.infoLink}>
                            <img src={it.volumeInfo.imageLinks?it.volumeInfo.imageLinks.thumbnail:temp}/>
                            </a> 
                            
                        </div>
                        </a>
                        </>
                    )
                })}
                </div>
            </div>
        </div>
        
        </BrowserRouter>
    )
}
export default SearchBook;