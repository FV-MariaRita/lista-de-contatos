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
                    <Text>{contato.nome} {contato.sobrenome}</Text>
                    <Text>{contato.telefone}</Text>
                    <Text>{contato.email}</Text>
                </View>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity onPress={handleEditar}>
                        <Text>
                            Editar
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDelete(contato.id!)}>
                        <Text>
                            Excluir
                        </Text>
                    </TouchableOpacity>
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
    },
    dadosContainer: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
        color: 'black',
    }, 
    buttonsContainer: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
        color: 'red',
    }
})