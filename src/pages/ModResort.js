import { NavLink, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export function ModResort() {
    const navigate = useNavigate();
    const param = useParams();
    const id = param.szallasId;
    const [szallasData, setSzallasData] = useState([]);
    const [isFetchPending, setFetchPending] = useState(false);

    useEffect(() => {
        setFetchPending(true);
        (async() => {
            try{
                const res = await fetch(`https://nodejs.sulla.hu/data/${id}`);
            const szallas = await res.json();
            setSzallasData(szallas);
        } 
        catch(error){
            console.log(error);
        }
        finally{
            setFetchPending(false);
        }
        })();
    },[id]);

    return(
        <div className="container d-flex justify-content-center p-5 m-auto text-center content bg-ivory">
        <div className="card p-5 content bg-whitesmoke text-center">
            <h2>Szállás módosítása</h2>
            <form onSubmit={
                (event) => {
                    event.persist();
                    event.preventDefault();
                    fetch(`https://nodejs.sulla.hu/data/${id}`, {
                    method: 'PUT',
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
    .then(navigate('/'))
    .catch(error => console.error('Error:', error));
            }
        }>
            
            <div className="form-group row pb-1">
                <label className='d-flex justify-content-start p-1'>Név:</label>
                <div>
                    <input type="text" name="name" className="form-control" placeholder={szallasData.name}/>
                </div>
            </div>
            <div className="form-group row pb-1">
                <label className='d-flex justify-content-start p-1'>Weboldal:</label>
                <div>
                    <input type="text" name="hostname" className="form-control" placeholder={szallasData.hostname}/>
                </div>
            </div>
            <div className="form-group row pb-1">
                <label className='d-flex justify-content-start p-1'>Város:</label>
                <div>
                    <input type="text" name="location" className="form-control" placeholder={szallasData.location}/>
                </div>
            </div>
            <div className="form-group row pb-1">
                <label className='d-flex justify-content-start p-1'>Ár:</label>
                <div className="input-group">
                    <input type="number" name="price" className="form-control" placeholder={szallasData.price}/>
                    <span className="input-group-text">€/fő/éj</span>
                </div>
            </div>
            <div className="form-group row pb-1">
                <label className='d-flex justify-content-start p-1'>Minimum éjszakák:</label>
                <div className="input-group">
                    <input type="text" name="minimum_nights" className="form-control" placeholder={szallasData.minimum_nights}/>
                    <span className="input-group-text">éjszaka</span>
                </div>
            </div>
            <div className="d-flex justify-content-between">
                    <div className="w-50">
                        <button type="submit" className="btn btn-primary"><i class="bi bi-floppy"></i> Mentés</button>
                    </div>
                    <div className="w-50">
                        <NavLink to={`/resort/${szallasData.id}`}>
                                <button className="btn btn-secondary"><i class="bi bi-arrow-return-left"></i> Vissza</button>
                        </NavLink>
                    </div>
                </div>
        </form>
        </div>
        </div>
    )
}