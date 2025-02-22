// src/Loader.js
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

import './Loader.css';

const Loader = ({ isLoading }) => {
    const mountRef = useRef(null);
    const rendererRef = useRef(null); // keep a ref to the renderer

    useEffect(() => {
        // If not loading, remove the Three.js canvas
        if (!isLoading) {
            // Cleanup if a renderer is active
            if (rendererRef.current) {
                rendererRef.current.domElement.remove();
                rendererRef.current.dispose?.();
                rendererRef.current = null;
            }
            return;
        }

        // Otherwise, set up the scene
        let time = 0;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        rendererRef.current = renderer;

        // Append the renderer to the loader overlay
        if (mountRef.current) {
            mountRef.current.appendChild(renderer.domElement);
        }

        // OrbitControls
        const controls = new OrbitControls(camera, renderer.domElement);
        camera.position.set(0, 5, 20);
        controls.update();

        // Torus
        const torusGeometry = new THREE.TorusGeometry(6, 1.5, 32, 100);
        const torusMaterial = new THREE.MeshBasicMaterial({
            color: 0xff00ff,
            wireframe: true,
        });
        const torus = new THREE.Mesh(torusGeometry, torusMaterial);
        scene.add(torus);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xffe6ff, 2.0, 100);
        pointLight.position.set(15, 15, 15);
        scene.add(pointLight);

        // Postprocessing
        const composer = new EffectComposer(renderer);
        const renderPass = new RenderPass(scene, camera);
        composer.addPass(renderPass);

        const bloomPass = new UnrealBloomPass(
            new THREE.Vector2(window.innerWidth, window.innerHeight),
            1.4,
            0.6,
            0.85
        );
        composer.addPass(bloomPass);

        // Animation loop
        function animate() {
            if (!isLoading) return; // stop animating if loading is false

            requestAnimationFrame(animate);
            time += 0.01;
            torus.rotation.y += 0.05;
            torus.rotation.z += 0.03;
            composer.render();
        }
        animate();

        // Cleanup on unmount or when isLoading changes to false
        return () => {
            if (renderer.domElement && renderer.domElement.parentNode) {
                renderer.domElement.remove();
            }
            renderer.dispose();
        };
    }, [isLoading]);

    return (
        <div className={`loader-overlay ${isLoading ? 'show' : 'hide'}`}>
            {/* This div is where the Three.js canvas gets appended */}
            <div ref={mountRef}></div>
        </div>
    );
};

export default Loader;

