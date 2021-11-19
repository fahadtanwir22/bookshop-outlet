import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useLocation } from "react-router-dom";
import { MdFavorite } from "react-icons/md";
import './style.css';

const DetailPage = () => {

    const { state } = useLocation();
    const [fav, setFav] = useState(false);

    useEffect(() => {
        (async () => {
            let isFav = await axios.get(`http://localhost:4000/checkFavourite/${state?.item?.id}`);
            setFav(isFav?.data?.favorite)
        })();
    }, [state?.item?.id])

    const selectFav = async () => {
        setFav(!fav)
        await axios.post(`http://localhost:4000/markFavourite/${state?.item?.id}`, { favorite: !fav });
    }

    return (
        <div className="detail-page">
            <h1>Detail</h1>
            <div className="detail-main">
                <div>
                    <img alt={state?.title} src={state?.item?.formats['image/jpeg']} />
                </div>
                <div className="favourite-item">
                    <h2 id="transition-modal-title">{state?.item?.title && state.item.title}</h2>
                    {

                        Array.isArray(state?.item?.authors) && state?.item?.authors?.length > 0 && state?.item?.authors.map((author, i) =>
                            <p key={i}><span>Author : </span> {author.name}</p>
                        )
                    }
                    <div className="fav-icon">
                        <MdFavorite className={fav ? "red" : ""} onClick={selectFav} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailPage;