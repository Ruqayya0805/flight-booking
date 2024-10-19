"use client";

import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import { FiMapPin, FiDollarSign, FiClock } from "react-icons/fi";
import { FaPlaneDeparture } from "react-icons/fa";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-polylinedecorator";

const customIcon = new L.Icon({
  iconUrl: "assets/pin.png", // Update this to your pin image path
  iconSize: [30, 30], // Size of the icon
  iconAnchor: [15, 30], // Anchor point for the icon
  popupAnchor: [0, -30], // Popup anchor point
});

const initialGraph = {
  Delhi: [
    { cost: 5000, layoverTime: 30, destinationCity: "Mumbai" },
    { cost: 8000, layoverTime: 60, destinationCity: "Kolkata" },
    { cost: 7000, layoverTime: 45, destinationCity: "Bangalore" },
    { cost: 6000, layoverTime: 50, destinationCity: "Hyderabad" },
    { cost: 4000, layoverTime: 25, destinationCity: "Jaipur" },
    { cost: 5500, layoverTime: 35, destinationCity: "Ahmedabad" },
    { cost: 6500, layoverTime: 40, destinationCity: "Chennai" },
    { cost: 3000, layoverTime: 15, destinationCity: "Pune" },
    { cost: 5000, layoverTime: 20, destinationCity: "Lucknow" },
    { cost: 7000, layoverTime: 30, destinationCity: "Nagpur" },
    { cost: 6000, layoverTime: 30, destinationCity: "Vadodara" },
    { cost: 8000, layoverTime: 60, destinationCity: "Visakhapatnam" },
    { cost: 7000, layoverTime: 40, destinationCity: "Mysuru" },
    { cost: 8000, layoverTime: 45, destinationCity: "Guwahati" },
    { cost: 5000, layoverTime: 20, destinationCity: "Bhubaneswar" },
  ],
  Mumbai: [
    { cost: 6000, layoverTime: 30, destinationCity: "Delhi" },
    { cost: 4000, layoverTime: 20, destinationCity: "Chennai" },
    { cost: 5000, layoverTime: 50, destinationCity: "Bangalore" },
    { cost: 2000, layoverTime: 10, destinationCity: "Pune" },
    { cost: 3000, layoverTime: 15, destinationCity: "Ahmedabad" },
    { cost: 4500, layoverTime: 25, destinationCity: "Hyderabad" },
    { cost: 3500, layoverTime: 20, destinationCity: "Surat" },
  ],
  Bangalore: [
    { cost: 9000, layoverTime: 40, destinationCity: "Chennai" },
    { cost: 3000, layoverTime: 30, destinationCity: "Delhi" },
    { cost: 2000, layoverTime: 20, destinationCity: "Mumbai" },
    { cost: 6000, layoverTime: 35, destinationCity: "Hyderabad" },
    { cost: 7000, layoverTime: 25, destinationCity: "Pune" },
  ],
  Kolkata: [
    { cost: 7000, layoverTime: 35, destinationCity: "Chennai" },
    { cost: 8000, layoverTime: 25, destinationCity: "Delhi" },
    { cost: 6000, layoverTime: 30, destinationCity: "Lucknow" },
    { cost: 4000, layoverTime: 20, destinationCity: "Patna" },
  ],
  Chennai: [
    { cost: 8000, layoverTime: 30, destinationCity: "Mumbai" },
    { cost: 6000, layoverTime: 40, destinationCity: "Bangalore" },
    { cost: 5000, layoverTime: 20, destinationCity: "Pune" },
    { cost: 7000, layoverTime: 25, destinationCity: "Hyderabad" },
    { cost: 4000, layoverTime: 20, destinationCity: "Coimbatore" },
  ],
  Hyderabad: [
    { cost: 7500, layoverTime: 20, destinationCity: "Chennai" },
    { cost: 5000, layoverTime: 25, destinationCity: "Delhi" },
    { cost: 4000, layoverTime: 15, destinationCity: "Bangalore" },
    { cost: 6000, layoverTime: 30, destinationCity: "Nagpur" },
  ],
  Pune: [
    { cost: 3000, layoverTime: 15, destinationCity: "Mumbai" },
    { cost: 2000, layoverTime: 10, destinationCity: "Bangalore" },
    { cost: 4000, layoverTime: 20, destinationCity: "Delhi" },
    { cost: 3500, layoverTime: 15, destinationCity: "Nagpur" },
  ],
  Jaipur: [
    { cost: 4000, layoverTime: 25, destinationCity: "Delhi" },
    { cost: 3500, layoverTime: 20, destinationCity: "Mumbai" },
    { cost: 4500, layoverTime: 15, destinationCity: "Lucknow" },
  ],
  Ahmedabad: [
    { cost: 5500, layoverTime: 30, destinationCity: "Mumbai" },
    { cost: 6000, layoverTime: 35, destinationCity: "Delhi" },
    { cost: 5000, layoverTime: 20, destinationCity: "Surat" },
  ],
  Lucknow: [
    { cost: 4500, layoverTime: 15, destinationCity: "Delhi" },
    { cost: 3500, layoverTime: 20, destinationCity: "Jaipur" },
    { cost: 5000, layoverTime: 30, destinationCity: "Kolkata" },
  ],
  Nagpur: [
    { cost: 5000, layoverTime: 20, destinationCity: "Delhi" },
    { cost: 6000, layoverTime: 30, destinationCity: "Mumbai" },
    { cost: 4500, layoverTime: 25, destinationCity: "Hyderabad" },
  ],
  Surat: [
    { cost: 3500, layoverTime: 20, destinationCity: "Mumbai" },
    { cost: 3000, layoverTime: 15, destinationCity: "Ahmedabad" },
  ],
  Coimbatore: [
    { cost: 6000, layoverTime: 30, destinationCity: "Chennai" },
    { cost: 5000, layoverTime: 25, destinationCity: "Bangalore" },
  ],
  Patna: [
    { cost: 4000, layoverTime: 20, destinationCity: "Kolkata" },
    { cost: 5000, layoverTime: 25, destinationCity: "Lucknow" },
  ],
};


