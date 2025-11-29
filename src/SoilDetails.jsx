import { useState } from 'react';
import './App.css';
import { useLanguage } from './context/LanguageContext';

function SoilDetails() {
    const { t } = useLanguage();
    const [searchTerm, setSearchTerm] = useState('');
    const [soilData, setSoilData] = useState(null);
    const [error, setError] = useState('');

    // Mock Database of Indian Soil Types (States & Cities)
    const soilDatabase = {
        // States
        "punjab": {
            region: "Punjab",
            type: "Alluvial Soil",
            ph: "7.0 - 8.0 (Slightly Alkaline)",
            color: "Light Grey to Ash Grey",
            crops: "Wheat, Rice, Sugarcane, Cotton, Maize",
            nutrients: "Rich in Potash and Lime, deficient in Nitrogen and Phosphorus"
        },
        "maharashtra": {
            region: "Maharashtra",
            type: "Black Soil (Regur)",
            ph: "6.8 - 7.5 (Neutral to Alkaline)",
            color: "Deep Black to Grey",
            crops: "Cotton, Sugarcane, Jowar, Bajra, Soybean",
            nutrients: "Rich in Calcium, Potassium, Magnesium; poor in Nitrogen"
        },
        "kerala": {
            region: "Kerala",
            type: "Laterite Soil",
            ph: "4.5 - 6.0 (Acidic)",
            color: "Reddish Brown",
            crops: "Tea, Coffee, Rubber, Coconut, Spices",
            nutrients: "Rich in Iron and Aluminum; poor in Nitrogen, Potash"
        },
        "west bengal": {
            region: "West Bengal",
            type: "Alluvial Soil",
            ph: "6.5 - 7.5",
            color: "Grey",
            crops: "Rice, Jute, Tea, Potato",
            nutrients: "Rich in Potash; poor in Phosphorus"
        },
        "rajasthan": {
            region: "Rajasthan",
            type: "Desert / Arid Soil",
            ph: "7.5 - 8.5 (Alkaline)",
            color: "Red to Brown",
            crops: "Bajra, Pulses, Guar, Mustard",
            nutrients: "High Soluble Salts, low Nitrogen and Humus"
        },
        "tamil nadu": {
            region: "Tamil Nadu",
            type: "Red Soil",
            ph: "6.0 - 7.0",
            color: "Red",
            crops: "Groundnut, Millets, Ragi, Rice, Pulses",
            nutrients: "Rich in Iron; poor in Nitrogen, Phosphorus, Humus"
        },
        "uttar pradesh": {
            region: "Uttar Pradesh",
            type: "Alluvial Soil",
            ph: "7.0 - 8.0",
            color: "Light Grey",
            crops: "Wheat, Rice, Sugarcane, Pulses",
            nutrients: "Rich in Potash; poor in Nitrogen"
        },
        "gujarat": {
            region: "Gujarat",
            type: "Black & Alluvial Soil",
            ph: "7.0 - 8.0",
            color: "Black / Grey",
            crops: "Cotton, Groundnut, Tobacco, Bajra",
            nutrients: "Rich in Calcium, Potash; poor in Nitrogen"
        },
        "karnataka": {
            region: "Karnataka",
            type: "Red & Laterite Soil",
            ph: "6.5 - 7.5",
            color: "Red",
            crops: "Coffee, Ragi, Sandalwood, Silk, Spices",
            nutrients: "Rich in Iron, Potash; poor in Nitrogen"
        },
        "andhra pradesh": {
            region: "Andhra Pradesh",
            type: "Red & Black Soil",
            ph: "6.5 - 7.5",
            color: "Red / Black",
            crops: "Rice, Tobacco, Chillies, Cotton",
            nutrients: "Rich in Iron, Lime; deficient in Nitrogen"
        },

        // Cities
        "mumbai": {
            region: "Mumbai, Maharashtra",
            type: "Black Soil (Regur)",
            ph: "6.5 - 7.5",
            color: "Deep Black",
            crops: "Rice, Vegetables, Coconut (in outskirts)",
            nutrients: "Rich in Calcium, Magnesium; poor in Nitrogen"
        },
        "delhi": {
            region: "Delhi",
            type: "Alluvial Soil",
            ph: "7.0 - 8.0",
            color: "Greyish",
            crops: "Wheat, Vegetables, Flowers",
            nutrients: "Rich in Potash; poor in Nitrogen"
        },
        "bangalore": {
            region: "Bangalore, Karnataka",
            type: "Red Loamy Soil",
            ph: "6.0 - 7.0",
            color: "Red",
            crops: "Ragi, Vegetables, Flowers, Fruits",
            nutrients: "Rich in Iron, Potash; poor in Nitrogen"
        },
        "chennai": {
            region: "Chennai, Tamil Nadu",
            type: "Red Sandy / Coastal Alluvial",
            ph: "6.5 - 7.5",
            color: "Red / Grey",
            crops: "Rice, Groundnut, Vegetables",
            nutrients: "Rich in Potash; poor in Nitrogen"
        },
        "kolkata": {
            region: "Kolkata, West Bengal",
            type: "Alluvial Soil",
            ph: "6.5 - 7.2",
            color: "Grey",
            crops: "Rice, Jute, Vegetables",
            nutrients: "Rich in Potash; poor in Phosphorus"
        },
        "hyderabad": {
            region: "Hyderabad, Telangana",
            type: "Red Sandy Soil",
            ph: "6.5 - 7.5",
            color: "Red",
            crops: "Millets, Cotton, Chillies",
            nutrients: "Rich in Iron; poor in Nitrogen, Zinc"
        },
        "ahmedabad": {
            region: "Ahmedabad, Gujarat",
            type: "Alluvial / Black Soil",
            ph: "7.0 - 8.0",
            color: "Grey / Black",
            crops: "Cotton, Wheat, Castor",
            nutrients: "Rich in Potash; poor in Nitrogen"
        },
        "pune": {
            region: "Pune, Maharashtra",
            type: "Black Soil",
            ph: "6.5 - 7.5",
            color: "Black",
            crops: "Sugarcane, Jowar, Bajra, Vegetables",
            nutrients: "Rich in Calcium, Magnesium; poor in Nitrogen"
        },
        "jaipur": {
            region: "Jaipur, Rajasthan",
            type: "Sandy Loam / Desert Soil",
            ph: "7.5 - 8.5",
            color: "Brown",
            crops: "Bajra, Mustard, Barley",
            nutrients: "High Soluble Salts; poor in Nitrogen"
        },
        "lucknow": {
            region: "Lucknow, Uttar Pradesh",
            type: "Alluvial Soil",
            ph: "7.0 - 8.0",
            color: "Light Grey",
            crops: "Wheat, Rice, Mangoes",
            nutrients: "Rich in Potash; poor in Nitrogen"
        },
        "patna": {
            region: "Patna, Bihar",
            type: "Alluvial Soil",
            ph: "6.5 - 7.5",
            color: "Grey",
            crops: "Rice, Wheat, Maize, Pulses",
            nutrients: "Rich in Potash; poor in Nitrogen"
        },
        "bhopal": {
            region: "Bhopal, Madhya Pradesh",
            type: "Black Soil",
            ph: "6.8 - 7.5",
            color: "Black",
            crops: "Soybean, Wheat, Gram",
            nutrients: "Rich in Calcium; poor in Nitrogen, Phosphorus"
        },
        "chandigarh": {
            region: "Chandigarh",
            type: "Alluvial Soil",
            ph: "7.0 - 7.5",
            color: "Grey",
            crops: "Wheat, Maize, Vegetables",
            nutrients: "Rich in Potash; poor in Nitrogen"
        },
        "coimbatore": {
            region: "Coimbatore, Tamil Nadu",
            type: "Black & Red Soil",
            ph: "6.5 - 7.5",
            color: "Black / Red",
            crops: "Cotton, Tea (nearby hills), Coconut",
            nutrients: "Rich in Potash, Lime; poor in Nitrogen"
        },
        "indore": {
            region: "Indore, Madhya Pradesh",
            type: "Black Soil",
            ph: "7.0 - 7.5",
            color: "Black",
            crops: "Soybean, Wheat, Cotton",
            nutrients: "Rich in Calcium; poor in Nitrogen"
        },
        "nagpur": {
            region: "Nagpur, Maharashtra",
            type: "Black Soil",
            ph: "6.5 - 7.5",
            color: "Deep Black",
            crops: "Oranges, Cotton, Soybean",
            nutrients: "Rich in Potash, Lime; poor in Nitrogen"
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const query = searchTerm.toLowerCase().trim();

        if (soilDatabase[query]) {
            setSoilData(soilDatabase[query]);
            setError('');
        } else {
            setSoilData(null);
            setError('No soil details found for this region. Try a major city or state name.');
        }
    };

    return (
        <div className="soil-container">
            <h2>{t('soilDetailsTitle')}</h2>
            <p>Search for a city or state to know its soil properties.</p>

            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder="Enter City or State (e.g., Mumbai, Punjab)..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <button type="submit" className="search-btn">Search</button>
            </form>

            {error && <p className="error-msg">{error}</p>}

            {soilData && (
                <div className="soil-card">
                    <h3>{soilData.region}</h3>
                    <div className="soil-grid">
                        <div className="soil-item">
                            <span className="soil-label">{t('soilType')}</span>
                            <span className="soil-value">{soilData.type}</span>
                        </div>
                        <div className="soil-item">
                            <span className="soil-label">{t('phLevel')}</span>
                            <span className="soil-value">{soilData.ph}</span>
                        </div>
                        <div className="soil-item">
                            <span className="soil-label">Color</span>
                            <span className="soil-value">{soilData.color}</span>
                        </div>
                        <div className="soil-item full-width">
                            <span className="soil-label">Suitable Crops</span>
                            <span className="soil-value">{soilData.crops}</span>
                        </div>
                        <div className="soil-item full-width">
                            <span className="soil-label">Nutrient Profile</span>
                            <span className="soil-value">{soilData.nutrients}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SoilDetails;
