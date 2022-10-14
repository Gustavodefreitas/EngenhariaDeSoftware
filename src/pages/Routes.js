import React from "react";

import { BottomTabView, createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Favorito from '../pages/Favorito';
import Inicial from '../pages/Inicial';
import Perfil from '../pages/Perfil';

const Tab = createBottomTabNavigator();

export default function Routes(){
    return(
        <Tab.Navigator initialRouteName="Inicial" screenOptions={{headerShown:false}}>
            <Tab.Screen name="Favorito" component={Favorito}/>

            <Tab.Screen name="Inicial" component={Inicial}/>

            <Tab.Screen name="Perfil" component={Perfil}/>

        </Tab.Navigator>
    );
} 