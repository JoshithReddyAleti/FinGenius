import React from 'react';
import './LoaderOverlay.css';

function LoaderOverlay({ active }) {
    return active ? (
        <div className="loader-overlay">
            <svg viewBox="0 0 100 100" className="loader-svg">
                {/* Expanding concentric pulse */}
                <circle cx="50" cy="50" r="5" fill="#00e0ff">
                    <animate attributeName="r" values="5;45" dur="2s" repeatCount="indefinite"
                        keySplines="0.42 0 0.58 1" calcMode="spline" />
                    <animate attributeName="opacity" values="1;0" dur="2s" repeatCount="indefinite" />
                </circle>
                {/* Central pulsing circle */}
                <circle cx="50" cy="50" r="5" fill="#00e0ff">
                    <animate attributeName="r" values="5;7;5" dur="1s" repeatCount="indefinite" />
                </circle>
                {/* Rotating arc with pulsing opacity */}
                <path d="M50,50 L95,50 A45,45 0 0,1 81.82,81.82 Z" fill="rgba(0,224,255,0.15)">
                    <animateTransform attributeName="transform" type="rotate"
                        from="0 50 50" to="360 50 50" dur="4s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.15;0.05;0.15" keyTimes="0;0.5;1" dur="2s" repeatCount="indefinite" />
                </path>
            </svg>
        </div>
    ) : null;
}

export default LoaderOverlay;
