import React, { useEffect, useState } from 'react';
import fakeDaata from '../../fakeData/Vehicles.json';
import Transportation from '../Transportation/Transportation';
import './Home.css';

const Home = () => {
    const[vehicles, setVehicles] =useState([]);
    useEffect(() =>setVehicles(fakeDaata), [])
    return (
        <div className="vehicle_container">
            <div className="vehicles">
                {
                    vehicles.map(vehicle => <Transportation vehicle={vehicle} key={vehicle.id}></Transportation>)
                }
            </div>
        </div>
    );
};

export default Home;