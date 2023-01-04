import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '@rneui/themed';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import AppWrapper from './components/AppWrapper';
import { theme } from './lib/theme';
import RootNavigator from './navigators/RootNavigator';
import { store } from './store';

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <SafeAreaProvider>
            <AppWrapper>
              <RootNavigator />
            </AppWrapper>
          </SafeAreaProvider>
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
