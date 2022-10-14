import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList,TouchableOpacity,Image } from 'react-native';
import {firestore} from '../../lib/firebase'

export default function Favorito() {
  const [favoritos,setFavoritos] = useState([]);

  function handleGetFavoritos(){
      const snapshot =  firestore.collection('atletas').where('favorite', '==', true).onSnapshot(x=>{
          const favoritosBanco = x.docs.map(doc => {
              return { 
                  id: doc.id,
                  ...doc.data()
              }
          })

          setFavoritos(favoritosBanco)
      })
  }

  function handleFavoriteAthlete(id, favorite){
      firestore.collection('atletas').doc(id).update({
          favorite: !favorite
      })
  }

  useEffect(()=> {
    handleGetFavoritos();
  },[])

  return (
      <View style={styles.container}>
          <FlatList
              data={favoritos}
              renderItem={({item})=>{
                  return (
                      <TouchableOpacity onPress={()=> {handleFavoriteAthlete(item.id,item.favorite)}}>
                          <Image source={{uri: item.imageUrl}} style={styles.image}/>
                          <Text>{item.name}</Text>
                          <Text>{item.email}</Text>
                          <Text>{item.phoneNumber}</Text>
                          <Text>Favorito</Text>
                      </TouchableOpacity>
                  )
              }}
          />
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 150,
  },
  image: { 
    width: 50,
    height: 50
  }
});