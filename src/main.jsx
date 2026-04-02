import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './i18n';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { ConfigProvider } from 'antd';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
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
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  // </StrictMode>,
)