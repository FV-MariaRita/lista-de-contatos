import { StyleSheet, Text, View, ScrollView  } from "react-native";
import Header from "../components/Header";
import { SafeAreaView} from "react-native-safe-area-context";
import { useState,  useEffect } from "react";
import { Contato } from "../models/contato";

export const ContatoCardComponent: React.FC<{
    contato: Contato;
    handleEditar: () => void
    handleRefresh: () => void
}> = ({ contato, handleEditar, handleRefresh}) => {


    return (
        <>
            <View style={styles.container}>
                <View style={styles.dadosContainer}>
                    <Text>{contato.nome} {contato.sobrenome}</Text>
                    <Text>{contato.telefone}</Text>
                    <Text>{contato.email}</Text>
                </View>
                <View style={styles.buttonsContainer}>
                    <Text>Editar</Text>
                    <Text>Excluir</Text>
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