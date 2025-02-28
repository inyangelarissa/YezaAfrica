// API handler functions for Hydroponic Vision app

/**
 * Upload an image to the server
 * @param {File} imageFile - The image file to upload
 * @returns {Promise<Object>} - Upload result
 */
async function uploadImage(imageFile) {
    try {
        console.log("Starting image upload:", imageFile.name);
        
        const formData = new FormData();
        formData.append('image', imageFile);
        
        console.log("Sending POST request to /api/classify");
        const response = await fetch('/api/classify', {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        console.log("Upload response:", result);
        
        if (!response.ok) {
            throw new Error(result.error || 'Failed to upload image');
        }
        
        return result;
    } catch (error) {
        console.error('Error uploading image:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Fetch plant data from the server
 * @param {String} plantType - The plant type to fetch data for
 * @param {Number} confidence - Classification confidence score
 * @returns {Promise<Object>} - Plant data
 */
async function fetchPlantData(plantType, confidence) {
    try {
        // Clean up plant type string
        const cleanPlantType = plantType
            .replace(/\(.*?\)/g, '') // Remove anything in parentheses
            .split(',')[0]           // Take only the first option if multiple
            .trim();
            
        console.log("Fetching plant data for:", cleanPlantType);
        
        const response = await fetch('/api/plant_data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                plant_type: cleanPlantType,
                confidence: confidence
            })
        });
        
        console.log("Plant data response received, status:", response.status);
        
        if (response.status === 500) {
            console.warn("Server error detected, using fallback data");
            return generateFallbackPlantData(cleanPlantType, confidence);
        }
        
        const result = await response.json();
        
        if (!response.ok) {
            console.error("API error:", result.error);
            throw new Error(result.error || 'Failed to fetch plant data');
        }
        
        return result;
    } catch (error) {
        console.error('Error fetching plant data:', error);
        return generateFallbackPlantData(cleanPlantType, confidence);
    }
}

/**
 * Generate fallback plant data when API call fails
 * @param {String} plantType - The plant type
 * @param {Number} confidence - Classification confidence
 * @returns {Object} - Fallback plant data
 */
function generateFallbackPlantData(plantType, confidence) {
    console.log("Generating fallback data for:", plantType);
    
    // Generate basic temperature data for the chart
    const growthStages = [
        "Germination", "Seedling", "Vegetative", "Flowering/Fruiting", "Maturity"
    ];
    
    const graphData = growthStages.map((stage, index) => {
        // Create slight variations for different stages
        const variation = Math.sin(index) * 2;
        
        return {
            stage: stage,
            min_temp: 18 + variation,
            optimal_temp: 21 + variation,
            max_temp: 24 + variation,
            unit: "°C"
        };
    });
    
    return {
        success: true,
        plant_type: plantType,
        confidence: confidence,
        data: {
            summary: `${plantType} is commonly grown in hydroponic systems. In our demo mode, we provide general guidance that applies to most plants.`,
            summary_kinyarwanda: `[DEMO TRANSLATION] ${plantType} ikunze guhingwa muri hydroponics. Muri iyi demo, dutanga inama rusange zikwiye ibimera byinshi.`,
            optimal_conditions: {
                temperature: { min: 18, max: 24, unit: "°C" },
                humidity: { min: 50, max: 70, unit: "%" },
                ph: { min: 5.5, max: 6.5 },
                light: "12-16 hours daily"
            },
            care_tips: [
                `Ensure ${plantType} receives adequate light for healthy growth`,
                "Monitor water levels regularly in hydroponic system",
                "Check pH levels weekly",
                "Ensure good air circulation around plants",
                "Watch for signs of nutrient deficiencies"
            ],
            graph_data: graphData
        },
        notice: "Using demo data due to server error"
    };
}