// src/PayTransfer.js
import React from 'react';
import Header from './Header';
import Footer from './Footer';

function Profile() {
    return (
        <>
            <Header />
            <div style={{ padding: '40px', textAlign: 'center' }}>
                <h2>Profile</h2>
                <p>Data from the backend will be loaded here.</p>
            </div>
            <Footer />
        </>
    );
}

export default Profile;
