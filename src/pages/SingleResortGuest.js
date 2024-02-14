import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";

export function SingleResortGuest() {
    const param = useParams();
    const id = param.szallasId;
    const [szallas, setSzallas] = useState([]);
    const [isFetchPending, setFetchPending] = useState(false);

    useEffect(() => {
        setFetchPending(true);
        (async() => {
            try{
                const res = await fetch(`https://nodejs.sulla.hu/data/${id}`);
            const szallas2 = await res.json();
            setSzallas(szallas2);
        } 
        catch(error){
            console.log(error);
        }
        finally{
            setFetchPending(false);
        }
        })();
    },[id]);

    return (
        <div className="container d-flex justify-content-center p-5 m-auto text-center content bg-ivory">
            {isFetchPending || !szallas.id ? (<div className="spinner-border"></div>) : (
                    <div className="card p-3 w-50">
                        <div className="card-body">
                            <h5 className="card-title">{szallas.name}</h5>
                            <p>Weboldal: <a href={szallas.hostname}>{szallas.hostname}</a></p>
                            <p>Város: {szallas.location}</p>
                            <p>Ár: {szallas.price} €/fő/éj</p>
                            <p>Minimum éjszakák: {szallas.minimum_nights}</p>
                        </div>
                        <div className="btn-group d-flex justify-content-center" role="group">
                            <NavLink to={`/`} className="p-1">
                                <button className="btn btn-secondary"><i class="bi bi-arrow-return-left"></i> Vissza</button>
                            </NavLink>
                        </div>
                    </div>)}
        </div>
    );
}