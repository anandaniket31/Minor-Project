import mongoose from 'mongoose';

const pestDetectionSchema = new mongoose.Schema({
    imageName: { type: String }, // In a real app, this would be a URL or file path
    detectedDisease: { type: String, required: true },
    confidence: { type: String, required: true },
    treatment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('PestDetection', pestDetectionSchema);
