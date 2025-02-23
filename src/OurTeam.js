// src/OurTeam.js
import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import './OurTeam.css';

// Import team member images from assets folder
import JoshithProfile from './assets/linkedin profile prof-1.png';
import ManideepProfile from './assets/manideep_prof.png';
import MathangProfile from './assets/mathang.jpg';
import CharanProfile from './assets/charan_prof.png';

function OurTeam() {
    const [hoveredTeam, setHoveredTeam] = useState(null);

    const teamMembers = [
        {
            id: 1,
            name: "Joshith Reddy Aleti",
            title: "React Developer & Data Engineer",
            bio: "Passionate about crafting innovative digital solutions.",
            image: JoshithProfile,
            link: "https://www.linkedin.com/in/joshith-reddy-aleti/",
        },
        {
            id: 2,
            name: "Manideep Kalyanam",
            title: "AI Engineer",
            bio: "Developing robust applications with efficiency and passion.",
            image: ManideepProfile,
            link: "https://www.linkedin.com/in/manideep-kalyanam/",
        },
        {
            id: 3,
            name: "Mathang Peddi",
            title: "ML Engineer",
            bio: "Designing user-centric experiences with aesthetic finesse.",
            image: MathangProfile,
            link: "https://www.linkedin.com/in/mathangpeddi/",
        },
        {
            id: 4,
            name: "Charan",
            title: "Backend Developer",
            bio: "Ensuring projects are delivered on time with quality.",
            image: CharanProfile,
            link: "https://www.linkedin.com/in/kasanagottu-kumar/",
        },
    ];

    return (
        <>
            <Header />
            <section className="section">
                <div className="section-wrapper">
                    <header className="header">
                        <hgroup className="hgroup">
                            <h2 className="headline">Meet Our Team!</h2>
                            <p className="tagline">Creative minds shaping the future</p>
                        </hgroup>
                        <a href="#" className="section-link">
                            View All
                        </a>
                    </header>
                    <ul className="cards" style={{ '--nth-siblings': 4 }}>
                        {teamMembers.map((member) => (
                            <li
                                key={member.id}
                                className="card"
                                style={{ '--nth-child': member.id }}
                                onMouseEnter={() => setHoveredTeam(member)}
                                onMouseLeave={() => setHoveredTeam(null)}
                            >
                                <a
                                    href={member.link}
                                    className="avatar-link-wrapper"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <div className="visual circle-container">
                                        <img
                                            className="avatar-img centered"
                                            src={member.image}
                                            width="144"
                                            height="144"
                                            alt={member.name}
                                        />
                                    </div>
                                </a>
                            </li>
                        ))}
                    </ul>
                    {/* Display hovered team info below the cards */}
                    {hoveredTeam && (
                        <div className="hover-info">
                            <h3 className="team-name">{hoveredTeam.name}</h3>
                            <p className="team-title">{hoveredTeam.title}</p>
                            <p className="team-bio">{hoveredTeam.bio}</p>
                        </div>
                    )}
                </div>
            </section>
            <Footer />
        </>
    );
}

export default OurTeam;
