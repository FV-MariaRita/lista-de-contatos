import React from "react";
import {View, TouchableOpacity, Text, TextInput, StyleSheet, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { createTable, getDBConnection, saveContato } from "../db/db-services";
import { Contato } from "../models/contato";

const CriarContato = ({route}: any) => {

  const navigation = useNavigation<any>();

  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');

  const addContato = async () => {
    if (nome ==  '' || sobrenome == '' || telefone == '' || email == '') {
      Alert.alert(
        'Atenção',
        'Preencha todos os campos antes de salvar o contato'
      );
      return;
    } 
    console.log("Contato a ser salvo:", { nome, sobrenome, telefone, email });
    try {
      await createTable();
      await saveContato ({nome, sobrenome, telefone, email});
      navigation.navigate("Home");
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível salvar o contato.");
    }
  }


  return(
    <>
    <Text style={styles.titleText}>Adicionar Contato</Text>

    <View style={styles.container}>
      <View>
        <Text style={styles.text}> Nome: </Text>
        <TextInput style={styles.textInput} placeholder = "Nome" value={nome} onChangeText={setNome} />
      </View>
      <View>
        <Text style={styles.text}> Sobrenome: </Text>
        <TextInput style={styles.textInput} placeholder = "Sobrenome" value={sobrenome} onChangeText={setSobrenome}/>
      </View>
      <View style={styles.smallContainer}>
          <View style={styles.smallerContainer}>
            <Text style={styles.text}> Telefone: </Text>
            <TextInput style={styles.textInput} placeholder = "(99) 99999-9999"  value={telefone} onChangeText={setTelefone} keyboardType="phone-pad"/>
          </View>
          <View style={styles.smallerContainer}>
            <Text style={styles.text}> Email: </Text>
            <TextInput style={styles.textInput} placeholder = "Email" value={email} onChangeText={setEmail} keyboardType="email-address"/>
          </View>
      </View>
    </View>
    <TouchableOpacity style={styles.button} onPress={addContato}>
      <Text style={styles.buttonText}>
        Salvar
      </Text>
    </TouchableOpacity>

    </>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 0.48,
    alignContent: 'center',
    backgroundColor: '#207BB0',
    padding: "5%",
    marginTop: "20%",
    marginBottom: "3%",
    marginHorizontal: "4%",
    textAlign: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 5,

  },

  smallerContainer: {
    width: "45%",
    margin: 5
  },

  smallContainer: {
    marginBottom: 10,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

   titleText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#0F5387',
    marginTop: 50,
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
      alignSelf: 'center'

    },
  buttonText: {
    color: '#fff',
    fontSize: 30
  }

});

export default CriarContato;
