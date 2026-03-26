import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './i18n';
import { ThemeProvider } from './context/ThemeContext';
import { DataProvider } from './context/DataContext';

import { ConfigProvider } from 'antd';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <DataProvider>
        <ConfigProvider 
          theme={{ 
            token: { 
              colorPrimary: '#55b9f3',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              borderRadius: 20,
              colorBgContainer: 'transparent',
              colorBorder: 'transparent',
              boxShadow: 'none',
            } 
          }}
        >
          <App />
        </ConfigProvider>
      </DataProvider>
    </ThemeProvider>
  </StrictMode>,
)
