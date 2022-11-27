import { StyleSheet, Text, View,TouchableOpacity,Image } from 'react-native';

export default function Atleta({item,handleFavoriteAthlete}){
  return (
    <TouchableOpacity onPress={()=> {handleFavoriteAthlete(item.id,item.favorite)} }>
          <View style={styles.card}>
              <Image source={{uri: item.imageUrl}} style={styles.image}/>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.des}>{item.des}</Text>
              <Text style={styles.email}>{item.email}</Text>                               
              <Text style={styles.phone}>{item.phoneNumber}</Text>
              <Text style={styles.fav}>{item.favorite ? 'Favorito' : 'Não favorito'}</Text>
          </View>
      </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card:{
      backgroundColor: '#d8d8d8',
      marginBottom: 10,
      width: '100%',
      height: 150,
      borderRadius: 28,
      elevation: 5
  },
  name:{
      marginTop: -140,
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
      textAlign: 'center' 
  },
  email:{
      marginTop:39,
      marginLeft:120,       
  },
  phone:{
      marginLeft:120,       
  },
  fav:{
      marginLeft:120,    
  },
  des:{
      marginLeft: 120
  },
  image: { 
      width: 110,
      height:150,
      borderRadius: 28,
    }
}
  );