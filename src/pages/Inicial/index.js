import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList,TouchableOpacity } from 'react-native';
import {firestore} from '../../lib/firebase'

export default function Inicial() {
    const [atletas,setAtletas] = useState([]);

    function handleGetAtletas(){
        const snapshot =  firestore.collection('atletas').onSnapshot(x=>{
            const atletasBanco = x.docs.map(doc => {
                return { 
                    id: doc.id,
                    ...doc.data()
                }
            })

            setAtletas(atletasBanco)
        })
    }

    function handleFavoriteAthlete(id, favorite){
        firestore.collection('atletas').doc(id).update({
            favorite: !favorite
        })
    }

    useEffect(()=> {
      handleGetAtletas();
    },[])

    return (
        <View style={styles.container}>
            <FlatList
                data={atletas}
                renderItem={({item})=>{
                    return (
                        <TouchableOpacity onPress={()=> {handleFavoriteAthlete(item.id,item.favorite)} }>
                            <View style={styles.card}>
                                
                                <Text>{item.name}</Text>
                                <Text>{item.email}</Text>                               
                                <Text>{item.phoneNumber}</Text>
                                <Text>{item.favorite ? 'Favorito' : 'Não favorito'}</Text>
                                
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
    },
    name:{
       
    }
  });