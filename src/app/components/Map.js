// components/Map.js
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import { useSpring, animated } from 'react-spring';
import L from 'leaflet';

const cityCoordinates = {
  Delhi: [28.6139, 77.2090],
  Mumbai: [19.0760, 72.8777],
  Kolkata: [22.5726, 88.3639],
  Bangalore: [12.9716, 77.5946],
  Chennai: [13.0827, 80.2707],
  Hyderabad: [17.3850, 78.4867],
  Pune: [18.5204, 73.8567],
  Jaipur: [26.9124, 75.7873],
  Ahmedabad: [23.0225, 72.5714],
  Lucknow: [26.8467, 80.9462],
};

const Map = ({ route, cost, layoverTime }) => {
  const positions = route.map(city => cityCoordinates[city]);
  
  const props = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 500 },
  });

  return (
    <animated.div style={props}>
      <MapContainer center={positions[0]} zoom={5} style={{ height: "500px", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {positions.map((pos, index) => (
          <Marker key={index} position={pos} icon={L.divIcon({ className: 'marker' })} />
        ))}
        <Polyline positions={positions} color="blue" />
      </MapContainer>
      <div>
        <h3>Route Information</h3>
        <p>Total Cost: ₹{cost}</p>
        <p>Total Layover Time: {layoverTime} minutes</p>
      </div>
    </animated.div>
  );
};

export default Map;
