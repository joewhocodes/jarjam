import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Header from './Header';
import AddInstrument from './AddInstrument';
import EditProfile from './UpdateProfile';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom"
import { deleteInstrument } from './stateSlices/usersSlice';
import { deleteLocalInstrument } from './stateSlices/signinSlice';
import { useParams } from "react-router-dom";

const Profile = () => {
    const { loggedInUser } = useSelector((state) => state.signin);
    const { id } = useParams();
    const { users } = useSelector((state) => state.users);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userInfo = users.find(e => e._id === id);

    useEffect(() => {
        if (!loggedInUser) {
            navigate('/signin');
        }
    }, [dispatch, loggedInUser, navigate]);

    
    const handleDeleteInstrument = (ins) => {
        const filteredInstruments = loggedInUser.instruments.filter(e => e !== ins);
        dispatch(deleteInstrument({instruments: filteredInstruments, id: loggedInUser.id}));
        dispatch(deleteLocalInstrument({instruments: filteredInstruments}));
    };

    return (
        <>
            <Header />
            {id === loggedInUser.id ?
                <>
                    <h1>{loggedInUser.firstName}</h1>
                    <EditProfile/>
                    <h2>Bio</h2>
                    <p>{loggedInUser.bio ? loggedInUser.bio : 'You haven\'t written a bio yet... write a little bit about yourself so others can get to know you!'}</p>
                    <h2>Location</h2>
                    <p>{loggedInUser.location}</p>
                    <h1>Instruments</h1>
                    {loggedInUser.instruments.map((e, i) => (
                        <p key={i}>
                            {Object.keys(e)} - {Object.values(e)} 
                            <Button onClick={() => handleDeleteInstrument(e)}>X</Button>
                        </p>
                    ))}
                    <AddInstrument/>
                </>
            :
                <>
                    <h1>{userInfo.firstName}</h1>
                    <h2>Bio</h2>
                    <p>{userInfo.bio ? userInfo.bio : `${userInfo.firstName} hasn\'t written a bio yet... guess you\'ll just have to ask!`}</p>
                    <h2>Location</h2>
                    <p>{userInfo.location}</p>
                    <h1>Instruments</h1>
                    {userInfo.instruments.map((e, i) => (
                        <p key={i}>
                            {Object.keys(e)} - {Object.values(e)} 
                        </p>
                    ))}
                </>
            }
        </>
    );
};

export default Profile;
