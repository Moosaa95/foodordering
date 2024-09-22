import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AppRoutes from '@/AppRoutes';
import { Toaster } from 'sonner';
import { makeStore } from './redux/app/store';

const ApiWrapper: React.FC = () => {
  return (
      <Provider store={makeStore()}>
        <Router>
          <Routes>
            <Route path='/*' element={<AppRoutes />} />
          </Routes>
          <Toaster visibleToasts={1} position='top-right' richColors />
        </Router>
      </Provider>
  );
};

export default ApiWrapper;
