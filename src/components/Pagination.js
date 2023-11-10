import React from 'react';
import {useState, useEffect, useContext} from "react";


const Pagination  =({
    totalPosts, 
    postPerPages,
    setCurrentPage,
    currentPage
    }) => {
    let pages = []    ;
    
    for (let i =1; i<= Math.ceil(totalPosts/postPerPages); i++ ) {
        pages.push(i);
    }

    return (
        <div>
            {pages.map((page,index)=>  {
                return <button 
                            key ={index}
                            onClick={()=>setCurrentPage(page)}
                            className={page == currentPage ? "active" :""}>
                            {page}
                        </button>;
            })}
        </div>
    );
     
}

export default Pagination