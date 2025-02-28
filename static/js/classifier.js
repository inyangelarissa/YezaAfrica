// Plant classifier using TensorFlow.js and MobileNet

let model;

/**
 * Initialize the MobileNet classifier
 * @returns {Promise} - Promise that resolves when the model is loaded
 */
async function initClassifier() {
    try {
        console.log("Starting MobileNet model initialization");
        
        // Check if mobilenet is available
        if (typeof mobilenet === 'undefined') {
            console.error("MobileNet library not available. Check if the script is loaded properly.");
            throw new Error("MobileNet library not available");
        }
        
        // Load MobileNet model
        model = await mobilenet.load();
        console.log('MobileNet model loaded successfully:', model);
        return model;
    } catch (error) {
        console.error('Error loading MobileNet model:', error);
        throw error;
    }
}

/**
 * Classify an image using MobileNet
 * @param {HTMLImageElement} imageElement - The image element to classify
 * @param {Number} topK - Number of top predictions to return
 * @returns {Object} - Classification results
 */
async function classifyImage(imageElement, topK = 5) {
    console.log("Starting image classification");
    
    if (!model) {
        console.warn("Model not initialized. Attempting to initialize now...");
        try {
            await initClassifier();
        } catch (error) {
            console.error("Failed to initialize model on-demand:", error);
            throw new Error('Model not initialized and failed to initialize on-demand');
        }
    }
    
    try {
        // Check if the image is loaded properly
        if (imageElement.naturalWidth === 0 || imageElement.naturalHeight === 0) {
            console.error("Image has not loaded properly");
            throw new Error("Image has not loaded properly");
        }
        
        console.log("Running classification with MobileNet");
        
        // Run classification
        const predictions = await model.classify(imageElement, topK);
        console.log("Raw predictions:", predictions);
        
        // Filter for plant-related classes
        const plantPredictions = predictions.filter(pred => 
            isPlantClass(pred.className)
        );
        console.log("Plant-filtered predictions:", plantPredictions);
        
        // If no plant classes were found, return the original predictions
        const results = plantPredictions.length > 0 ? plantPredictions : predictions;
        
        // Format the results
        return {
            topMatch: results[0],
            alternatives: results.slice(1, 4), // Return up to 3 alternatives
            allPredictions: results
        };
    } catch (error) {
        console.error('Error classifying image:', error);
        throw error;
    }
}

/**
 * Check if a class name is related to plants
 * @param {String} className - The class name to check
 * @returns {Boolean} - True if it's a plant-related class
 */
function isPlantClass(className) {
    // List of keywords that indicate plant-related classes
    const plantKeywords = [
        'plant', 'tree', 'flower', 'herb', 'vegetable', 'fruit',
        'leaf', 'garden', 'shrub', 'vine', 'seedling', 'sprout',
        'bush', 'crop', 'weed', 'grass', 'moss', 'fern', 'orchid',
        'lily', 'rose', 'tulip', 'daisy', 'sunflower', 'blossom',
        'berry', 'tomato', 'lettuce', 'cucumber', 'pepper', 'spinach'
    ];
    
    // Check if the class name contains any plant keywords
    const isPlant = plantKeywords.some(keyword => 
        className.toLowerCase().includes(keyword)
    );
    
    console.log(`Class "${className}" is${isPlant ? '' : ' not'} plant-related`);
    return isPlant;
}