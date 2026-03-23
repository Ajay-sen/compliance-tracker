const mongoose = require('mongoose');
const Client = require('./models/Clients');
require('dotenv').config();

const seedClients = [
    { company_name: "TechCorp India", country: "India", entity_type: "Private Ltd" },
    { company_name: "Global Solutions", country: "USA", entity_type: "LLC" },
    { company_name: "Jadavpur Ventures", country: "India", entity_type: "Partnership" }
];

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        await Client.deleteMany({}); // Clears existing clients
        await Client.insertMany(seedClients);
        console.log("Seed Data Inserted!");
        process.exit();
    })
    .catch(err => console.log(err));