const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3890;

app.use(cors({
    origin: 'http://localhost:3000', // המקור המורשה לבקשות
}));
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

// Middleware to parse JSON bodies
app.use(express.json());

const fs = require('fs');

const {Allcalculations} = require('./calculations');

app.get('/data/:date', (req, res) => {
    
    const filePath = './operations_data.json'; 

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading JSON file:', err);
            return;
        }
        try {
            
            const jsonData = JSON.parse(data);
            console.log(req.params);
            res.json(Allcalculations(jsonData,req.params.date));
            console.log("good")
        }
        catch (error) {
            console.error('Error parsing JSON:', error);
        }
   
})
});
