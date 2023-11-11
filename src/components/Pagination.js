import React from 'react';
import {useState, useEffect, useContext} from "react";


const Pagination  =({
    totalPosts, 
    postPerPages,
    setCurrentPage,
    currentPage
    }) => {
    // let pages = []    ;
    
    // for (let i =1; i<= Math.ceil(totalPosts/postPerPages); i++ ) {
    //     pages.push(i);
    // }
    const nextPage = () => setCurrentPage(prev => prev +1);
    const prevPage = () => setCurrentPage(prev => prev -1);

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
            <button onClick={nextPage} disabled={!totalPosts}>Next Page</button>
        </>
    );
     
}

export default Pagination