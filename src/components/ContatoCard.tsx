import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert  } from "react-native";
import { Contato } from "../models/contato";
import { deleteContato} from "../db/db-services";

export const ContatoCardComponent: React.FC<{
    contato: Contato;
    handleEditar: () => void
    handleRefresh: () => void
}> = ({ contato, handleEditar, handleRefresh}) => {

    const handleDelete = async (id: number) => {
        Alert.alert(
            'Atenção',
            'Tem certeza que deseja excluir o contato?',
            [
                {
                    text: 'Sim',
                    onPress: async () => {
                        try {
                            await deleteContato(id);
                            handleRefresh();

                        } catch (error) {
                            console.error(error);
                        }
                    }
                },
                {
                    text: 'Não',
                    onPress: () => console.log('não exccluir contato')
                }
            ],
        );        
    }

    return (
        <>
            <View style={styles.container}>
                <View style={styles.dadosContainer}>
                    <View style={styles.indivDadoContainer}>
                        <Text>{contato.nome} {contato.sobrenome}</Text>
                    </View>
                    <View style={styles.indivDadoContainer}>
                        <Text>{contato.telefone}</Text>
                    </View>
                    <View style={styles.indivDadoContainer}>
                        <Text>{contato.email}</Text>
                    </View>    
                </View>
                <View style={styles.buttonsContainer}>
                    <View style={styles.editarContainer}>
                        <TouchableOpacity onPress={handleEditar}>
                            <Text style={styles.buttonText}>
                                Editar
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.excluirContainer}>
                        <TouchableOpacity onPress={() => handleDelete(contato.id!)}>
                            <Text style={styles.buttonText}>
                                Excluir
                            </Text>
                        </TouchableOpacity>
                    </View>
                    
                </View>
            </View>
        </>
    )

}   

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingTop: 20,
        paddingBottom: 20,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 10,
        color: 'black',
        marginTop: "10%"
    },
    dadosContainer: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
        color: 'black',
        marginLeft: 'auto'
    }, 

    indivDadoContainer: {
      marginBottom: "3%"
    },
    buttonsContainer: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
        marginLeft: 'auto',
        marginRight: 20,
       alignItems: 'flex-end',
        
        
    },
    editarContainer: {
      backgroundColor: '#1A5299',
      padding: 6.4,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.,
      shadowRadius: 5,
    },

    excluirContainer: {
      marginTop: "30%",
      backgroundColor: '#1A5299',
      padding: 5,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
    },

    buttonText: {
      color: '#efefef'
    }
})