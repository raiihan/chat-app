import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContexProvider } from './context/AuthContex';
import { ChatContexProvider } from './context/ChatContex';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContexProvider>
      <ChatContexProvider>
        <App />
      </ChatContexProvider>
    </AuthContexProvider>
  </React.StrictMode>
);
