import React from "react";

import { BottomTabView, createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Favorito from '../pages/Favorito';
import Inicial from '../pages/Inicial';
import Perfil from '../pages/Perfil';
import {Entypo, Feather,Fontisto} from '@expo/vector-icons'

const Tab = createBottomTabNavigator();

export default function Routes(){
    return(
        <Tab.Navigator initialRouteName="Inicial" screenOptions={{headerShown:false}}>

            <Tab.Screen name="Favorito" component={Favorito} options={{tabBarIcon:({size,color}) => (<Entypo name="heart" size={size} color={color}/>)}}/>

            <Tab.Screen name="Inicial" component={Inicial}  options={{tabBarIcon:({size,color}) => (<Entypo name="home" size={size} color={color}/>)}}/>

            <Tab.Screen name="Perfil" component={Perfil}  options={{tabBarIcon:({size,color}) => (<Fontisto name="person" size={size} color={color}/>)}}/>

        </Tab.Navigator>
    );
} 