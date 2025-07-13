import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PostHogProvider } from 'posthog-js/react'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PostHogProvider apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY} options={
      {
        api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
        defaults: '2025-05-24',
        capture_dead_clicks: true,
        autocapture: true,
        capture_pageview: true,
        capture_pageleave: true,
        capture_performance: true,
        capture_exceptions: true,
        capture_heatmaps: true
      }
    }>
      <App />
    </PostHogProvider>
  </StrictMode>,
);

