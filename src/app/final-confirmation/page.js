"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Function to generate a random PNR
const generateRandomPNR = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let pnr = '';
  for (let i = 0; i < 6; i++) {
    pnr += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return pnr;
};

// Function to generate a random e-ticket number
const generateRandomETicketNo = () => {
  const characters = '0123456789';
  let eticketNo = 'ET';
  for (let i = 0; i < 8; i++) { // Generate 8 random digits
    eticketNo += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return eticketNo;
};

const FinalConfirmation = () => {
  const router = useRouter();
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [eticketNo, setEticketNo] = useState(generateRandomETicketNo()); // Initialize with a random e-ticket number

  useEffect(() => {
    // Retrieve selected flight details from localStorage
    const flight = JSON.parse(localStorage.getItem("selectedFlight"));
    const booking = JSON.parse(localStorage.getItem("bookingDetails")); // Fetch bookingDetails
    if (flight) {
      setSelectedFlight(flight);
    } else {
      router.push("/"); // Redirect to home if no flight is selected
    }

    if (booking) {
      setBookingDetails(booking); // Set booking details if they exist
    }
  }, [router]);

  const handleBooking = async () => {
    const pnr = generateRandomPNR(); // Generate a random PNR
    const bookingData = {
      pnr,
      eticketNo,
      firstName: bookingDetails.firstName,
      lastName: bookingDetails.lastName,
      flightBrand: selectedFlight.brand,
      departureTime: selectedFlight.departureTime,
      arrivalTime: selectedFlight.arrivalTime,
      classType: bookingDetails.classType,
    };

    try {
      const response = await fetch('/api/store-booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        throw new Error('Failed to store booking');
      }

      const result = await response.json();
      console.log(result.message); // Log success message
      router.push("/"); // Redirect to home after successful booking
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-500 to-black h-screen flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4 text-white">Booking Confirmation</h1>
      {selectedFlight ? (
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full border border-gray-200">
          {/* Flight details header */}
          <div className="flex items-center justify-between border-b pb-4 mb-4">
            <div className="flex items-center">
              <div>
                <p className="text-sm font-semibold text-gray-700">{selectedFlight.brand}</p>
              </div>
            </div>
            <div className="bg-gray-100 p-2 rounded-md text-center">
              <p className="text-xs text-gray-500">PNR</p>
              <p className="text-base font-bold tracking-widest">{generateRandomPNR()}</p> {/* Generate random PNR */}
            </div>
          </div>

          {/* Flight route */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-left">
              <p className="text-gray-600">{bookingDetails.fr}</p>
              <p className="font-semibold text-lg">{selectedFlight.departureTime}</p>
              <p className="text-sm text-gray-500">{selectedFlight.departureDate}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-600">{bookingDetails.t}</p>
              <p className="font-semibold text-lg">{selectedFlight.arrivalTime}</p>
              <p className="text-sm text-gray-500">{selectedFlight.arrivalDate}</p>
            </div>
          </div>

          {/* Flight services */}
          <div className="flex justify-between border-t border-b py-3 mb-4">
            <div className="text-center">
              <p className="text-xs text-gray-500">Eco Comfort</p>
              <p className="text-sm">{bookingDetails.classType}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500">Check-in</p>
              <p className="text-sm">15 Kgs per Adult</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500">Cabin</p>
              <p className="text-sm">7 Kgs per Adult</p>
            </div>
          </div>

          {/* Traveler info */}
          <div className="bg-gray-100 p-4 rounded-md mb-4">
            <p className="font-semibold text-gray-800">
              Traveler: {bookingDetails ? `${bookingDetails.firstName} ${bookingDetails.lastName}` : 'N/A'}
            </p>
            <div className="flex justify-between mt-2">
              <p className="text-sm text-gray-600">E-ticket No: {eticketNo}</p> {/* Display random e-ticket number */}
            </div>
          </div>

          <p className="text-sm text-gray-600 text-center">
            Thank you for choosing BookMyFlight! We wish you a pleasant journey.
          </p>
        </div>
      ) : (
        <p>No flight selected.</p>
      )}
      <button
        className="mt-6 px-6 py-3 bg-yellow-500 text-white font-bold rounded-full shadow-lg hover:bg-yellow-600"
        onClick={handleBooking} // Call handleBooking on confirm
      >
        Confirm
      </button>
    </div>
  );
};

export default FinalConfirmation;
