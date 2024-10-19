// src/app/api/book-flight/route.js

import oracledb from 'oracledb';

// Oracle DB connection details
const dbConfig = {
  user: 'system',
  password: 'Sarang19',
  connectionString: 'localhost/XE', // e.g., 'localhost/XE'
};

// Function to generate a random primary key
function generateRandomId() {
  return Math.floor(Math.random() * 1000000); // Random ID between 0 and 999999
}

// Define the POST method
export async function POST(req) {
  const {
    firstName,
    lastName,
    fr,
    t,
    departureDate,
    tripType,
    fareType,
    classType,
  } = await req.json(); // Get the JSON body from the request

  let connection;

  try {
    // Establish a connection to the Oracle database
    connection = await oracledb.getConnection(dbConfig);

    // Generate a random primary key
    const passenger_id = generateRandomId();

    // Insert the flight booking details
    const result = await connection.execute(
      `INSERT INTO flight_bookings (passenger_id, first_name, last_name, from_city, to_city, departure_date, trip_type, fare_type, class_type)
       VALUES (:passenger_id, :firstName, :lastName, :fr, :t, TO_DATE(:departureDate, 'YYYY-MM-DD'), :tripType, :fareType, :classType)`,
      {
        passenger_id,
        firstName,
        lastName,
        fr,
        t,
        departureDate, // Expecting a string in 'YYYY-MM-DD' format
        tripType,
        fareType,
        classType,
      },
      { autoCommit: true }
    );

    // Return a success response
    return new Response(JSON.stringify({ success: true, result }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error inserting booking:', error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } finally {
    // Ensure the connection is released
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error closing connection:', err);
      }
    }
  }
}
