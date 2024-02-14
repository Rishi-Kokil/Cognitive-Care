import React from 'react';
import { useParams } from 'react-router-dom';

function PatientInfo() {
  const { id } = useParams();

  return (
    <div>PatientInfo
      <p>ID: {id}</p>
      {/* Fetch patient information based on the ID */}
    </div>
  )
}

export default PatientInfo;