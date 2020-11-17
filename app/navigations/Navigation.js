
// NAVIGATION BARRA DE ABAJO

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from 'react-native-elements'; 

import LaMenorStack from "./LaMenorStack"
import LaMayorStack from "./LaMayorStack";
import ConsultaPremiosStack from "./ConsultaPremiosStack";


const Tab = createBottomTabNavigator();

export default function Navigation() {

    return(
        <NavigationContainer>
            <Tab.Navigator
             initialRouteName="lamenor"  // Acá decido donde iniciar en el Navigator
             tabBarOptions={{
                 inactiveTintColor: "#646464",
                 activeTintColor: "#00a680",
             }}
             screenOptions={({ route }) => ({
                 tabBarIcon: ({ color }) => screenOptions(route, color),
             })}
            >
                <Tab.Screen 
                name="lamenor" 
                component={LaMenorStack}
                options={{title:"La Chica"}}
                 />
                <Tab.Screen 
                name="lamayor" 
                component={LaMayorStack}
                options={{title:"La Grande"}}
                 />
                <Tab.Screen 
                name="consultapremios" 
                component={ConsultaPremiosStack} 
                options={{title:"Consulta Premios"}}
                />                
            </Tab.Navigator>
        </NavigationContainer>
        
    );
}

function screenOptions(route, color) {
    let iconName;
    
    switch (route.name) {
        case "lamenor":
            // iconName = "compass-outline"; 
            iconName = "arrow-down";           
            break;
        case "lamayor":
            iconName = "arrow-up"; 
            // color="#ffbb33";           
            break;
        case "consultapremios":
            // iconName = "star-outline"; 
            iconName = "database-search";           
            break;
        default:
            break;
    }
    return(
        <Icon type="material-community" name={iconName}  size={22} color={color} />
    );
}