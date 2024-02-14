import {useState, useEffect} from 'react';
import {NavLink} from 'react-router-dom';

export function HomePageGuest(){
    const [szallasData, setSzallasData] = useState([]);
    const [isFetchPending, setFetchPending] = useState(false);

    useEffect (()=>{
        setFetchPending(true);
        fetch("https://nodejs.sulla.hu/data")
            .then(response => response.json())
            .then(szallas => setSzallasData(szallas))
            .catch(error => console.log(error))
            .finally(()=>{
                setFetchPending(false);
            })
    }, []);

    return(
        <div className="p-5 m-auto text-center content bg-ivory">
        {isFetchPending ? (<div className="spinner-border"></div>) : (<div>
                {szallasData.map((szallas) => (
                    <div key = {szallas.id} className="card col-sm-3 d-inline-block m-1 p-2">
                            <NavLink key={szallas.id} to={`/guestview/${szallas.id}`} className="nav-no-color">
                            <div className="card-body">
                                <h2 style={{ textAlign: 'center' }}>{szallas.name}</h2>
                                <p style={{ textAlign: 'center' }}>Weboldal: {szallas.hostname}</p>
                                <p>Helyszín: {szallas.location}</p>
                                <p>Ár: {szallas.price} €/fő/éj</p>
                                <p>Minimum éjszaka: {szallas.minimum_nights}</p>
                            </div>
                            </NavLink>
                            <NavLink to={`${szallas.hostname}`}>
                                <button className='btn btn-success'><i class="bi bi-link-45deg"></i> Weboldal megnyitása</button>
                            </NavLink>
                    </div>
                    
                    
                ))}
                </div>)}
        </div>    
    );
}