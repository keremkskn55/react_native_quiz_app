import React from 'react';
import { NavigationContainer  } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import {Store} from './redux/store';
import Login from './screens/Login';
import Register from './screens/Register';
import Loading from './screens/Loading';
import Home from './screens/Home';
import Question from './screens/Question';
import Result from './screens/Result';
import Arrangement from './screens/Arrangement';

const Stack = createNativeStackNavigator();

const App = () => {
  return(
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName='Loading'
        >
          <Stack.Screen name="Loading" component={Loading}/>
          <Stack.Screen name="Login" component={Login}/>
          <Stack.Screen name="Register" component={Register}/>
          <Stack.Screen name="Home" component={Home}/>
          <Stack.Screen name="Question" component={Question}/>
          <Stack.Screen name="Result" component={Result}/>
          <Stack.Screen name="Arrangement" component={Arrangement}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;