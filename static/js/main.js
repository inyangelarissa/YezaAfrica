// Main JavaScript file for Hydroponic Vision app

document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded - initializing app");
    // Initialize the app
    initApp();
    
    // Debug logging for libraries
    console.log("TensorFlow available:", typeof tf !== 'undefined');
    console.log("MobileNet available:", typeof mobilenet !== 'undefined');
});

/**
 * Initialize the application 
 */
function initApp() {
    // Elements
    const uploadBtn = document.getElementById('uploadBtn');
    const imageUpload = document.getElementById('imageUpload');
    const previewImage = document.getElementById('previewImage');
    const uploadStatus = document.getElementById('uploadStatus');
    
    console.log("Elements found:", {
        uploadBtn: !!uploadBtn,
        imageUpload: !!imageUpload,
        previewImage: !!previewImage,
        uploadStatus: !!uploadStatus
    });
    
    // Initialize the plant classifier
    initClassifier().then(() => {
        console.log('MobileNet classifier initialized successfully');
    }).catch(error => {
        console.error('Error initializing classifier:', error);
    });

    // Handle file selection for preview
    imageUpload.addEventListener('change', function() {
        console.log("File input changed");
        if (this.files && this.files[0]) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                previewImage.src = e.target.result;
                console.log("Image preview updated");
                
                // Reset previous results
                resetResults();
            };
            
            reader.readAsDataURL(this.files[0]);
        }
    });

    // Handle upload and analysis button click
    uploadBtn.addEventListener('click', async function() {
        console.log("Upload button clicked");
        
        if (!imageUpload.files || !imageUpload.files[0]) {
            console.log("No file selected");
            alert('Please select an image first');
            return;
        }
        
        console.log("Processing file:", imageUpload.files[0].name);

        // Show upload status
        uploadStatus.classList.remove('d-none');
        uploadBtn.disabled = true;
        
        try {
            // Upload the image
            console.log("Uploading image...");
            const uploadResult = await uploadImage(imageUpload.files[0]);
            console.log("Upload result:", uploadResult);
            
            if (uploadResult.success) {
                // Classify the image
                console.log("Classifying image...");
                const classificationResult = await classifyImage(previewImage);
                console.log("Classification result:", classificationResult);
                
                // Display classification results
                displayClassificationResults(classificationResult);
                
                // Fetch plant data
                if (classificationResult && classificationResult.topMatch) {
                    console.log("Fetching plant data for:", classificationResult.topMatch.className);
                    const plantData = await fetchPlantData(
                        classificationResult.topMatch.className,
                        classificationResult.topMatch.probability
                    );
                    console.log("Plant data received:", plantData);
                    
                    // Display plant data
                    displayPlantData(plantData);
                    
                    // Generate temperature chart
                    if (plantData.data && plantData.data.graph_data) {
                        console.log("Creating temperature chart");
                        createTemperatureChart(plantData.data.graph_data);
                    }
                }
            } else {
                console.error("Upload failed:", uploadResult.error);
                alert('Error uploading image: ' + uploadResult.error);
            }
        } catch (error) {
            console.error('Error during analysis:', error);
            alert('An error occurred during analysis. Please try again.');
        } finally {
            // Hide upload status
            uploadStatus.classList.add('d-none');
            uploadBtn.disabled = false;
            console.log("Processing complete");
        }
    });
    
    console.log("Event listeners attached");
}

/**
 * Reset all result displays
 */
function resetResults() {
    console.log("Resetting results");
    
    // Clear classification results
    document.getElementById('classificationResult').innerHTML = 
        '<p class="text-center text-muted">Plant classification will appear here after image upload</p>';
    
    // Clear plant data
    document.getElementById('plantData').innerHTML = 
        '<p class="text-center text-muted">Plant data will appear here after classification</p>';
    
    // Hide sections
    document.getElementById('plantSummary').classList.add('d-none');
    document.getElementById('kinyarwandaTranslation').classList.add('d-none');
    document.getElementById('optimalConditions').classList.add('d-none');
    document.getElementById('careTips').classList.add('d-none');
    
    // Clear chart
    const chartContext = document.getElementById('temperatureChart').getContext('2d');
    if (window.temperatureChart) {
        window.temperatureChart.destroy();
    }
}

/**
 * Display classification results
 * @param {Object} results - Classification results from MobileNet
 */
