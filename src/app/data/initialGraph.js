// data/initialGraph.js
const initialGraph = {
    Delhi: [
      { cost: 500, layoverTime: 30, destinationCity: "Mumbai" },
      { cost: 800, layoverTime: 60, destinationCity: "Kolkata" },
      { cost: 700, layoverTime: 45, destinationCity: "Bangalore" },
    ],
    Mumbai: [
      { cost: 600, layoverTime: 20, destinationCity: "Delhi" },
      { cost: 900, layoverTime: 50, destinationCity: "Bangalore" },
    ],
    Kolkata: [
      { cost: 700, layoverTime: 35, destinationCity: "Delhi" },
      { cost: 1000, layoverTime: 40, destinationCity: "Mumbai" },
    ],
    Bangalore: [
      { cost: 400, layoverTime: 15, destinationCity: "Delhi" },
      { cost: 750, layoverTime: 25, destinationCity: "Mumbai" },
    ],
    // Add other cities as needed
  };
  
  export default initialGraph;
  