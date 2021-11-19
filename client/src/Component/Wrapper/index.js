import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './style.css'

const Wrapper = () => {

    const navigate = useNavigate();
    const [state, setState] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {

        (async () => {
            let data = await axios.get(`https://gutendex.com/books/?page=${currentPage && currentPage}`);
            setState(state => ([...state, ...data?.data?.results]))
        })();

    }, [currentPage])

    const setCurrentPageNo = () => {
        setCurrentPage(currentPage + 1);
    }

    return (
        <div className="wrapper">
            <ul>{
                Array.isArray(state) && state.length > 0 && state.map((item, i) =>
                    <li onClick={() => navigate('/detail-page', { state: { item } })} key={i}>{item.title}</li>
                )}
            </ul>
            <button className="expandable-btn" onClick={setCurrentPageNo}>Load more books</button>
        </div>
    );
}

export default Wrapper;