# Next.js Flight Booking Application

## Overview

This Next.js application enables users to book flights by providing their details. It retrieves available flight options from an SQL database and generates an e-ticket, which is also stored in the database for future reference.
## Features

- User details input form.
- Fetches available flights from an SQL database.
- Generates an e-ticket after booking.
- Stores user information and e-ticket in the SQL database.

## Prerequisites

Make sure you have the following installed:

- [Next.js](https://nextjs.org/)
- SQL Database (Oracle SQL)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/nextjs-flight-booking-app.git

2. Navigate to the project directory:

   ```bash
   cd nextjs-flight-booking-app

3. Install the dependencies:
   ```bash
   npm install

4. Set up your SQL database (Oracle SQL):
Create a database (e.g., flight_booking).
Create the necessary tables to store user details, flight data, and e-ticket information.

## Database Structure

Ensure the following tables are present in your SQL database:

### Flights Table

| Column         | Null?   | Type             |
|----------------|---------|------------------|
| `FLIGHT_ID`    | NOT NULL| NUMBER           |
| `BRAND`        |         | VARCHAR2(50)     |
| `PRICE`        |         | NUMBER           |
| `DEPARTURE_TIME` |       | VARCHAR2(20)     |
| `ARRIVAL_TIME` |         | VARCHAR2(20)     |

### Flight Bookings Table

| Column          | Null?   | Type             |
|-----------------|---------|------------------|
| `PASSENGER_ID`  | NOT NULL| NUMBER           |
| `FIRST_NAME`    | NOT NULL| VARCHAR2(50)     |
| `LAST_NAME`     | NOT NULL| VARCHAR2(50)     |
| `FROM_CITY`     | NOT NULL| VARCHAR2(20)     |
| `TO_CITY`       | NOT NULL| VARCHAR2(20)     |
| `DEPARTURE_DATE`| NOT NULL| DATE             |
| `TRIP_TYPE`     | NOT NULL| VARCHAR2(20)     |
| `FARE_TYPE`     | NOT NULL| VARCHAR2(20)     |
| `CLASS_TYPE`    | NOT NULL| VARCHAR2(20)     |

### Bookings Table

| Column         | Null?   | Type             |
|----------------|---------|------------------|
| `PNR`          | NOT NULL| VARCHAR2(20)     |
| `ETICKET_NO`   | NOT NULL| VARCHAR2(20)     |
| `FIRST_NAME`   | NOT NULL| VARCHAR2(50)     |
| `LAST_NAME`    | NOT NULL| VARCHAR2(50)     |
| `FLIGHT_BRAND` | NOT NULL| VARCHAR2(50)     |
| `DEPARTURE_TIME`| NOT NULL| VARCHAR2(20)    |
| `ARRIVAL_TIME` | NOT NULL| VARCHAR2(20)     |
| `CLASS_TYPE`   | NOT NULL| VARCHAR2(20)     |