const findAnyFlight = (graph, src, dest) => {
  const minCost = {};
  const minLayover = {};
  const previous = {};
  const visited = new Set(); // To track visited cities

  // Initialize minCost and minLayover for all cities
  for (const city in graph) {
    minCost[city] = Infinity;
    minLayover[city] = Infinity;
  }
  minCost[src] = 0;
  minLayover[src] = 0;

  const cities = [src]; // Array of cities to visit

  while (cities.length > 0) {
    // Find the city with the minimum cost from the cities array
    let minIndex = 0;
    for (let i = 1; i < cities.length; i++) {
      if (minCost[cities[i]] < minCost[cities[minIndex]]) {
        minIndex = i;
      }
    }

    const currentCity = cities[minIndex];
    const currentCost = minCost[currentCity];

    // Remove the current city from the cities array (mark it as visited)
    cities.splice(minIndex, 1);
    visited.add(currentCity); // Mark the city as visited

    const currentFlights = graph[currentCity];

    currentFlights.forEach((flight) => {
      if (!visited.has(flight.destinationCity)) { // Only consider unvisited cities
        const newCost = currentCost + flight.cost;
        const newLayover = minLayover[currentCity] + flight.layoverTime;

        if (
          newCost < minCost[flight.destinationCity] ||
          (newCost === minCost[flight.destinationCity] &&
            newLayover < minLayover[flight.destinationCity])
        ) {
          minCost[flight.destinationCity] = newCost;
          minLayover[flight.destinationCity] = newLayover;
          previous[flight.destinationCity] = currentCity;

          // Check if the destination city is already in cities
          if (!cities.includes(flight.destinationCity)) {
            cities.push(flight.destinationCity); // Add city to visit next
          }
        }
      }
    });
  }

  // Check if a path was found
  if (minCost[dest] === Infinity) {
    return null;
  }

  // Backtrack to find the path
  const path = [];
  let city = dest;
  while (city) {
    path.unshift(city);
    city = previous[city];
  }

  return {
    path,
    cost: minCost[dest],
    layover: minLayover[dest],
  };
};

