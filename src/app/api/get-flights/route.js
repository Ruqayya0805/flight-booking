import oracledb from 'oracledb';

// Oracle DB connection details
const dbConfig = {
  user: 'system',
  password: 'Sarang19',
  connectionString: 'localhost/XE',
};

// Define the GET method to fetch 5 random flights
export async function GET() {
  let connection;

  try {
    // Establish a connection to the Oracle database
    connection = await oracledb.getConnection(dbConfig);

    // Fetch 5 random flights from the 'flights' table
    const result = await connection.execute(`
      SELECT *
      FROM (
        SELECT * 
        FROM flights 
        ORDER BY DBMS_RANDOM.VALUE
      )
      WHERE ROWNUM <= 5
    `); // Query to select 5 random flights

    // Convert rows to a JSON-friendly format, excluding certain fields
    const flights = result.rows.map((row) => ({
      flightId: row[0],
      brand: row[1],
      price: row[2],
      departureTime: row[3],
      arrivalTime: row[4],
    }));

    // Return a success response with flight data
    return new Response(JSON.stringify({ success: true, flights }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching flights:', error);
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
