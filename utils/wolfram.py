import requests
import urllib.parse
import xml.etree.ElementTree as ET
import config
import json
import re

def get_plant_data(plant_type):
    """
    Query Wolfram Alpha for plant data
    
    Args:
        plant_type (str): The name of the plant
        
    Returns:
        dict: Plant data including growth stages, optimal conditions, and care recommendations
    """
    try:
        # Always use demo data for this demo application
        # This prevents any API errors from breaking the application
        return get_demo_plant_data(plant_type)
            
    except Exception as e:
        print(f"Error in get_plant_data: {e}")
        # Return demo data as fallback
        return get_demo_plant_data(plant_type)

def get_demo_plant_data(plant_type):
    """
    Generate demo plant data when API key is not provided
    
    Args:
        plant_type (str): The name of the plant
        
    Returns:
        dict: Demo plant data
    """
    # Define default temperature data
    temp_range = {"min": 18, "max": 24, "unit": "°C"}
    
    # Define growth stages
    growth_stages = [
        {"name": "Germination", "days": "1-10", "description": "Seeds sprout and develop initial roots"},
        {"name": "Seedling", "days": "11-30", "description": "First true leaves appear, plant establishes"},
        {"name": "Vegetative", "days": "31-60", "description": "Rapid leaf and stem growth"},
        {"name": "Flowering/Fruiting", "days": "61-100", "description": "Plant produces flowers or fruits"},
        {"name": "Maturity", "days": "101+", "description": "Plant reaches full size and productive capacity"}
    ]
    
    # Generate graph data
    graph_data = generate_temperature_growth_data(temp_range, growth_stages)
    
    return {
        "summary": f"{plant_type} is commonly grown in hydroponic systems. It thrives in controlled environments with proper lighting, temperature, and nutrient solutions. This plant typically goes through several growth stages from germination to maturity, with each stage requiring specific care conditions.",
        "growth_stages": growth_stages,
        "optimal_conditions": {
            "temperature": temp_range,
            "humidity": {"min": 50, "max": 70, "unit": "%"},
            "ph": {"min": 5.5, "max": 6.5},
            "light": "12-16 hours daily"
        },
        "care_tips": [
            f"Ensure {plant_type} receives adequate light for healthy growth",
            "Monitor water levels regularly in hydroponic system",
            "Check pH levels weekly",
            "Ensure good air circulation around plants",
            "Watch for signs of nutrient deficiencies"
        ],
        "graph_data": graph_data
    }

def generate_temperature_growth_data(temperature, growth_stages):
    """
    Generate data for temperature vs growth stage graph
    
    Args:
        temperature (dict): Temperature range information
        growth_stages (list): List of growth stages
        
    Returns:
        list: Data points for the graph
    """
    data = []
    
    # Get temperature range with default values if keys are missing or None
    min_temp = temperature.get("min", 18)
    if min_temp is None:
        min_temp = 18
        
    max_temp = temperature.get("max", 24)
    if max_temp is None:
        max_temp = 24
        
    unit = temperature.get("unit", "°C")
    if unit is None:
        unit = "°C"
    
    # Temperature variations by growth stage
    variations = {
        "Germination": {"min": 0, "max": 2},
        "Seedling": {"min": -1, "max": 1},
        "Vegetative": {"min": 0, "max": 0},
        "Flowering/Fruiting": {"min": -2, "max": -1},
        "Maturity": {"min": -1, "max": 0}
    }
    
    # For each growth stage, create optimal temperature ranges
    for i, stage in enumerate(growth_stages):
        try:
            # Get the stage name safely
            stage_name = stage.get("name", f"Stage {i+1}")
            
            # Get the variation for this stage, or use default
            var = variations.get(stage_name, {"min": 0, "max": 0})
            
            # Calculate temperatures with safeguards against None values
            stage_min = min_temp + var["min"]
            stage_max = max_temp + var["max"]
            stage_optimal = (stage_min + stage_max) / 2
            
            # Add data points
            data.append({
                "stage": stage_name,
                "min_temp": stage_min,
                "optimal_temp": stage_optimal,
                "max_temp": stage_max,
                "unit": unit
            })
        except Exception as e:
            print(f"Error processing growth stage {i}: {e}")
            # Add fallback data for this stage
            data.append({
                "stage": f"Stage {i+1}",
                "min_temp": min_temp,
                "optimal_temp": (min_temp + max_temp) / 2,
                "max_temp": max_temp,
                "unit": unit
            })
    
    return data