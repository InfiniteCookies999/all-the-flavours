import React, { createContext, useContext, useState } from 'react';
import SomethingWentWrong from '../components/error/SomethingWentWrong';

const ErrorContext = createContext();

export const useError = () => {
  return useContext(ErrorContext);
};

export const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(null);

  if (error) {
    console.log(error);
    const errorMessage = error.response?.data?.message || error.message || 'Internal error occurred';
    return <SomethingWentWrong errorMessage={errorMessage} />;
  }

  return (
    <ErrorContext.Provider value={{ setError }}>
      {children}
    </ErrorContext.Provider>
  );
};