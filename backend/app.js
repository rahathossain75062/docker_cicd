const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Add CORS support
const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://mongodb:27017/studentdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Define a schema for student data
const studentSchema = new mongoose.Schema({
    name: String,
    address: String,
    email: String, 
    phone: String, 
    course: String,
});

const Student = mongoose.model('Student', studentSchema);

// Middleware to parse JSON and enable CORS
app.use(express.json());
app.use(cors());

// API 1: Save DevOps Student Data
app.post('/api1', async (req, res) => {
    const { name, address, email, phone } = req.body;
    console.log('Received data for DevOps student:', { name, address, email, phone }); // Log received data
    try {
        const student = new Student({ name, address, email, phone, course: 'DevOps' });
        await student.save();
        res.send('DevOps student data saved!');
    } catch (error) {
        console.error('Error saving DevOps data:', error);
        res.status(500).send('Error saving data');
    }
});

// API 2: Get All DevOps Students
app.get('/devstudents', async (req, res) => {
    try {
        let students = await Student.find({ course: 'DevOps' });
        res.send({ message: 'DevOps student data retrieved!', data: students });
    } catch (error) {
        console.error('Error retrieving DevOps students:', error);
        res.status(500).send('Error retrieving data');
    }
});

// API 3: Save AI Student Data
app.post('/api2', async (req, res) => {
    const { name, address, email, phone } = req.body;
    console.log('Received data for AI student:', { name, address, email, phone }); // Log received data
    try {
        const student = new Student({ name, address, email, phone, course: 'AI' });
        await student.save();
        res.send('AI student data saved!');
    } catch (error) {
        console.error('Error saving AI data:', error);
        res.status(500).send('Error saving data');
    }
});

// API 4: Get All Students
app.get('/students', async (req, res) => {
    try {
        let students = await Student.find();
        res.send({ message: 'All student data retrieved!', data: students });
    } catch (error) {
        console.error('Error retrieving students:', error);
        res.status(500).send('Error retrieving data');
    }
});

// Start the server
app.listen(port, '0.0.0.0', () => {
    console.log(`Backend running on http://0.0.0.0:${port}`);
});

