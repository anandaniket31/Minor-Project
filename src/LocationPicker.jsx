import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

function LocationMarker({ onLocationSelect }) {
    const [position, setPosition] = useState(null);

    const map = useMapEvents({
        click(e) {
            setPosition(e.latlng);
            onLocationSelect(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
        },
    });

    return position === null ? null : (
        <Marker position={position}></Marker>
    );
}

function LocationPicker({ onConfirm, onCancel }) {
    const [selectedLocation, setSelectedLocation] = useState(null);

    return (
        <div className="location-picker-overlay">
            <div className="location-picker-modal">
                <h3>Select Location</h3>
                <p>Click on the map to pin a location</p>

                <div className="map-wrapper">
                    <MapContainer
                        center={[20.5937, 78.9629]} // Default to India
                        zoom={5}
                        style={{ height: '100%', width: '100%' }}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <LocationMarker onLocationSelect={setSelectedLocation} />
                    </MapContainer>
                </div>

                <div className="picker-actions">
                    <button className="cancel-btn" onClick={onCancel}>Cancel</button>
                    <button
                        className="confirm-btn"
                        disabled={!selectedLocation}
                        onClick={() => onConfirm(selectedLocation)}
                    >
                        Confirm Location
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LocationPicker;
