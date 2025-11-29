import { useState } from 'react';
import './App.css';
import LocationPicker from './LocationPicker';
import { useLanguage } from './context/LanguageContext';

function WeatherDashboard() {
    const { t } = useLanguage();
    const [loading, setLoading] = useState(false);
    const [locationFetched, setLocationFetched] = useState(false);
    const [searchMode, setSearchMode] = useState('current'); // 'current' or 'search'
    const [searchQuery, setSearchQuery] = useState("");
    const [showMap, setShowMap] = useState(false);

    // Initial state is null to show selection screen
    const [weather, setWeather] = useState(null);

    const getWeatherCondition = (code) => {
        if (code === 0) return "Clear Sky";
        if (code >= 1 && code <= 3) return "Partly Cloudy";
        if (code >= 45 && code <= 48) return "Foggy";
        if (code >= 51 && code <= 67) return "Rainy";
        if (code >= 71 && code <= 77) return "Snowy";
        if (code >= 95) return "Thunderstorm";
        return "Cloudy";
    };

    const fetchWeatherData = async (lat, lon) => {
        try {
            const [weatherResponse, geoResponse] = await Promise.all([
                fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,soil_moisture_0_to_1cm&daily=weather_code,temperature_2m_max,precipitation_sum&timezone=auto`
                ),
                fetch(
                    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
                )
            ]);

            const data = await weatherResponse.json();
            const geoData = await geoResponse.json();

            const current = data.current;
            const daily = data.daily;

            // Extract location name
            const locationName = geoData.city || geoData.locality || geoData.principalSubdivision || "Unknown Location";

            setWeather({
                location: locationName,
                temp: Math.round(current.temperature_2m),
                condition: getWeatherCondition(current.weather_code),
                humidity: current.relative_humidity_2m,
                windSpeed: current.wind_speed_10m,
                soilMoisture: current.soil_moisture_0_to_1cm || 40,
                forecast: daily.time.slice(1, 5).map((date, index) => ({
                    day: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
                    temp: Math.round(daily.temperature_2m_max[index + 1]),
                    condition: getWeatherCondition(daily.weather_code[index + 1]),
                    rain: daily.precipitation_sum[index + 1]
                }))
            });
            setLocationFetched(true);
        } catch (error) {
            console.error("Error fetching data:", error);
            alert("Failed to fetch weather or location data.");
        } finally {
            setLoading(false);
        }
    };

    const getLocation = () => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser");
            return;
        }

        setLoading(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                fetchWeatherData(position.coords.latitude, position.coords.longitude);
            },
            (error) => {
                setLoading(false);
                alert("Unable to retrieve your location");
            }
        );
    };

    const handleSearch = async () => {
        if (!searchQuery.trim()) return;
        setLoading(true);
        try {
            const response = await fetch(
                `https://geocoding-api.open-meteo.com/v1/search?name=${searchQuery}&count=1&language=en&format=json`
            );
            const data = await response.json();
            if (data.results && data.results.length > 0) {
                const { latitude, longitude, name, admin1, country } = data.results[0];
                await fetchWeatherData(latitude, longitude);
                setWeather(prev => ({
                    ...prev,
                    location: `${name}, ${admin1 || country}`
                }));
                setLocationFetched(true);
            } else {
                alert("City not found");
            }
        } catch (error) {
            console.error("Search error:", error);
            alert("Failed to search location");
        } finally {
            setLoading(false);
        }
    };

    const handleMapSelect = (latlng) => {
        setShowMap(false);
        fetchWeatherData(latlng.lat, latlng.lng);
    };

    if (!weather) {
        return (
            <div className="weather-dashboard empty-state">
                <h2>{t('welcomeTitle')}</h2>
                <p>Choose how you want to check the weather</p>

                <div className="selection-container">
                    <div className="selection-card" onClick={getLocation}>
                        <span className="icon">📍</span>
                        <h3>Use Current Location</h3>
                        <p>Get weather for your exact location</p>
                    </div>

                    <div className="selection-divider">OR</div>

                    <div className="selection-card search-mode">
                        <span className="icon">🔍</span>
                        <h3>Search City</h3>
                        <div className="initial-search-box" onClick={(e) => e.stopPropagation()}>
                            <input
                                type="text"
                                placeholder="Enter city name..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                            />
                            <button onClick={handleSearch} disabled={loading}>Go</button>
                        </div>
                    </div>
                </div>

                <button className="map-btn" onClick={() => setShowMap(true)} style={{ maxWidth: '400px', marginTop: '2rem' }}>
                    🗺️ Select on Map
                </button>

                {showMap && (
                    <LocationPicker
                        onConfirm={handleMapSelect}
                        onCancel={() => setShowMap(false)}
                    />
                )}

                {loading && <div className="loading-spinner">{t('loading')}</div>}
            </div>
        );
    }

    return (
        <div className="weather-dashboard">
            <header className="weather-header">
                <div className="location-controls">
                    <span className="location-badge">📍 {weather.location}</span>

                    <div className="mode-toggle">
                        <button
                            className={`toggle-btn ${searchMode === 'current' ? 'active' : ''}`}
                            onClick={() => setSearchMode('current')}
                        >
                            Live Location
                        </button>
                        <button
                            className={`toggle-btn ${searchMode === 'search' ? 'active' : ''}`}
                            onClick={() => setSearchMode('search')}
                        >
                            Search City
                        </button>
                    </div>

                    {searchMode === 'search' ? (
                        <div className="search-box-professional">
                            <input
                                type="text"
                                placeholder="Enter city name..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                            />
                            <button onClick={handleSearch} disabled={loading}>
                                🔍
                            </button>
                        </div>
                    ) : (
                        !locationFetched && (
                            <button className="location-btn-professional" onClick={getLocation} disabled={loading}>
                                {loading ? "Locating..." : "📍 Get Current Location"}
                            </button>
                        )
                    )}

                    <button className="toggle-btn" onClick={() => setShowMap(true)} title="Select on Map">
                        🗺️
                    </button>
                </div>

                {showMap && (
                    <LocationPicker
                        onConfirm={handleMapSelect}
                        onCancel={() => setShowMap(false)}
                    />
                )}
            </header>

            <section className="current-weather">
                <div className="temp-display">
                    <div className="temperature">{weather.temp}°C</div>
                    <div className="condition">{weather.condition}</div>
                </div>

                <div className="details-grid">
                    <div className="detail-item">
                        <span className="detail-label">{t('humidity')}</span>
                        <span className="detail-value">{weather.humidity}%</span>
                    </div>
                    <div className="detail-item">
                        <span className="detail-label">{t('windSpeed')}</span>
                        <span className="detail-value">{weather.windSpeed} km/h</span>
                    </div>
                    <div className="detail-item">
                        <span className="detail-label">Soil Moisture</span>
                        <span className="detail-value">{weather.soilMoisture}%</span>
                    </div>
                </div>
            </section>

            <section className="forecast-section">
                <h3 className="forecast-title">{t('forecast')}</h3>
                <div className="forecast-list">
                    {weather.forecast.map((day, index) => (
                        <div key={index} className="forecast-card">
                            <span className="forecast-day">{day.day}</span>
                            <div className="forecast-temp">{day.temp}°C</div>
                            <div className="forecast-condition">{day.condition}</div>
                            <div className="forecast-rain">💧 {day.rain}mm</div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default WeatherDashboard;
