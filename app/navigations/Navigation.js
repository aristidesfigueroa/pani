
// NAVIGATION BARRA DE ABAJO

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from 'react-native-elements'; 

import HomeStack from "./HomeStack";
import LaMenorStack from "./LaMenorStack"
import LaMayorStack from "./LaMayorStack";
import ConsultaPremiosStack from "./ConsultaPremiosStack";
import CompraStack from "./CompraStack";


const Tab = createBottomTabNavigator();

export default function Navigation() {

    return(
        <NavigationContainer>
            <Tab.Navigator
             initialRouteName="home"  // Acá decido donde iniciar en el Navigator
             tabBarOptions={{
                 inactiveTintColor: "#646464",
                 activeTintColor: "#00a680",
             }}
             screenOptions={({ route }) => ({
                 tabBarIcon: ({ color }) => screenOptions(route, color),
             })}
            >
                <Tab.Screen 
                name="home" 
                component={HomeStack}
                options={{title:"Pani"}}
                />                
                <Tab.Screen 
                name="lamenor" 
                component={LaMenorStack}
                options={{title:"LaChica"}}
                 />
                <Tab.Screen 
                name="lamayor" 
                component={LaMayorStack}
                options={{title:"LaGrande"}}
                 />
                <Tab.Screen 
                name="consultapremios" 
                component={ConsultaPremiosStack} 
                options={{title:"Premios"}}
                /> 
                <Tab.Screen 
                name="compra" 
                component={CompraStack} 
                options={{title:"Compras"}}
                />                          
            </Tab.Navigator>
        </NavigationContainer>
        
    );
}

function screenOptions(route, color) {
    let iconName;
    
    switch (route.name) {
        case "home":             
            iconName = "home-outline";           
            break;
        case "lamenor":            
            iconName = "arrow-down";           
            break;
        case "lamayor":
            iconName = "arrow-up";                      
            break;
        case "consultapremios":
            // iconName = "star-outline"; 
            iconName = "gift-outline";           
            break;
        case "compra":
        // iconName = "star-outline"; 
        iconName = "credit-card-outline";           
        break;
        default:
            break;
    }
    return(
        <Icon type="material-community" name={iconName}  size={22} color={color} />
    );
}