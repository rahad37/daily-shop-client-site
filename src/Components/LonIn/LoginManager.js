import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeLoginFramework =()=>{
    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }
    }

export const createUserWithEmailAndPassword = (name, email, password)=>{
return firebase.auth().createUserWithEmailAndPassword(name, email, password)
    .then(res => {
    const newUserInfo = res.user;
    newUserInfo.error = '';
    newUserInfo.success = true;
    updateUserName(name);
    return newUserInfo;
})
.catch((error) => {
    const newUserInfo = {};
    newUserInfo.error = error.message;
    newUserInfo.success = false;
    return newUserInfo;
});
}

export const signInWithEmailAndPassword = (email, password) =>{
return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res => {
        const newUserInfo = res.user;
        newUserInfo.error = '';
        newUserInfo.success = true;
        return newUserInfo;
    })
    .catch((error) => {
        const newUserInfo = {};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        return newUserInfo;
    });
}


export const handleGoogleSignIn = () =>{
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth()
    .signInWithPopup(provider).then(res => {
        const {displayName, email} = res.user;
        const signedInUser = {name: displayName, email}
        const newUserInfo = res.user;
        newUserInfo.error = '';
        newUserInfo.success = true;
        return signedInUser;

  }).catch((error) => {
    const newUserInfo = {};
    newUserInfo.error = error.message;
    newUserInfo.success = false;
    newUserInfo.signInGoogle = false;
    return newUserInfo;
  });
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