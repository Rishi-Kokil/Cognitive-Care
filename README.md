# Cognitive Care: Alzheimer's Disease Detection Platform

Cognitive Care is a web-based platform designed to assist in the detection of Alzheimer's Disease. It provides a user-friendly interface for doctors and caregivers to upload MRI scans and analyze them using an AI-powered detection model. The platform aims to streamline the diagnosis process and provide valuable insights to healthcare professionals.

## Features

- **User Authentication**: Secure authentication for doctors and caregivers.
- **Patient Management**: Create, update, and manage patient profiles with medical records and MRI scans.
- **AI-powered Detection**: Upload MRI scans and leverage the AI model for Alzheimer's disease detection.
- **Result Analysis**: View detailed analysis reports and detection results for each patient.
- **MMSE Test Integration**: Integrate Mini-Mental State Examination (MMSE) test scores for comprehensive patient assessment.

## Tech Stack

**FrontEnd**
- React
- TailwindCSS

**Backend**
- Node.js
- Express.js
- Flask (for AI model integration)

## Getting Started

To run this project locally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/your-repo/cognitive-care.git
```

2. Navigate to the project directory:

```bash
cd cognitive-care
```

3. Install the dependencies for the client and server:

```bash
# Install client dependencies
cd Frontend
npm install

# Install server dependencies
cd Backend
npm install
```

4. Create a `.env` file in the server directory and add the following environment variables:

```
MONGODB_URI=<your-mongodb-uri>
SECRET_ADMIN_KEY=<your-secret-admin-key>
SECRET_USER_KEY=<your-secret-user-key>
SECRET_DOCTOR_KEY=<your-secret-doctor-key>
```

5. Start the development server:

```bash
# Start the client
cd Frontend
npm run dev

# Start the server
cd Backend
npm run backend

#Start Flask Server
cd Model/Model-Backend
env/scripts/activate
python app.py
```

## Members

- Amit Murkalmath 
- Rishi Kokil
- Pavan Thakur
- Ilham Syed
