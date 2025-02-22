// src/OurTeam.js
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import './OurTeam.css';

function OurTeam() {
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
                    <ul className="cards" style={{ '--nth-siblings': 5 }}>
                        <li className="card" style={{ '--nth-child': 1 }}>
                            <a href="#" className="avatar-link-wrapper">
                                <div className="visual">
                                    <img
                                        className="avatar-img"
                                        src="https://raw.githubusercontent.com/mobalti/modern-web-ui/refs/heads/main/css-trig-functions/images/img-1.avif"
                                        width="144"
                                        height="144"
                                        alt="Ethan B., DevOps Engineer"
                                    />
                                </div>
                                <div className="tooltiptext">
                                    <h3 className="team-name">Ethan B.</h3>
                                    <div className="team-content-wrapper">
                                        <p className="team-title">DevOps Engineer</p>
                                        <p className="team-bio">
                                            Master of servers, pipelines, and keeping things running smoothly.
                                        </p>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li className="card" style={{ '--nth-child': 2 }}>
                            <a href="#" className="avatar-link-wrapper">
                                <div className="visual">
                                    <img
                                        className="avatar-img"
                                        src="https://raw.githubusercontent.com/mobalti/modern-web-ui/refs/heads/main/css-trig-functions/images/img-2.avif"
                                        width="144"
                                        height="144"
                                        alt="Ava L., UI/UX Designer"
                                    />
                                </div>
                                <div className="tooltiptext">
                                    <h3 className="team-name">Ava L.</h3>
                                    <div className="team-content-wrapper">
                                        <p className="team-title">UI/UX Designer</p>
                                        <p className="team-bio">
                                            Turning ideas into stunning designs, one pixel at a time.
                                        </p>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li className="card" style={{ '--nth-child': 3 }}>
                            <a href="#" className="avatar-link-wrapper">
                                <div className="visual">
                                    <img
                                        className="avatar-img"
                                        src="https://raw.githubusercontent.com/mobalti/modern-web-ui/refs/heads/main/css-trig-functions/images/img-3.avif"
                                        width="144"
                                        height="144"
                                        alt="Liam J., Mobile Developer"
                                    />
                                </div>
                                <div className="tooltiptext">
                                    <h3 className="team-name">Liam J.</h3>
                                    <div className="team-content-wrapper">
                                        <p className="team-title">Mobile Developer</p>
                                        <p className="team-bio">
                                            Crafting sleek, intuitive apps for users on the go.
                                        </p>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li className="card" style={{ '--nth-child': 4 }}>
                            <a href="#" className="avatar-link-wrapper">
                                <div className="visual">
                                    <img
                                        className="avatar-img"
                                        src="https://raw.githubusercontent.com/mobalti/modern-web-ui/refs/heads/main/css-trig-functions/images/img-4.avif"
                                        width="144"
                                        height="144"
                                        alt="Sophia K., Data Scientist"
                                    />
                                </div>
                                <div className="tooltiptext">
                                    <h3 className="team-name">Sophia K.</h3>
                                    <div className="team-content-wrapper">
                                        <p className="team-title">Data Scientist</p>
                                        <p className="team-bio">
                                            Decoding patterns and finding insights in the chaos.
                                        </p>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li className="card" style={{ '--nth-child': 5 }}>
                            <a href="#" className="avatar-link-wrapper">
                                <div className="visual">
                                    <img
                                        className="avatar-img"
                                        src="https://raw.githubusercontent.com/mobalti/modern-web-ui/refs/heads/main/css-trig-functions/images/img-5.avif"
                                        width="144"
                                        height="144"
                                        alt="Codey X, AI Code Assistant"
                                    />
                                </div>
                                <div className="tooltiptext">
                                    <h3 className="team-name">Codey X</h3>
                                    <div className="team-content-wrapper">
                                        <p className="team-title">AI Code Assistant</p>
                                        <p className="team-bio">
                                            Powered by algorithms, driven by collaboration.
                                        </p>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li className="card" style={{ '--nth-child': 6 }}>
                            <a href="#" className="avatar-link-wrapper">
                                <div className="visual">
                                    <img
                                        className="avatar-img"
                                        src="https://raw.githubusercontent.com/mobalti/modern-web-ui/refs/heads/main/css-trig-functions/images/img-6.avif"
                                        width="144"
                                        height="144"
                                        alt="Maya R., Project Manager"
                                    />
                                </div>
                                <div className="tooltiptext">
                                    <h3 className="team-name">Maya R.</h3>
                                    <div className="team-content-wrapper">
                                        <p className="team-title">Project Manager</p>
                                        <p className="team-bio">
                                            Keeping the team in sync and deadlines on track.
                                        </p>
                                    </div>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default OurTeam;
