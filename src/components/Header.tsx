import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
 export default function Header (props) {
   return(
     <View style={styles.container}>
       <View style={styles.containerFlex}>
        <View style={styles.invButton}></View>
        <Text style={styles.headerText}>{props.title}</Text>
        <TouchableOpacity style={styles.button}>+</TouchableOpacity>
      </View>  
     </View>
   )
 }

 const styles = StyleSheet.create({
    container: {
      width: '100%',
      paddingTop: 20,
      paddingBottom: 20,
      backgroundColor: '#136CB0',
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.6,
      shadowRadius: 5,
    },
    headerText: {
      fontSize: 30,
      fontWeight: 'bold',
      color: 'white'
    },
    button: {
      backgroundColor: '#0F5387',
      borderRadius: 22,
      marginRight: 10,
      marginTop: 3,
      width: '10%',
      textAlign: 'center',
      fontSize: 30,
      fontWeight: 'bold',
      color: '#fff'
    },
    invButton: {
      width: '10%',
      marginLeft: 10,
    },
    containerFlex: {
      width: '100%',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      textAlign: 'center'
    }
  });
