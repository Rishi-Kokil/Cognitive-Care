from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array
from PIL import Image
import numpy as np
import io

app = Flask(__name__)

# Load the pre-trained Keras model
model = load_model('cnn-model2 (1).h5')  # Replace with the actual path to your model

# Define a function to preprocess the image before making predictions
def preprocess_image(image_data, image_size=(150, 150)):
    image = Image.open(io.BytesIO(image_data))
    image = image.resize(image_size)
    
    # Ensure the image has three channels (RGB)
    if image.mode != 'RGB':
        image = image.convert('RGB')

    image_array = img_to_array(image)
    image_array = np.expand_dims(image_array, axis=0)
    image_array /= 255.0
    return image_array

# Define a route for receiving image and making predictions
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get the image data from the request
        image_data = request.files['image'].read()
        # Preprocess the image
        preprocessed_image = preprocess_image(image_data)

        # Make predictions using the loaded model
        predictions = model.predict(preprocessed_image)

        prediction_probability = predictions[0, 0]

        # Assuming binary classification, you can customize this based on your model output
        prediction_result = "Non-Alzheimers" if predictions[0, 0] > 0.5 else "Alzheimers"

        return jsonify({'result': prediction_result,'accuracy': float(prediction_probability)})

    except Exception as e:
        print(str(e))
        return jsonify({'error': 'Error processing the image'}), 500

if __name__ == '__main__':
    app.run(debug=True)
