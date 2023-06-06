import React, { useState, createContext, useContext } from 'react';
import Calculator from '../components/Calculator';


export const CalculatorResultsContext = createContext();

export function useCalculatorResults() {
  return useContext(CalculatorResultsContext);
}

export function CalculatorResultsProvider({ children }) {
  const [results, setResults] = useState({});

  const value = {
    results,
    setResults,
  };

  return (
    <CalculatorResultsContext.Provider value={value}>
    
      {children}
    </CalculatorResultsContext.Provider>
  );
}
