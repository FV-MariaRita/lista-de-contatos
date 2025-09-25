import { StyleSheet, Text, View, ScrollView, FlatList  } from "react-native";
import Header from "../components/Header";
import { SafeAreaView} from "react-native-safe-area-context";
import { useState, useCallback, useEffect } from "react";
import { Contato } from "../models/contato";
import { getContatos} from "../db/db-services";
import { ContatoCardComponent } from "../components/ContatoCard";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootRoutesStack } from '../../App';


export default function Home() {

    type NavigationProp = NativeStackNavigationProp<RootRoutesStack, 'Home'>;
    const navigation = useNavigation<NavigationProp>();

    const [contatos, setContatos] = useState<Contato[]>([]);

    const loadDataCallback = useCallback( async () => {
        const storedContatos = await getContatos(); 
        if (storedContatos && storedContatos.length > 0) {
            setContatos(storedContatos);
            return;
        }
        else {
            console.log("Erro no get dos contatos")
        }
    }, []);

    useEffect(() => {
        loadDataCallback();
    }, [loadDataCallback]);
    
    return (
        <>
            <SafeAreaView style={styles.container}>
                <ScrollView contentInsetAdjustmentBehavior="automatic">
                    <View>
                        <Header />
                    </View>
                    <View>
                        {contatos.map((contato) => (
                            <ContatoCardComponent 
                                key={contato.id} 
                                contato={contato} 
                                handleEditar={() => navigation.navigate('EditarContato', {contato})}
                                handleRefresh={() => loadDataCallback()} 
                            />
                        ))}

                        {/*}
                        <FlatList
                            data={contatos}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({item}) => (
                                <ContatoCardComponent 
                                    key={item.id} 
                                    contato={item} 
                                    handleEditar={() => navigation.navigate('EditarContato', {contatoId: item.id!})}
                                    handleRefresh={() => loadDataCallback()} 
                                />
                            )}
                        />  */}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
};

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