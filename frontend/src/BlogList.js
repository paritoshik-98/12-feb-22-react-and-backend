import React, { useEffect, useState } from 'react'
import axios from 'axios'

import './Axios'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import ReactPaginate from'react-paginate'

export default function BlogList() {

  const navigate = useNavigate()

    const LoginStatus = useSelector(state=>state.userLogin)

    useEffect(()=>{
        if(!LoginStatus.user){
            navigate('/')
        }
    },[LoginStatus.user])

    const [currentPage, setCurrentPage] = useState(0);
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('/api/blog/all').then(res=>setData(res.data))
    })

    const PER_PAGE = 1;
    
    const offset = currentPage * PER_PAGE;
    
    const currentPageData = data.slice(offset, offset + PER_PAGE).map(({ title }) => <h1>{title}</h1>);
    
    const pageCount = Math.ceil(data.length / PER_PAGE);
    
    function handlePageClick({ selected: selectedPage }) {
      setCurrentPage(selectedPage);
  }

  return (
    <>
    <h1>React Paginate Example</h1>
      <ReactPaginate
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
      />
      {currentPageData}
      </>
  )
}
