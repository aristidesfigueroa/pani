import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import LaMayor from "../screens/LaMayor";


const Stack = createStackNavigator();

export default function LaMayorStack() {

    return(
        <Stack.Navigator>
        <Stack.Screen 
        name="lamayor" 
        component={LaMayor}
        options={{title:"La Grande"}}
         />
      </Stack.Navigator>
    )
}