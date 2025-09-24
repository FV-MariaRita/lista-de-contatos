import React from "react";
import {View, TouchableOpacity, Text, TextInput, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const CriarContato = ({route}: any) => {
  return(
    <>
    <Text style={styles.titleText}>Adicionar Contato</Text>
    <View style={styles.container}>

      <View>
        <Text style={styles.text}> Nome: </Text>
        <TextInput style={styles.textInput} placeholder = "Nome" />
      </View>
      <View>
        <Text style={styles.text}> Sobrenome: </Text>
        <TextInput style={styles.textInput} placeholder = "Sobrenome"/>
      </View>

        <View style={styles.smallContainer}>
          <View style={styles.smallerContainer}>
            <Text style={styles.text}> Telefone: </Text>
            <TextInput style={styles.textInput} placeholder = "(99) 99999-9999" />
          </View>
          <View style={styles.smallerContainer}>
            <Text style={styles.text}> Email: </Text>
            <TextInput style={styles.textInput} placeholder = "Email"/>
          </View>
        </View>

    </View>
    <TouchableOpacity style={styles.button}>Salvar</TouchableOpacity>
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

});

export default CriarContato;
