import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
// import mapImage from '../../Assets/Map.png';
import './Destionation.css';
import fakeDaata from '../../fakeData/Vehicles.json';
import Mapping from '../Mapping/Mapping';


const Destination = () => {
    const {id} = useParams();
    const [vehicles, setVehicles] = useState({ });
    useEffect(() =>setVehicles(fakeDaata), []);  
    const {image, vehicle_name, kilo_charge, capacity, human} = vehicles;
    const handleSearch = () =>{
        const type= fakeDaata.find(vehicle =>vehicle.id===id);
        setVehicles(type);
        // console.log(type);
    }
    
    return (
        <div className="destionation">
            <div className="destination-container">
                <div className="search-area">
                    <h4>Pick From</h4>
                    <input type="text" placeholder="Mirpur" required/><br/>
                    <h4>Pick To</h4>
                    <input type="text" placeholder="Dhanmondi" required/><br/>
                    <button onClick={()=>handleSearch()}>Search</button>

                    <div style={{display:'flex', justifyContent:'space-around', margin:'30px 10px'}}>
                        <img style={{height:'50px'}} src={image} alt=""/>
                        <h4>{vehicle_name}</h4>
                        <img style={{height:'40px'}} src={human} alt=""/>
                        <h4>{capacity}</h4>
                        <h4>{kilo_charge}</h4>
                    </div>
                
                </div>
                <div className="map-area">
                    {/* <img src={mapImage} alt=""/> */}
                    <Mapping></Mapping>
                </div>
            </div>
        </div>
    );
};

export default Destination;