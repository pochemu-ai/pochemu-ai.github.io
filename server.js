const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Serve static files
app.use(express.static(__dirname));

// Route for API registration
app.post('/api/alpha-signup', (req, res) => {
    const { name, email, source } = req.body;
    
    if (!name || !email || !source) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    
    const timestamp = new Date().toISOString();
    const logLine = `${timestamp} | Name: ${name} | Email: ${email} | Source: ${source}\n`;
    
    fs.appendFile(path.join(__dirname, 'alfa-test.txt'), logLine, 'utf8', (err) => {
        if (err) {
            console.error('Failed to write to file:', err);
            return res.status(500).json({ error: 'Server error' });
        }
        res.status(200).json({ success: true });
    });
});

// Fallback to index.html for undefined routes (supporting SPA style or default routing)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
