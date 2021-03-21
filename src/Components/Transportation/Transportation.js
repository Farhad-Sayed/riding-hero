import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Transport.css';

const Transportation = (props) => {
    const {vehicle_name, image, id} = props.vehicle;
    const history = useHistory();
    const handleRide = (id)=>{
        history.push(`/destination/${id}`);
    }
    return (
            <div onClick={() =>handleRide(id)} className="transport">
                <Link>
                    <img src={image} alt=""/> <br/>
                </Link>
                <h4>{vehicle_name}</h4>
            </div>
        
    );
};

export default Transportation;