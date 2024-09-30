import React, { createContext, useContext, useState } from 'react';
import SomethingWentWrong from '../components/error/SomethingWentWrong';
import NotFound from '../components/error/NotFound';

const ErrorContext = createContext();

export const useError = () => {
  return useContext(ErrorContext);
};

export const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(null);

  if (error) {
    if (error.status !== 404) {
      console.log(error);
      const errorMessage = error.response?.data?.message || error.message || 'Internal error occurred';
      return <SomethingWentWrong errorMessage={errorMessage} />;
    }
    // Else, tell it to render 404.
    return <NotFound />;
  }

  return (
    <ErrorContext.Provider value={{ error, setError }}>
      {children}
    </ErrorContext.Provider>
  );
};