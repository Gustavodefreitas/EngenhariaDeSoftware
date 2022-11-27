import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList,TouchableOpacity,Image } from 'react-native';
import {firestore} from '../../lib/firebase'
import Atleta from '../../components/Atetla';

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
                        <Atleta item={item} handleFavoriteAthlete={handleFavoriteAthlete}/>
                    )
                }}
            />
        </View>
      )
  }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 40,
        paddingHorizontal: 32,
    }
});