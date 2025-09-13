import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorBoundary from './ErrorBoundary';
import './index.css';

console.log('[Cointoss] Bootstrapping build at', new Date().toISOString(), 'ENV=', process.env.NODE_ENV);

const rootEl = document.getElementById('root');
if (!rootEl) {
  console.error('Root element #root not found');
}
const root = ReactDOM.createRoot(rootEl);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);





