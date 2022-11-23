import React, { useEffect, useState,useRef } from 'react';
import { StyleSheet, Text, View, TextInput,TouchableOpacity,Image } from 'react-native';
import {firestore} from '../../lib/firebase'
import {Camera,CameraType} from 'expo-camera'
import {Feather} from '@expo/vector-icons'

export default function Perfil() {
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [cameraOpen,setCameraOpen] = useState(false);
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [phoneNumber,setPhoneNumber] = useState('')
    const [imageUrl,setImageUrl] = useState('')
    let camera = useRef();

    async function cameraPermission() {
      await requestPermission();
    }

    useEffect(()=> {
      cameraPermission();
    },[])



    async function handleCreateNewUser(){
        await firestore.collection('atletas').add({
            name,
            email,
            phoneNumber,
            favorite: false,
            imageUrl
        })

        setName('')
        setEmail('')
        setPhoneNumber('')
        setImageUrl('')
    }

    function handleOpenCamera(){
      setCameraOpen(true)
    }

    async function handleTakePicture() {
      const picture = await camera.takePictureAsync({
        quality:0,
        base64:true
      });

      const source = picture.base64;

      const base64Img = `data:image/jpg;base64,${source}`;
      const data = {
        file: base64Img,
        upload_preset: 'Fotos_App'
      };
      const apiUrl =
      'https://api.cloudinary.com/v1_1/duq0eab8y/image/upload';

      fetch(apiUrl, {
        body: JSON.stringify(data),
        headers: {
          'content-type': 'application/json'
        },
        method: 'POST'
      }).then(async response => {
        const data = await response.json();
        setImageUrl(data.secure_url);
      })
      .catch(err => {
        alert('Cannot upload');
      }).finally(()=>{
        setCameraOpen(false)
      });
    }

    return (
      <>
        {cameraOpen ?
         (
          <Camera style={{flex: 1, width: '100%'}} type={CameraType.front} ref={(ref)=> { camera = ref}}  >
            <View
              style={{
              position: 'absolute',
              bottom: 0,
              flexDirection: 'row',
              flex: 1,
              width: '100%',
              padding: 20,
              justifyContent: 'space-between'
              }}
            >
              <View
              style={{
              alignSelf: 'center',
              flex: 1,
              alignItems: 'center'
              }}
              >
                  <TouchableOpacity
                  onPress={handleTakePicture}
                  style={{
                  width: 70,
                  height: 70,
                  bottom: 0,
                  borderRadius: 50,
                  backgroundColor: '#fff'
                  }}
                  />
            </View>
          </View>
          </Camera>
         )
         : (
          <View style={styles.container}>
          <Text style={styles.title}>Cadastro de atleta</Text>

          <View>
            <TouchableOpacity onPress={handleOpenCamera}>
              <Feather name="camera" size={24} color="black" />
            </TouchableOpacity>
          </View>
          {!!imageUrl && (<Image style={{height:50,width:50}} source={{uri:imageUrl}}/> )}
          
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

          <TouchableOpacity style={styles.button} onPress={handleCreateNewUser}>
              <Text>Cadastrar</Text>
          </TouchableOpacity>
      </View>
        )}
        </>
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
    },
    camera: {
      height: '100%',
      width: '100%'
    }
  });