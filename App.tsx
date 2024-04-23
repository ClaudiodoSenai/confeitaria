import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Cardapio from './src/Cardapio';
import CadastroProduto from './src/screens/CadastroProduto';
import ClienteCadastro from './src/screens/ClienteCadastro';

const Stack = createStackNavigator();

function App(): React.ReactElement {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Cardapio' component={Cardapio} options={{headerShown: false}}/>
        <Stack.Screen name='CadastroProduto' component={CadastroProduto} options={{headerShown: false}}/>
        <Stack.Screen name='ClienteCadastro' component={ClienteCadastro} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;