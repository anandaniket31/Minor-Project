async function verifyApi() {
    try {
        // Test Crop API
        console.log('Testing Crop API...');
        const cropRes = await fetch('http://localhost:5000/api/crops', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nitrogen: 90,
                phosphorus: 40,
                potassium: 40,
                ph: 6.5,
                rainfall: 200,
                recommendedCrop: 'Rice'
            })
        });

        const cropText = await cropRes.text();
        try {
            const cropData = JSON.parse(cropText);
            console.log('Crop API Response:', cropData);
            if (cropRes.status === 201) {
                console.log('✅ Crop API working');
            } else {
                console.error('❌ Crop API failed with status:', cropRes.status);
            }
        } catch (e) {
            console.error('❌ Failed to parse JSON. Raw response:', cropText);
        }

        // Test Pest API
        console.log('\nTesting Pest API...');
        const pestRes = await fetch('http://localhost:5000/api/pests', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                detectedDisease: 'Late Blight',
                confidence: '95%',
                treatment: 'Fungicide'
            })
        });

        const pestText = await pestRes.text();
        try {
            const pestData = JSON.parse(pestText);
            console.log('Pest API Response:', pestData);
            if (pestRes.status === 201) {
                console.log('✅ Pest API working');
            } else {
                console.error('❌ Pest API failed with status:', pestRes.status);
            }
        } catch (e) {
            console.error('❌ Failed to parse JSON. Raw response:', pestText);
        }

    } catch (error) {
        console.error('❌ Verification failed:', error);
    }
}

verifyApi();
