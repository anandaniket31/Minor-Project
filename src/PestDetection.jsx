import { useState } from 'react';
import './App.css';
import { useLanguage } from './context/LanguageContext';

function PestDetection() {
    const { t } = useLanguage();
    const [selectedImage, setSelectedImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            setPreview(URL.createObjectURL(file));
            setResult(null); // Reset result on new image
        }
    };

    const analyzeImage = () => {
        if (!selectedImage) return;

        setAnalyzing(true);

        // Simulate CNN Processing Delay
        setTimeout(() => {
            const mockDiseases = [
                { name: "Healthy", confidence: "98%", treatment: "No action needed. Keep monitoring." },
                { name: "Late Blight", confidence: "89%", treatment: "Apply fungicide like Mancozeb. Improve drainage." },
                { name: "Yellow Leaf Curl", confidence: "92%", treatment: "Control whiteflies. Remove infected plants." },
                { name: "Bacterial Spot", confidence: "85%", treatment: "Use copper-based sprays. Avoid overhead watering." },
                { name: "Powdery Mildew", confidence: "90%", treatment: "Apply sulfur or neem oil. Ensure good air circulation." }
            ];

            // Randomly select a result for demonstration
            const randomResult = mockDiseases[Math.floor(Math.random() * mockDiseases.length)];

            setResult(randomResult);
            setAnalyzing(false);
        }, 2500); // 2.5 seconds delay
    };

    return (
        <div className="pest-container">
            <h2>{t('pestDetectionTitle')}</h2>
            <p>{t('pestDesc')}</p>

            <div className="upload-section">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    id="file-upload"
                    className="file-input"
                />
                <label htmlFor="file-upload" className="file-label">
                    {selectedImage ? "Change Image" : t('uploadImage')}
                </label>
            </div>

            {preview && (
                <div className="image-preview-container">
                    <img src={preview} alt="Crop Preview" className="image-preview" />
                </div>
            )}

            {selectedImage && !analyzing && !result && (
                <button onClick={analyzeImage} className="analyze-btn">
                    🔍 {t('detectPest')}
                </button>
            )}

            {analyzing && (
                <div className="analyzing-status">
                    <div className="spinner"></div>
                    <p>Scanning image with CNN model...</p>
                </div>
            )}

            {result && (
                <div className={`result-card ${result.name === 'Healthy' ? 'healthy' : 'infected'}`}>
                    <h3>Analysis Result</h3>
                    <div className="result-details">
                        <div className="result-row">
                            <span className="label">Status:</span>
                            <span className="value status">{result.name}</span>
                        </div>
                        <div className="result-row">
                            <span className="label">{t('confidence')}:</span>
                            <span className="value">{result.confidence}</span>
                        </div>
                        <div className="result-row full">
                            <span className="label">{t('solution')}:</span>
                            <p className="treatment">{result.treatment}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PestDetection;
