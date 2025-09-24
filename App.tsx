import { StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CriarContato from './src/pages/CriarContato';
import Home from './src/pages/Home';
import EditarContato from './src/pages/EditarContato';
import { useEffect } from 'react';
import { getDBConnection, createTable } from './src/db/db-services';


export type RootRoutesStack = {
  Home: undefined;
  CriarContato: undefined;
  EditarContato: {contatoId: number};
};

const Stack = createNativeStackNavigator<RootRoutesStack>(); 

export default function App() {
  
  useEffect(() => {
    (async () => {
      const db = await getDBConnection();
      await createTable(db);
    })();
  }, []);

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name='Home' component={Home} />
          <Stack.Screen name='CriarContato' component={CriarContato} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#74ADF2',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
