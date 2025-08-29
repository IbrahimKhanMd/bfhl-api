const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());


const USER_ID = "ibrahimkhan_14072004"; // Format: {full_name_ddmmyyyy}
const EMAIL = "ibrahim.22bcb7267@vitapstudent.ac.in";
const ROLL_NUMBER = "22BCB7267";


app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;
        
        // Validate input
        if (!data || !Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                user_id: USER_ID,
                email: EMAIL,
                roll_number: ROLL_NUMBER,
                message: "Invalid input: 'data' should be an array"
            });
        }

        // Initialize arrays and variables
        const evenNumbers = [];
        const oddNumbers = [];
        const alphabets = [];
        const specialCharacters = [];
        let numberSum = 0;

        // Process each item in the input array
        data.forEach(item => {
            const str = String(item);
            
            // Check if it's a number
            if (!isNaN(str) && !isNaN(parseFloat(str)) && str.trim() !== '') {
                const num = parseInt(str);
                numberSum += num;
                
                if (num % 2 === 0) {
                    evenNumbers.push(str); // Keep as string
                } else {
                    oddNumbers.push(str); // Keep as string
                }
            }
            // Check if it's alphabetic (single character)
            else if (str.length === 1 && /[a-zA-Z]/.test(str)) {
                alphabets.push(str.toUpperCase());
            }
            // Check if it's a special character (single character, not alphanumeric)
            else if (str.length === 1 && !/[a-zA-Z0-9]/.test(str)) {
                specialCharacters.push(str);
            }
        });

        // Create concatenation of alphabets in reverse order with alternating caps
        let concatString = '';
        const reversedAlphabets = [...alphabets].reverse();
        reversedAlphabets.forEach((char, index) => {
            if (index % 2 === 0) {
                concatString += char.toUpperCase();
            } else {
                concatString += char.toLowerCase();
            }
        });

        // Prepare response
        const response = {
            is_success: true,
            user_id: USER_ID,
            email: EMAIL,
            roll_number: ROLL_NUMBER,
            odd_numbers: oddNumbers,
            even_numbers: evenNumbers,
            alphabets: alphabets,
            special_characters: specialCharacters,
            sum: numberSum.toString(), // Return as string
            concat_string: concatString
        };

        res.status(200).json(response);

    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({
            is_success: false,
            user_id: USER_ID,
            email: EMAIL,
            roll_number: ROLL_NUMBER,
            message: "Internal server error"
        });
    }
});

// GET /bfhl endpoint (optional, for testing)
app.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
});

// Health check endpoint
app.get('/', (req, res) => {
    res.json({
        message: "BFHL API is running",
        endpoints: {
            POST: "/bfhl",
            GET: "/bfhl"
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;