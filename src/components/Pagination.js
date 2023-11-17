import { setSelectionRange } from '@testing-library/user-event/dist/utils';
import React from 'react';
import {useState, useEffect, useContext} from "react";


const Pagination  =({
    totalPost,
    postPerPages, 
    setPostPerPages,
    setCurrentPage,
    currentPage
    }) => {
    // let pages = []    ;
    
    // for (let i =1; i<= Math.ceil(totalPosts/postPerPages); i++ ) {
    //     pages.push(i);
    // }
    const nextPage = () => setCurrentPage(prev => prev +1);
    const prevPage = () => setCurrentPage(prev => prev -1);
    const handlePostPerPage = (event) => {
        setPostPerPages(event.target.value);
    };

    return (
        // <div>
        //     {pages.map((page,index)=>  {
        //         return <button 
        //                     key ={index}
        //                     onClick={()=>setCurrentPage(page)}
        //                     className={page == currentPage ? "active" :""}>
        //                     {page}
        //                 </button>;
        //     })}
        // </div>
        <>
            <button onClick={prevPage} disabled={currentPage === 1}>Prev Page</button>
            <button>{currentPage}</button>
            <button onClick={nextPage} disabled= {!totalPost}> Next Page</button>
            <select value={postPerPages} onChange={handlePostPerPage}>
            <option value="">Select Post Per Page</option>
            <option value="10">10</option>
            <option value="30">30</option>
            <option value="50">50</option>
            </select>
        </>
    );
     
}

export default Pagination