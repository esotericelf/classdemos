import React from 'react';
import '../App.css'

const UserInfo = ({ auth }) => {
    return <div className='userContainer'>
        <div className='userInnerContainer'>
            <div>{auth.currentUser.displayName}</div>
            <img src={auth.currentUser.photoURL} />
        </div>
    </div>
}

export default UserInfo;