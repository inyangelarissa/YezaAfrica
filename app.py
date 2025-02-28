from flask import Flask, render_template, request, jsonify
import os
import base64
from werkzeug.utils import secure_filename
from utils.wolfram import get_plant_data
from utils.translate import translate_text
import config

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'static/uploads'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max upload size

# Create uploads directory if it doesn't exist
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/classify', methods=['POST'])
def classify():
    """
    Endpoint to handle image upload and classification
    The actual classification is done client-side with MobileNet
    """
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400

    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No image selected'}), 400

    # Save the uploaded image
    filename = secure_filename(file.filename)
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(filepath)

    # Return the image path for display
    return jsonify({
        'success': True,
        'image_path': filepath
    })

@app.route('/api/plant_data', methods=['POST'])
def get_plant_info():
    """
    Endpoint to fetch plant data from Wolfram Alpha API
    """
    data = request.json
    if not data or 'plant_type' not in data:
        return jsonify({'error': 'Plant type not provided'}), 400

    plant_type = data['plant_type']
    confidence = data.get('confidence', 0.0)

    try:
        # Get plant data from Wolfram Alpha
        print(f"Getting plant data for: {plant_type}")
        plant_data = get_plant_data(plant_type)
        
        # Translate the plant summary to Kinyarwanda
        if plant_data and plant_data.get('summary'):
            plant_data['summary_kinyarwanda'] = translate_text(
                plant_data['summary'], 
                target_language='rw'
            )
        
        return jsonify({
            'success': True,
            'plant_type': plant_type,
            'confidence': confidence,
            'data': plant_data
        })
    except Exception as e:
        import traceback
        error_details = traceback.format_exc()
        print(f"Error in /api/plant_data: {e}")
        print(error_details)
        
        # Return a simplified error response with demo data as fallback
        from utils.wolfram import get_demo_plant_data
        fallback_data = get_demo_plant_data(plant_type)
        
        return jsonify({
            'success': True,  # Return success to prevent frontend errors
            'plant_type': plant_type,
            'confidence': confidence,
            'data': fallback_data,
            'notice': 'Using demo data due to an error processing your request'
        })

# For Flask CLI compatibility
def create_app():
    return app

if __name__ == '__main__':
    print(f"Starting Hydroponic Vision app. Visit http://127.0.0.1:5000 in your browser.")
    app.run(debug=True, host='0.0.0.0', port=5000)