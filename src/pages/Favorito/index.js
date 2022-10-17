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
                        <View style={styles.card}>
                            <Image source={{uri: item.imageUrl}} style={styles.image}/>
                            <Text>{item.name}</Text>
                            <Text>{item.email}</Text>
                            <Text>{item.phoneNumber}</Text>
                            <Text>Favorito</Text>
                        </View>
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
    padding: 100,
  },
  image: { 
    width: 50,
    height: 50
  },
  card:{
    backgroundColor: '#d8d8d8',
    marginBottom: 10,
    width: '95%',
    marginLeft: '2.5%',
    height: 150,
    borderRadius: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5
}
});