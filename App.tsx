import { StyleSheet, Text, View } from 'react-native';
import Header from './src/components/Header';

// You can import supported modules from npm
//import  Card  from 'react-native-paper';

// or any files within the Snack

export default function App() {
  return (
    <View style={styles.container}>
     <Header title = "CONTATOS" button = '+'/>
      <Text style={styles.paragraph}>
    
      </Text>
      {/*<Card>
      </Card>*/}
    </View>
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
