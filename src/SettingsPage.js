// src/SettingsPage.js
import React from 'react';
import Header from './Header';
import Footer from './Footer';

function SettingsPage() {
    return (
        <>
            <Header />
            <div style={{ padding: '40px', textAlign: 'center' }}>
                <h2>Settings</h2>
                <p>
                    Here you can view and update your contact info, income, UserID, password, etc.
                </p>
                {/* Replace with real data from backend */}
            </div>
            <Footer />
        </>
    );
}

export default SettingsPage;
