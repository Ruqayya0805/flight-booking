import oracledb from 'oracledb';

// Oracle DB connection configuration
const dbConfig = {
  user: 'system',
  password: 'Sarang19',
  connectionString: 'localhost/XE', // e.g., 'localhost/XE'
};

// Define the POST method
export async function POST(req) {
  const bookingData = await req.json(); // Get the JSON body from the request

  let connection;

  try {
    // Connect to the database
    connection = await oracledb.getConnection(dbConfig);

    // SQL query to insert booking details
    const sql = `
      INSERT INTO bookings (pnr, eticket_no, first_name, last_name, flight_brand, departure_time, arrival_time, class_type)
      VALUES (:pnr, :eticket_no, :first_name, :last_name, :flight_brand, :departure_time, :arrival_time, :class_type)
    `;

    // Execute the insert query
    await connection.execute(sql, {
      pnr: bookingData.pnr,
      eticket_no: bookingData.eticketNo,
      first_name: bookingData.firstName,
      last_name: bookingData.lastName,
      flight_brand: bookingData.flightBrand,
      departure_time: bookingData.departureTime,
      arrival_time: bookingData.arrivalTime,
      class_type: bookingData.classType,
    }, { autoCommit: true }); // Commit changes automatically

    // Return a success response
    return new Response(JSON.stringify({ message: 'Booking stored successfully!' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error storing booking:', error);
    return new Response(JSON.stringify({ success: false, error: 'Failed to store booking.' }), {
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
