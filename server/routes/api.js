import express from 'express';

const router = express.Router();
console.log('✅ API Routes loaded');

// In-Memory Data Stores
const cropHistory = [];
const pestHistory = [];

// Health Check
router.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'API is healthy (In-Memory)' });
});

// --- Crop Recommendation Routes ---

// POST /recommend - Get crop recommendation based on input
router.post('/recommend', (req, res) => {
    try {
        const { nitrogen, phosphorus, potassium, ph, rainfall, temperature, humidity } = req.body;

        // Simple Rule-Based Logic (Mocking ML Model)
        let recommendedCrop = "Rice"; // Default

        // Convert inputs to numbers
        const N = parseFloat(nitrogen);
        const P = parseFloat(phosphorus);
        const K = parseFloat(potassium);
        const pH = parseFloat(ph);
        const rain = parseFloat(rainfall);

        // Logic based on general agricultural data
        if (N > 80 && rain > 200) {
            recommendedCrop = "Rice";
        } else if (N < 40 && P > 50 && K > 50) {
            recommendedCrop = "Chickpea";
        } else if (N > 60 && rain < 100 && pH > 6) {
            recommendedCrop = "Maize";
        } else if (P > 30 && K > 20 && rain < 50) {
            recommendedCrop = "Moth Beans";
        } else if (rain > 150 && pH < 6) {
            recommendedCrop = "Tea";
        } else if (rain > 150 && pH > 6) {
            recommendedCrop = "Coconut";
        } else if (N > 100 && P > 40) {
            recommendedCrop = "Cotton";
        } else if (pH < 5.5) {
            recommendedCrop = "Coffee";
        } else if (rain < 70) { // Removed temperature check for simplicity if not passed
            recommendedCrop = "Watermelon";
        } else {
            recommendedCrop = "Wheat"; // Fallback
        }

        // Save to history automatically
        const newRecommendation = {
            ...req.body,
            recommendedCrop,
            id: Date.now().toString(),
            createdAt: new Date()
        };
        cropHistory.unshift(newRecommendation);

        res.json({ success: true, prediction: recommendedCrop });
    } catch (error) {
        console.error("Recommendation Error:", error);
        res.status(500).json({ success: false, message: "Failed to process recommendation" });
    }
});

// Save a new recommendation (Manual save if needed, or just history)
router.post('/crops', (req, res) => {
    try {
        const newRecommendation = {
            ...req.body,
            id: Date.now().toString(),
            createdAt: new Date()
        };
        cropHistory.unshift(newRecommendation); // Add to beginning
        res.status(201).json(newRecommendation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all recommendations (History)
router.get('/crops', (req, res) => {
    res.json(cropHistory);
});

// --- Pest Detection Routes ---

// Save a new detection result
router.post('/pests', (req, res) => {
    try {
        const newDetection = {
            ...req.body,
            id: Date.now().toString(),
            createdAt: new Date()
        };
        pestHistory.unshift(newDetection);
        res.status(201).json(newDetection);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all detections (History)
router.get('/pests', (req, res) => {
    res.json(pestHistory);
});

export default router;
