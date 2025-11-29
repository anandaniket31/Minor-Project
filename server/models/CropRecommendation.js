import mongoose from 'mongoose';

const cropRecommendationSchema = new mongoose.Schema({
    nitrogen: { type: Number, required: true },
    phosphorus: { type: Number, required: true },
    potassium: { type: Number, required: true },
    ph: { type: Number, required: true },
    rainfall: { type: Number, required: true },
    recommendedCrop: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('CropRecommendation', cropRecommendationSchema);
