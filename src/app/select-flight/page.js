"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const SelectFlight = () => {
  const router = useRouter();
  const [flightOptions, setFlightOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        console.log('Fetching flights...'); // Log when fetching starts

        const response = await fetch('/api/get-flights', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        // Check for a successful response
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Received data:', data); // Log the received data

        if (data.success) {
          setFlightOptions(data.flights);
          console.log('Flight options set:', data.flights); // Log when flight options are set
        } else {
          console.error('Failed to fetch flights:', data.error);
        }
      } catch (error) {
        console.error('Error fetching flight options:', error);
      } finally {
        setLoading(false);
        console.log('Loading complete.'); // Log when loading is complete
      }
    };

    fetchFlights();
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto p-8 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-6">Select Your Flight</h2>
      {loading ? (
        <div className="flex justify-center">
          <div className="loader">Loading...</div> {/* Add a spinner or loader here */}
        </div>
      ) : flightOptions.length === 0 ? (
        <p>No flights available.</p>
      ) : (
        flightOptions.map((flight) => (
          <div key={flight.flightId} className="border p-4 rounded-lg mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold">{flight.brand}</span>
              <span className="font-bold text-lg">₹{flight.price}</span>
            </div>
            <div className="text-sm text-gray-600">
              <p>{flight.departureTime} - {flight.arrivalTime}</p>
            </div>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600" // Added hover effect
              onClick={() => {
                localStorage.setItem("selectedFlight", JSON.stringify(flight));
                console.log('Selected flight:', flight); // Log the selected flight
                router.push("/final-confirmation");
              }}
            >
              Select Flight
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default SelectFlight;
