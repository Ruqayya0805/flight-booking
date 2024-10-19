"use client";

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; 
import Navbar from './components/Navbar';

export default function Home() {
    const [animate, setAnimate] = useState(false);
    const router = useRouter(); 

    const handleGetStarted = () => {
        setAnimate(true);
        setTimeout(() => {
            setAnimate(false); 
            router.push('/FlightBook'); // Redirect after animation
        }, 3000); 
    };

    const handleShortestRoute = () => {
        setAnimate(true);
        setTimeout(() => {
            setAnimate(false); 
            router.push('/Shortest-Route'); // Redirect after animation
        }, 3000); 
    }

    return (
        <div>
            <Navbar /> {/* Include the Navbar here */}
            <div className="bg-gradient-to-br from-white to-white h-lvh flex flex-col items-center justify-center relative overflow-hidden">
                <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-6 pb-4 drop-shadow-lg z-50">
                    BookMyFlight
                </h1>
                <p className="text-black text-xl font-medium mb-8 animate-pulse">
                    Book flights with ease.
                </p>
                <div className="flex space-x-4">
                <button 
                    onClick={handleGetStarted}
                    className="bg-yellow-400 text-purple-900 font-bold px-8 py-4 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
                >
                    Get Started
                </button>
                <button onClick={handleShortestRoute} className="bg-yellow-400 text-purple-900 font-bold px-8 py-4 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
                    Shortest Route Finder
                </button>
                </div>

                {/* Plane Animation */}
                {animate && (
                    <div className="absolute top-1/4 left-0 transition-transform duration-300 ease-in-out animate-fly-plane">
                        <Image 
                            src="/assets/plane.png" 
                            alt="Plane"
                            width={400}
                            height={600}
                        />
                    </div>
                )}
            </div>

            <style jsx>{`
                @keyframes fly-plane {
                    0% {
                        transform: translateX(0);
                        top: 25%;
                    }
                    100% {
                        transform: translateX(100vw);
                        top: 10%; 
                    }
                }

                .animate-fly-plane {
                    animation: fly-plane 3s forwards; 
                }
            `}</style>
        </div>
    );
}
