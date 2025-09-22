import { StyleSheet, Text, View, ScrollView  } from "react-native";
import Header from "../components/Header";
import { SafeAreaView} from "react-native-safe-area-context";
import { useState, useCallback, useEffect } from "react";
import { Contato } from "../models/contato";
import { getDBConnection, createTable, getContatos, saveContato } from "../db/db-services";
import { ContatoCardComponent } from "../components/ContatoCard";


export default function Home() {

    const [contatos, setContatos] = useState<Contato[]>([]);

    //função para fazer o get dos contatos do banco 
    const loadDataCallback = useCallback( async () => {
        try {
            const contatosIniciais = [
                {nome: 'Maria', sobrenome: 'Vargas', telefone: '99432-8762', email: 'maria@email.com'},
                {nome: 'Mariana', sobrenome: 'Lima', telefone: '95487-0212', email: 'mariana@email.com'},
            ]
            const db = await getDBConnection();
            await createTable(db);
            const contatosNoBanco = await getContatos(db);

            if (contatosNoBanco && contatosNoBanco.length) {
                setContatos(contatosNoBanco);
            }
            else {
                for (const contato of contatosIniciais) {
                    saveContato(db, [contato]);
                };

                const contatosNoBanco = await getContatos(db);
                setContatos(contatosNoBanco);
            };
            
        } catch (error) {
            console.error(error);
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
                            <ContatoCardComponent key={contato.id} contato={contato} />
                        ))}
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