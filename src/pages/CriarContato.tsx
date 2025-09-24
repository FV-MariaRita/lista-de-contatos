import React from "react";
import {View, TouchableOpacity, Text, TextInput, StyleSheet, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { getDBConnection, saveContato } from "../db/db-services";
import { Contato } from "../models/contato";

const CriarContato = ({route}: any) => {

  const navigation = useNavigation<any>();
  
  const [contato, setContato] = useState<Contato>({
    nome: '',
    sobrenome: '',
    telefone: '',
    email: '',
  })

  const handleSubmit = async () => {
    if (!contato.nome || !contato.sobrenome || !contato.telefone || !contato.email) {
      Alert.alert(
        'Atenção',
        'Preencha todos os campos antes de salvar o contato'
      )
      return
    }
    try {
      const db = await getDBConnection();
      await saveContato(db, contato);
      navigation.goBack();

    } catch (error) {
      console.error(error);
    }
    
  }

  return(
    <>
    <Text style={styles.titleText}>Adicionar Contato</Text>
    <View style={styles.container}>

      <View>
        <Text style={styles.text}> Nome: </Text>
        <TextInput style={styles.textInput} placeholder = "Nome" value={contato.nome} onChangeText={(text) => setContato({...contato, nome: text})} />
      </View>
      <View>
        <Text style={styles.text}> Sobrenome: </Text>
        <TextInput style={styles.textInput} placeholder = "Sobrenome" value={contato.sobrenome} onChangeText={(text) => setContato({...contato, sobrenome: text})}/>
      </View>

        <View style={styles.smallContainer}>
          <View style={styles.smallerContainer}>
            <Text style={styles.text}> Telefone: </Text>
            <TextInput style={styles.textInput} placeholder = "(99) 99999-9999"  value={contato.telefone} onChangeText={(text) => setContato({...contato, telefone: text})}/>
          </View>
          <View style={styles.smallerContainer}>
            <Text style={styles.text}> Email: </Text>
            <TextInput style={styles.textInput} placeholder = "Email" value={contato.email} onChangeText={(text) => setContato({...contato, email: text})}/>
          </View>
        </View>

    </View>
    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
      <Text style={styles.buttonText}>
        Salvar
      </Text>
    </TouchableOpacity>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 0.4,
    backgroundColor: '#207BB0',
    padding: 8,
    marginTop: "30%",
    marginBottom: "3%",
    textAlign: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 5,

  },

  smallerContainer: {
    width: "45%",
    margin: 5,
  },

  smallContainer: {
    marginBottom: 10,
    marginTop: 10,
    flexDirection: 'row'
  },

   titleText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#0F5387',
    marginBottom: 3,
    alignSelf: 'center',
    backgroundColor: '#D8ECF2',
    borderRadius: 10,
    padding: 5
  },
  
  text: {
    fontSize: 18,
    fontWeight: 'light',
    color: '#E4F0F5',
    marginBottom: 3
  },

  textInput: {
    backgroundColor: '#BBDCED',
    borderRadius: 10,
    padding: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,

  },

  button: {
      backgroundColor: '#0F5387',
      borderRadius: 10,
      marginRight: 10,
      marginTop: 10,
      width: '30%',
      textAlign: 'center',
      fontSize: 30,
      color: '#fff',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 5,

    },
  buttonText: {
    color: '#fff',
    fontSize: 30
  }

});

export default CriarContato;
