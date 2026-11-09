import './global.css';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { useState } from 'react';

import { ThemeProvider, useTheme } from './lib/ThemeContext';
import { ScalingProvider } from './lib/ScalingContext';
import { ToastProvider } from './lib/ToastContext';
import { Toaster } from './components/ui/toaster';
import { OnBoard } from './screens/onboard';
import Home from './screens/Home';

function AppContent() {
  const { isDark } = useTheme();
  const [showHome, setShowHome] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: isDark ? '#191919' : '#f7f7f7' }}>
      <StatusBar style={isDark ? "light" : "dark"} />
      {showHome ? (
        <Home />
      ) : (
        <OnBoard onComplete={() => setShowHome(true)} />
      )}
      <Toaster />
    </View>
  );
}

export default function App() {
  return (
    <ScalingProvider>
      <ThemeProvider>
        <ToastProvider>
          <AppContent />
        </ToastProvider>
      </ThemeProvider>
    </ScalingProvider>
  );
}