function displayClassificationResults(results) {
    console.log("Displaying classification results");
    
    const classificationResult = document.getElementById('classificationResult');
    
    if (!results || !results.topMatch) {
        classificationResult.innerHTML = `
            <div class="alert alert-warning">
                Unable to classify the plant. Please try another image.
            </div>
        `;
        return;
    }
    
    // Format the class name (remove parts in parentheses for cleaner display)
    let className = results.topMatch.className;
    className = className.replace(/\(.*?\)/g, '').trim();
    // Replace commas with line breaks for multiple possibilities
    className = className.replace(/,/g, '<br>');
    
    // Calculate confidence percentage
    const confidence = Math.round(results.topMatch.probability * 100);
    
    // Create HTML for classification result
    let html = `
        <div class="text-center mb-3">
            <div class="plant-type">${className}</div>
            <div class="mt-2">Confidence: ${confidence}%</div>
            <div class="confidence-bar">
                <div class="confidence-level" style="width: ${confidence}%"></div>
            </div>
        </div>
    `;
    
    // Add top 3 alternatives if they exist
    if (results.alternatives && results.alternatives.length > 0) {
        html += `<div class="mt-3"><small class="text-muted">Alternative matches:</small><ul class="small">`;
        
        results.alternatives.forEach(match => {
            const altClassName = match.className.replace(/\(.*?\)/g, '').trim();
            const altConfidence = Math.round(match.probability * 100);
            html += `<li>${altClassName} (${altConfidence}%)</li>`;
        });
        
        html += `</ul></div>`;
    }
    
    classificationResult.innerHTML = html;
}

/**
 * Display plant data from Wolfram API
 * @param {Object} plantData - Plant data from the API
 */
function displayPlantData(plantData) {
    console.log("Displaying plant data");
    
    if (!plantData || !plantData.data) {
        document.getElementById('plantData').innerHTML = `
            <div class="alert alert-warning">
                Unable to fetch plant data. Please try again.
            </div>
        `;
        return;
    }
    
    // Clear the loading message
    document.getElementById('plantData').innerHTML = '';
    
    // Display plant summary
    const summaryElement = document.getElementById('plantSummary');
    const summaryText = document.getElementById('summaryText');
    
    if (plantData.data.summary) {
        summaryText.textContent = plantData.data.summary;
        summaryElement.classList.remove('d-none');
    }
    
    // Display Kinyarwanda translation
    const translationElement = document.getElementById('kinyarwandaTranslation');
    const translationText = document.getElementById('translationText');
    
    if (plantData.data.summary_kinyarwanda) {
        translationText.textContent = plantData.data.summary_kinyarwanda;
        translationElement.classList.remove('d-none');
    }
    
    // Display optimal conditions
    const conditionsElement = document.getElementById('optimalConditions');
    const conditionsList = document.getElementById('conditionsList');
    
    if (plantData.data.optimal_conditions) {
        const conditions = plantData.data.optimal_conditions;
        
        conditionsList.innerHTML = '';
        
        // Temperature
        if (conditions.temperature && conditions.temperature.min !== null && conditions.temperature.max !== null) {
            const tempItem = document.createElement('li');
            tempItem.textContent = `Temperature: ${conditions.temperature.min} to ${conditions.temperature.max} ${conditions.temperature.unit}`;
            conditionsList.appendChild(tempItem);
        }
        
        // Humidity
        if (conditions.humidity && conditions.humidity.min !== null && conditions.humidity.max !== null) {
            const humidityItem = document.createElement('li');
            humidityItem.textContent = `Humidity: ${conditions.humidity.min} to ${conditions.humidity.max} ${conditions.humidity.unit}`;
            conditionsList.appendChild(humidityItem);
        }
        
        // pH
        if (conditions.ph && conditions.ph.min !== null && conditions.ph.max !== null) {
            const phItem = document.createElement('li');
            phItem.textContent = `pH: ${conditions.ph.min} to ${conditions.ph.max}`;
            conditionsList.appendChild(phItem);
        }
        
        // Light
        if (conditions.light) {
            const lightItem = document.createElement('li');
            lightItem.textContent = `Light: ${conditions.light}`;
            conditionsList.appendChild(lightItem);
        }
        
        conditionsElement.classList.remove('d-none');
    }
    
    // Display care tips
    const tipsElement = document.getElementById('careTips');
    const tipsList = document.getElementById('tipsList');
    
    if (plantData.data.care_tips && plantData.data.care_tips.length > 0) {
        tipsList.innerHTML = '';
        
        plantData.data.care_tips.forEach(tip => {
            const tipItem = document.createElement('li');
            tipItem.textContent = tip;
            tipsList.appendChild(tipItem);
        });
        
        tipsElement.classList.remove('d-none');
    }
}