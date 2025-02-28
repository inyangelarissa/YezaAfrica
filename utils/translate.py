import requests
import config
import json

def translate_text(text, target_language='rw'):
    """
    Translate text using Google Translate API
    
    Args:
        text (str): Text to translate
        target_language (str): Target language code (default: 'rw' for Kinyarwanda)
        
    Returns:
        str: Translated text
    """
    api_key = config.GOOGLE_TRANSLATE_API_KEY
    
    # If no API key is provided, return a mock translation for demonstration
    if api_key == "YOUR_GOOGLE_TRANSLATE_API_KEY":
        return mock_translate(text, target_language)
    
    url = f"https://translation.googleapis.com/language/translate/v2?key={api_key}"
    
    payload = {
        'q': text,
        'target': target_language,
        'format': 'text'
    }
    
    try:
        response = requests.post(url, data=payload)
        response.raise_for_status()
        
        result = response.json()
        translated_text = result['data']['translations'][0]['translatedText']
        
        return translated_text
        
    except requests.exceptions.RequestException as e:
        # If the API call fails, return the original text with a note
        return mock_translate(text, target_language)

def mock_translate(text, target_language):
    """
    Provide a mock translation for demonstration purposes
    
    Args:
        text (str): Text to "translate"
        target_language (str): Target language code
        
    Returns:
        str: "Translated" text with a note
    """
    # For demonstration, we'll just add a note explaining this is a mock translation
    if target_language == 'rw':  # Kinyarwanda
        return f"[IGERERANYA CY'UBUHINDUZI: {text}]\n\n(Ibi ni igereranya. Mushyire urufunguzo rw'API ya Google Translate kugira ngo mubone ubuhinduzi nyakuri.)"
    else:
        return f"[MOCK TRANSLATION: {text}]\n\n(This is a demonstration. Set your Google Translate API key to see actual translations.)"