import React from 'react'

import { Ionicons } from '@expo/vector-icons'

import HomeScreen from '../screens/HomeScreen'
import ProfileScreen from '../screens/ProfileScreen'
import UserScreen from '../screens/UserScreen'
import ConfigScreen from '../screens/ConfigScreen'

import { createDrawerNavigator } from '@react-navigation/drawer'

const Drawer = createDrawerNavigator()

export default function DrawerRoutes() {
  return (
    <Drawer.Navigator>

      <Drawer.Screen
        name='HomeScreen'
        component={HomeScreen}
        options={{
          title: "Início",
          drawerIcon: ({color, size}) => <Ionicons name='home' color={color} size={size} />
        }}
      />

      <Drawer.Screen name='ProfileScreen' component={ProfileScreen} />
      <Drawer.Screen name='UserScreen' component={UserScreen} />
      <Drawer.Screen name='ConfigScreen' component={ConfigScreen} />

    </Drawer.Navigator>
  )
}