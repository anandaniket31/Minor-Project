import { useState } from 'react';
import './App.css';
import { useLanguage } from './context/LanguageContext';

function CropRecommendation() {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({
        nitrogen: '',
        phosphorus: '',
        potassium: '',
        ph: '',
        rainfall: '',
        location: ''
    });

    const [recommendation, setRecommendation] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setRecommendation(null);

        try {
            const response = await fetch('http://localhost:5000/api/recommend', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                setRecommendation(data.prediction);
            } else {
                alert("Failed to get recommendation: " + data.message);
            }
        } catch (error) {
            console.error("Error getting recommendation:", error);
            alert("Error connecting to server");
        }
    };

    return (
        <div className="crop-container">
            <h2>{t('cropRecommendationTitle')}</h2>
            <p>{t('cropDesc')}</p>

            <form onSubmit={handleSubmit} className="crop-form">
                <div className="form-group">
                    <label>{t('nitrogen')}</label>
                    <input type="number" name="nitrogen" value={formData.nitrogen} onChange={handleChange} required placeholder="e.g., 90" />
                </div>
                <div className="form-group">
                    <label>{t('phosphorus')}</label>
                    <input type="number" name="phosphorus" value={formData.phosphorus} onChange={handleChange} required placeholder="e.g., 40" />
                </div>
                <div className="form-group">
                    <label>{t('potassium')}</label>
                    <input type="number" name="potassium" value={formData.potassium} onChange={handleChange} required placeholder="e.g., 40" />
                </div>
                <div className="form-group">
                    <label>{t('phLevel')}</label>
                    <input type="number" step="0.1" name="ph" value={formData.ph} onChange={handleChange} required placeholder="e.g., 6.5" />
                </div>
                <div className="form-group">
                    <label>{t('rainfall')}</label>
                    <input type="number" name="rainfall" value={formData.rainfall} onChange={handleChange} required placeholder="e.g., 200" />
                </div>
                <div className="form-group">
                    <label>Location (City)</label>
                    <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Optional" />
                </div>

                <button type="submit" className="recommend-btn">{t('getRecommendation')}</button>
            </form>

            {recommendation && (
                <div className="recommendation-result">
                    <h3>{t('recommendedCrop')}:</h3>
                    <div className="crop-name">{recommendation}</div>
                </div>
            )}
        </div>
    );
}

export default CropRecommendation;
