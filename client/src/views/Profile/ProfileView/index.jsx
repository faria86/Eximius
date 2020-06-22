import React from "react";
import { Link } from "react-router-dom";

import NavBar from "./../../../components/NavBar";
import LogoBar from "./../../../components/LogoBar";

import "./index.scss";

const ProfileView = (props) => {
  const user = props.user;
  return (
    <>
      <LogoBar updateUser={props.updateUser} />
      <div className='profileCard'>
        {user && (
          <>
            <h1>Your Profile</h1>
            <div className='profile-pic'>
              <img src='/userIcon/maleUser1.png' alt='profile pic' />
            </div>
            {/* <img src={user.photo} alt={user.username} /> */}
            <h4>{user.username}</h4>
            <h4>{user.email}</h4>
            <Link to='/profile/edit' className="edit">Edit Profile</Link>
            {(user.invitationToken.length && (
              <div className='invites'>
                <h6>Invites Left:</h6>
                <Link to='/profile/invite'>
                  <p>{user.invitationToken.length}</p>
                  <img src='/icon/mail.png' alt='letter logo' />
                  {/* ADD LETTER IMAGE */}
                </Link>
              </div>
            )) || (
              <>
                <p>You have no invitations.</p>
                <img src='/icon/mail.png' alt='letter logo' />
                {/* ADD LETTER IMAGE */}
              </>
            )}
            <NavBar props={props} />
          </>
        )}
      </div>
    </>
  );
};

export default ProfileView;
