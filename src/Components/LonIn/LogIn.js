import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import './LogIn.css';
import { useHistory, useLocation } from 'react-router';
import { UserContext } from '../../App';



if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }else {
    firebase.app();
 }

const LogIn = () => {
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        name: '',
        email: '',
        error: '',
        password: '',
        success: false
    });
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);


    const handleBlur= (event) => {
        let isFromValid = true;
        if(event.target.name === 'email'){
            isFromValid = /\S+@\S+\.\S+/.test(event.target.value);
        }
        if(event.target.name === 'password'){
            isFromValid  = event.target.value.length > 6;
        }
        if(isFromValid){
            const newUserInfo = {...user};
            newUserInfo[event.target.name] = event.target.value;
            setUser(newUserInfo);
        }
    }

    const handleSubmit =(event)=>{
        if(newUser && user.email && user.password){
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then(res => {
            const newUserInfo = {...user};
            newUserInfo.error = '';
            newUserInfo.success = true;
            setUser(newUserInfo);
            updateUserName(user.name);
        })
        .catch((error) => {
            const newUserInfo = {...user};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            setUser(newUserInfo);
        });
        }

        if(!newUser && user.email && user.password){
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
            const newUserInfo = {...user};
            newUserInfo.error = '';
            newUserInfo.success = true;
            setUser(newUserInfo);
            setLoggedInUser(newUserInfo);
            history.replace(from);
            console.log('sign in user info', res.user);
        })
        .catch((error) => {
            const newUserInfo = {...user};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            setUser(newUserInfo);
        });
        }
        
        event.preventDefault();
    }
    
    const updateUserName = name =>{
        var user = firebase.auth().currentUser;

        user.updateProfile({
          displayName: name
        }).then(function() {
            console.log('User name updated successfully')
        }).catch(function(error) {
            console.log(error)
        });
    }
    return (
        <div>
            <form className='modify mb-2' onSubmit={handleSubmit}>
                {newUser && <input type='text' name='name' onBlur={handleBlur} placeholder='Your Full Name' required/>}<br></br><br></br>
                <input type='email' name='email' onBlur={handleBlur} placeholder='Your Email Address' required></input><br></br><br></br>
                <input type='password' name='password' onBlur={handleBlur} placeholder='Password (Minimum 7 Digits)' required></input><br></br><br></br>
                {newUser && <input type='password' name='password' onBlur={handleBlur} placeholder='Confirm Password' required></input>}<br></br><br></br>
                <input type='submit' value={newUser ? 'Sign Up' : 'Log In'}></input>              
            </form>
            <div className='d-flex justify-content-center' style={{fontSize: '20px', fontWeight: '700'}}>
                <p style={{marginRight: '10px'}}>Already have an account? Or</p>
                <div>
                <input style={{marginRight: '5px'}} type='checkbox' onChange={()=>setNewUser(!newUser)}name='newUser' id=''/>
                <label htmlFor='newUser'> Sign Up</label>
                <h4 style={{color: 'red'}}>{user.error}</h4>
                {user.success && <h4 style={{color: 'green'}}>User { newUser ? 'Created' : 'Logged In' } Successfully</h4>}
                </div>
            </div>
        </div>
    );
};

export default LogIn;