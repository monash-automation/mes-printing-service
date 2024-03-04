import { ThemeProvider } from '@/components/theme-provider.tsx';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/*<Auth0Provider*/}
    {/*  domain={import.meta.env.VITE_AUTH0_DOMAIN}*/}
    {/*  clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}*/}
    {/*  authorizationParams={{*/}
    {/*    redirect_uri: window.location.origin,*/}
    {/*    audience: import.meta.env.VITE_AUTH0_AUDIENCE,*/}
    {/*  }}*/}
    {/*>*/}
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <App />
    </ThemeProvider>
    {/*</Auth0Provider>*/}
  </React.StrictMode>,
);