export default function FlightSearch() {
  const [sourceCity, setSourceCity] = useState("");
  const [destCity, setDestCity] = useState("");
  const [shortestFlight, setShortestFlight] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [allFlights, setAllFlights] = useState([]);

  const cityCoordinates = {
    Delhi: [28.6139, 77.209],
    Mumbai: [19.076, 72.8777],
    Bangalore: [12.9716, 77.5946],
    Kolkata: [22.5726, 88.3639],
    Chennai: [13.0827, 80.2707],
    Hyderabad: [17.385, 78.4867],
    Pune: [18.5204, 73.8567],
    Jaipur: [26.9124, 75.7873],
    Ahmedabad: [23.0225, 72.5714],
    Lucknow: [26.8467, 80.9462],
    Nagpur: [21.1458, 79.0882],
    Surat: [21.1702, 72.8311],
    Coimbatore: [11.0168, 76.9558],
    Patna: [25.5941, 85.1376],
  };
  

  useEffect(() => {
    setAllFlights(generateAllFlights(initialGraph));
  }, []);

  const generateAllFlights = (graph) => {
    let flights = [];
    for (const src in graph) {
      graph[src].forEach((flight) => {
        flights.push({
          from: src,
          to: flight.destinationCity,
          cost: flight.cost,
          layover: flight.layoverTime,
        });
      });
    }
    return flights;
  };

  const searchFlight = () => {
    const result = findAnyFlight(initialGraph, sourceCity, destCity);

    if (result) {
      setShortestFlight(result);
      setErrorMessage(null);
    } else {
      setShortestFlight(null);
      setErrorMessage("No available flights between selected cities.");
    }
  };

  const getCoordinates = (city) => cityCoordinates[city];

  const flightPath = shortestFlight
    ? shortestFlight.path.map((city) => getCoordinates(city))
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold text-blue-600 mb-8">Flight Finder</h1>

      {/* Search Section */}
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl mb-10">
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Source City:
            </label>
            <select
              value={sourceCity}
              onChange={(e) => setSourceCity(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select City</option>
              {Object.keys(initialGraph).map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Destination City:
            </label>
            <select
              value={destCity}
              onChange={(e) => setDestCity(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select City</option>
              {Object.keys(initialGraph).map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={searchFlight}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold flex items-center justify-center"
        >
          <FaPlaneDeparture className="mr-2" /> Search Flight
        </button>

        {errorMessage && (
          <p className="text-red-600 mt-4 text-center">{errorMessage}</p>
        )}

        {shortestFlight && (
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-blue-600">
              Shortest Path
            </h2>
            <div className="bg-gray-100 p-4 mt-2 rounded-lg shadow">
              <p className="flex items-center mb-2">
                <FiMapPin className="mr-2" />
                <span className="font-semibold">Path: </span>{" "}
                {shortestFlight.path.join(" → ")}
              </p>
              <p className="flex items-center mb-2">
                <FiDollarSign className="mr-2" />
                <span className="font-semibold">Total Cost: </span> ₹
                {shortestFlight.cost}
              </p>
              <p className="flex items-center">
                <FiClock className="mr-2" />
                <span className="font-semibold">Total Layover Time: </span>{" "}
                {shortestFlight.layover} minutes
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Map Section */}
      <div className="w-full max-w-4xl mb-8">
        <MapContainer
          center={[20.5937, 78.9629]} // Center map to India
          zoom={5}
          scrollWheelZoom={false}
          className="h-[750px] w-full rounded-lg"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {/* Adding a marker for the source city with custom icon */}
          {sourceCity && (
            <Marker position={getCoordinates(sourceCity)} icon={customIcon}>
              {" "}
              {/* Use custom icon */}
              <Popup>Source: {sourceCity}</Popup>
            </Marker>
          )}

          {/* Adding a marker for the destination city with custom icon */}
          {destCity && (
            <Marker position={getCoordinates(destCity)} icon={customIcon}>
              {" "}
              {/* Use custom icon */}
              <Popup>Destination: {destCity}</Popup>
            </Marker>
          )}

          {/* Flight Path */}
          {shortestFlight && (
            <Polyline positions={flightPath} color="blue" weight={4} />
          )}
        </MapContainer>
      </div>

      {/* All Flights Section */}
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">
          Available Flights
        </h2>
        <table className="table-auto w-full text-left">
          <thead>
            <tr className="bg-blue-50">
              <th className="px-4 py-2">From</th>
              <th className="px-4 py-2">To</th>
              <th className="px-4 py-2">Cost</th>
              <th className="px-4 py-2">Layover (mins)</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(allFlights) && allFlights.length > 0 ? (
              allFlights.map((flight, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                >
                  <td className="border px-4 py-2">{flight.from}</td>
                  <td className="border px-4 py-2">{flight.to}</td>
                  <td className="border px-4 py-2">₹{flight.cost}</td>
                  <td className="border px-4 py-2">{flight.layover}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-4">
                  No flights available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}