import React, { createContext, useContext, useState, useMemo } from 'react';

// Create the context
const MMSEContext = createContext();

// Custom hook to use the MMSE context
const useMMSEContext = () => {
    return useContext(MMSEContext);
}

// Context provider component
const MMSEContextWrapper = ({ children }) => {
    const [activeStep, setActiveStep] = useState({});
    const [patientResults, setPatientResults] = useState({});

    // Function to update test results for a specific patient and section
    const updatePatientResults = (patientId, section, result) => {
        setPatientResults(prevResults => ({
            ...prevResults,
            [patientId]: {
                ...prevResults[patientId],
                [section]: result
            }
        }));
    };

    // Function to get the memoized test results for a specific patient
    const getPatientResults = (patientId) => {
        return patientResults[patientId] || {};
    };

    //getting and setting active sections of each patients
    const getSection = (patientId) => activeStep[patientId];
    const setSection = (patientId, section) => {
        setActiveStep(prevSteps => ({
            ...prevSteps,
            [patientId]: section
        }));
    }

    // Memoize the context value to avoid unnecessary re-renders
    const contextValue = useMemo(() => ({
        updatePatientResults,
        getPatientResults,
        getSection,
        setSection
    }), [patientResults, activeStep]);

    return (
        <MMSEContext.Provider value={contextValue}>
            {children}
        </MMSEContext.Provider>
    );
};

export { MMSEContextWrapper, useMMSEContext };
