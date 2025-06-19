import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';

import { getRoutes } from './routes';
import { store } from './store';
import { Provider } from 'react-redux';


function AppRoutes() {
  return useRoutes(getRoutes());
}

const App: React.FC = () => {

  return (
    <Router>
      <Provider store={store}>
        <Suspense fallback={<div>
            <div className="flex items-center justify-center h-screen">
              <div className="w-12 h-12 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
            </div>
          </div>}>
          <AppRoutes />
        </Suspense>
      </Provider>
    </Router>
  );
}

export default App;
