import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Main from './screens/Main';
import Login from './screens/Login';
import Create from './screens/Create';

const Stack = createStackNavigator();

function NavStack() {
  return (
     <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#621FF7',
          },
          headerTintColor: '#fff',
          headerTitleStyle :{
            fontWeight: 'bold',
          },
        }}
      >
      <Stack.Screen 
        name="Login" 
        component={Login} 
        options={{ title: 'Login' }}
      />
      <Stack.Screen 
        name="Main" 
        component={Main} 
        options={{ title: 'Main' }}
      />
      <Stack.Screen 
      	name="Create" 
      	component={Create} 
      	options={{ title: 'Create' }}
    />
      </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <NavStack />
    </NavigationContainer>
  );
}

console.disableYellowBox = true;