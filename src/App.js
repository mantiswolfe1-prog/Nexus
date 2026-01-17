import React, { Component, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Landing from './PagesDisplay/Landing.js';
import Consent from './PagesDisplay/Consent.js';
import Auth from './PagesDisplay/Auth.js';
import RegularDashboard from './PagesDisplay/RegularDashboard.js';
import AdminDashboard from './PagesDisplay/AdminDashboard.js';
import Settings from './PagesDisplay/Settings.js';
import Updates from './PagesDisplay/Updates.js';
import Analytics from './PagesDisplay/Analytics.js';
import HabitTracker from './PagesDisplay/HabitTracker.js';
import UserAnalytics from './PagesDisplay/UserAnalytics.js';
import Games from './PagesDisplay/Games.js';
import StudyTools from './PagesDisplay/StudyTools.js';
import Music from './PagesDisplay/Music.js';
import Videos from './PagesDisplay/Videos.js';
import Browser from './PagesDisplay/Browser.js';
import Social from './PagesDisplay/Social.js';
import Utilities from './PagesDisplay/Utilities.js';
import Backgrounds from './PagesDisplay/Backgrounds.js';
import Privacy from './PagesDisplay/Privacy.js';
import Launcher from './PagesDisplay/Launcher.js';
import AccessibilityProvider from './Components/Accessibility/AccessibilityProvider.js';
import FakeErrorScreen from './Components/FakeErrorScreen/FakeErrorScreen.js';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', color: 'white', background: '#0a0a0f', minHeight: '100vh' }}>
          <h1>Something went wrong</h1>
          <pre style={{ color: '#ff6b6b', whiteSpace: 'pre-wrap' }}>
            {this.state.error?.toString()}
          </pre>
          <button onClick={() => window.location.reload()} style={{ marginTop: '20px', padding: '10px 20px' }}>
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  const [showErrorScreen, setShowErrorScreen] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.has('embedded');
  });

  // If error screen is showing, don't render the app at all
  if (showErrorScreen) {
    return (
      <ErrorBoundary>
        <AccessibilityProvider>
          <FakeErrorScreen onDismiss={() => setShowErrorScreen(false)} />
        </AccessibilityProvider>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <AccessibilityProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/launcher" element={<Launcher />} />
              <Route path="/landing" element={<Landing />} />
              <Route path="/consent" element={<Consent />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/dashboard" element={<RegularDashboard />} />
              <Route path="/admindashboard" element={<AdminDashboard />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/updates" element={<Updates />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/habits" element={<HabitTracker />} />
              <Route path="/useranalytics" element={<UserAnalytics />} />
              <Route path="/games" element={<Games />} />
              <Route path="/studytools" element={<StudyTools />} />
              <Route path="/music" element={<Music />} />
              <Route path="/videos" element={<Videos />} />
              <Route path="/browser" element={<Browser />} />
              <Route path="/social" element={<Social />} />
              <Route path="/utilities" element={<Utilities />} />
              <Route path="/backgrounds" element={<Backgrounds />} />
              <Route path="/privacy" element={<Privacy />} />
            </Routes>
          </Layout>
        </Router>
      </AccessibilityProvider>
    </ErrorBoundary>
  );
}

export default App;