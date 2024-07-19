import { createContext, useContext, useState, useMemo } from 'react';

const MMSEContext = createContext();

const useMMSEContext = () => useContext(MMSEContext);


const MMSEContextWrapper = ({ children }) => {
    const [activeStep, setActiveStep] = useState({}); 
    const [patientResults, setPatientResults] = useState({});

    const getActiveStep = (patientId) => activeStep[patientId] ;

    const updatePatientResults = (patientId, section, result) => {
        setPatientResults(prevResults => ({
            ...prevResults,
            [patientId]: {
                ...prevResults[patientId],
                [section]: result
            }
        }));
    };

    const getPatientResults = (patientId) => patientResults[patientId] || {};

    const contextValue = useMemo(() => ({
        updatePatientResults,
        getPatientResults,
        getActiveStep,
        setActiveStep
    }), [patientResults, activeStep]);

    return (
        <MMSEContext.Provider value={contextValue}>
            {children}
        </MMSEContext.Provider>
    );
};

export { MMSEContextWrapper, useMMSEContext };
