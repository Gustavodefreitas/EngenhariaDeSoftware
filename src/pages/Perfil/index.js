import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput,TouchableOpacity } from 'react-native';
import {firestore} from '../../lib/firebase'

export default function Perfil() {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [phoneNumber,setPhoneNumber] = useState('')
    const [imageUrl,setImageUrl] = useState('')

    async function handleCreateNewUser(){
        await firestore.collection('atletas').add({
            name,
            email,
            phoneNumber,
            favorite: false
        })

        setName('')
        setEmail('')
        setPhoneNumber('')
        setImageUrl('')
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cadastro de atleta</Text>
            <TextInput 
                style={styles.input}
                placeholder="Nome"
                value={name}
                onChangeText={setName}
             />
            <TextInput 
                style={styles.input} 
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput 
                style={styles.input} 
                placeholder="Número do telefone"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
            />
              <TextInput 
                style={styles.input} 
                placeholder="Url da imagem"
                value={imageUrl}
                onChangeText={setImageUrl}
            />

            <TouchableOpacity style={styles.button} onPress={handleCreateNewUser}>
                <Text>Cadastrar</Text>
            </TouchableOpacity>
        </View>
      )
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 110
    },
    title: { 
        fontSize: 15,
        marginBottom: 20,
        fontWeight: 'bold',
        
    },
    input: {
        borderWidth: 2,
        borderRadius: 10,
        width: '200%',
        marginBottom: 55,
        height: 50,
        padding: 10,
        fontSize: 24
    },
    button : {
        height: 50,
        width: '100%',
        backgroundColor: 'blue',
        borderRadius: 10,
        fontSize: 24,
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    }
  });