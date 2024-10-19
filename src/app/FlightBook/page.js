"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

// Updated cities array with more options
const cities = [
  { code: "DEL", name: "Delhi" },
  { code: "BLR", name: "Bengaluru" },
  { code: "MUM", name: "Mumbai" },
  { code: "CCU", name: "Kolkata" },
  { code: "HYD", name: "Hyderabad" },
  { code: "CHN", name: "Chennai" },
  { code: "PNQ", name: "Pune" },
  { code: "AMD", name: "Ahmedabad" },
  { code: "GOI", name: "Goa" },
  { code: "COK", name: "Kochi" },

  { code: "MAA", name: "Madurai" },
  { code: "VNS", name: "Varanasi" },
  { code: "RPR", name: "Raipur" },
  { code: "JAI", name: "Jaipur" },
  { code: "SUR", name: "Surat" },
  { code: "LKO", name: "Lucknow" },
  { code: "NAG", name: "Nagpur" },
  { code: "SBY", name: "Srinagar" },
  { code: "PAT", name: "Patna" },
  { code: "VAD", name: "Vadodara" },
  { code: "KWI", name: "Kuwait City" },
  { code: "DOH", name: "Doha" },
  { code: "DXB", name: "Dubai" },
  { code: "RUH", name: "Riyadh" },
  { code: "JED", name: "Jeddah" },
  { code: "MCT", name: "Muscat" },
  { code: "BAH", name: "Manama" },
  { code: "ABZ", name: "Abu Dhabi" },
  { code: "SHJ", name: "Sharjah" },
  { code: "AMM", name: "Amman" },
  { code: "BEY", name: "Beirut" },
  { code: "TLV", name: "Tel Aviv" },
  { code: "ANK", name: "Ankara" },
  { code: "IST", name: "Istanbul" },
  { code: "DMM", name: "Dammam" },
  { code: "AJM", name: "Ajman" },
  // Add more cities as needed
];

const FlightBooking = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [fr, setFr] = useState("");
  const [t, setT] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [tripType, setTripType] = useState("one-way");
  const [fareType, setFareType] = useState("regular");
  const [classType, setClassType] = useState("economy");
  const router = useRouter();

  // Save flight booking details and redirect
  const handleSubmit = async () => {
    const bookingDetails = {
      firstName,
      lastName,
      fr,
      t,
      departureDate,
      tripType,
      fareType,
      classType,
    };

    console.log("Booking details:", bookingDetails); // Log booking details before sending

    try {
      const response = await fetch('/api/book-flight', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingDetails),
      });

      console.log("Response status:", response.status); // Log the response status

      if (!response.ok) {
        const errorText = await response.text(); // Get the error text
        console.error("Error response:", errorText); // Log the error response
        throw new Error('Failed to create booking');
      }

      const data = await response.json();
      console.log("Response data:", data); // Log the response data

      // Store booking details in local storage
      localStorage.setItem("bookingDetails", JSON.stringify(bookingDetails));

      // Redirect to SelectFlight page
      router.push('/select-flight');
    } catch (error) {
      console.error('Error submitting booking:', error);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-500 to-black h-lvh flex flex-col items-center justify-center relative overflow-hidden">
      <div className="w-full max-w-4xl mx-auto p-8 bg-white shadow-md rounded-lg">
        {/* Booker Name */}
        <div className="grid grid-cols-2 gap-4 mb-6 pt-4">
          <div>
            <label className="block mb-2 font-semibold">First Name</label>
            <input
              type="text"
              className="w-full p-4 rounded-lg bg-gray-100"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter your First name"
              required
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold">Last Name</label>
            <input
              type="text"
              className="w-full p-4 rounded-lg bg-gray-100"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter your last name"
            />
          </div>
        </div>

        {/* Trip Type */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold">
            Book International and Domestic Flights
          </h2>
        </div>

        {/* From and To Cities */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block mb-2 font-semibold">From</label>
            <select
              className="w-full p-4 rounded-lg bg-gray-100"
              value={fr} // Using 'fr'
              onChange={(e) => setFr(e.target.value)} // Updated handler for 'fr'
            >
              <option value="">Select From City</option>
              {cities.map((city) => (
                <option key={city.code} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-2 font-semibold">To</label>
            <select
              className="w-full p-4 rounded-lg bg-gray-100"
              value={t} // Using 't'
              onChange={(e) => setT(e.target.value)} // Updated handler for 't'
            >
              <option value="">Select To City</option>
              {cities.map((city) => (
                <option key={city.code} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Departure Date */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block mb-2 font-semibold">Departure Date</label>
            <input
              type="date"
              className="w-full p-4 rounded-lg bg-gray-100"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
            />
          </div>
        </div>

        {/* Fare Type */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold">
            Select a special fare
          </label>
          <div className="flex items-center space-x-4">
            <button
              className={`px-4 py-2 rounded-lg font-semibold ${
                fareType === "regular" ? "bg-blue-500 text-white" : "bg-gray-100"
              }`}
              onClick={() => setFareType("regular")}
            >
              Regular
            </button>
            <button
              className={`px-4 py-2 rounded-lg font-semibold ${
                fareType === "student" ? "bg-blue-500 text-white" : "bg-gray-100"
              }`}
              onClick={() => setFareType("student")}
            >
              Student
            </button>
            <button
              className={`px-4 py-2 rounded-lg font-semibold ${
                fareType === "senior-citizen" ? "bg-blue-500 text-white" : "bg-gray-100"
              }`}
              onClick={() => setFareType("senior-citizen")}
            >
              Senior Citizen
            </button>
            <button
              className={`px-4 py-2 rounded-lg font-semibold ${
                fareType === "armed-forces" ? "bg-blue-500 text-white" : "bg-gray-100"
              }`}
              onClick={() => setFareType("armed-forces")}
            >
              Armed Forces
            </button>
          </div>
        </div>

        {/* Class Type */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Class Type</label>
          <select
            className="w-full p-4 rounded-lg bg-gray-100"
            value={classType}
            onChange={(e) => setClassType(e.target.value)}
          >
            <option value="economy">Economy</option>
            <option value="premium-economy">Premium Economy</option>
            <option value="business">Business</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          className="w-full py-4 bg-blue-500 text-white font-bold text-lg rounded-lg"
          onClick={handleSubmit}
        >
          SEARCH
        </button>
      </div>
    </div>
  );
};

export default FlightBooking;
