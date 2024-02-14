import {useState, useEffect} from 'react';
import {useNavigate, NavLink} from 'react-router-dom';

export function AddResort(){
    const navigate = useNavigate();

    return(
        <div className="container d-flex justify-content-center p-5 m-auto text-center content bg-ivory">
        <div className="card p-5 content bg-whitesmoke text-center">
            <h2>Új szállás</h2>
            <form onSubmit={
                (event) => {
                    event.persist();
                    event.preventDefault();
                    fetch('https://nodejs.sulla.hu/data', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: event.target.name.value,
                        hostname: event.target.hostname.value,
                        location: event.target.location.value,
                        price: parseInt(event.target.price.value),
                        minimum_nights: event.target.minimum_nights.value,
                })
            })
    .then(response => response.json())
    .then(data => console.log(data))
    .then(navigate('/resorts'))
    .catch(error => console.error('Error:', error));
            }
        }>
            <div className="form-group row pb-1">
                <label className='d-flex justify-content-start p-1'>Szállás neve:</label>
                    <div>
                        <input type="text" name="name" className="form-control"/>
                    </div>
            </div>
            <div className="form-group row pb-1">
                <label className='d-flex justify-content-start p-1'>Hosztnév:</label>
                    <div>
                        <input type="text" name="hostname" className="form-control"/>
                    </div>
            </div>
            <div className="form-group row pb-1">
                <label className='d-flex justify-content-start p-1'>Város:</label>
                    <div>
                        <input type="text" name="location" className="form-control"/>
                    </div>
            </div>
            <div className="form-group row pb-1">
                <label className='d-flex justify-content-start p-1'>Ár:</label>
                <div className="input-group">
                    <input type="number" name="price" className="form-control"/>
                    <span className="input-group-text">€/fő/éj</span>
                </div>
            </div>
            <div className="form-group row pb-1">
                <label className='d-flex justify-content-start p-1'>Minimum éjszakák száma:</label>
                <div className="input-group">
                    <input type="text" name="minimum_nights" className="form-control"/>
                    <span className="input-group-text">éjszaka</span>
                </div>
            </div>
            <div className='p-3'>
                <button type="submit" className="btn btn-primary">Hozzáad</button>
            </div>
        
        </form>
        </div>
        </div>
    );
}