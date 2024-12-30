import React from "react";
import { Text, View, Image, ImageSourcePropType } from "react-native";
import { Tabs, Redirect } from "expo-router";
import { icons } from "@constants"


interface TabIconProps {
	icon: ImageSourcePropType;
	color: string,
	focused: boolean;
	name: string;
}

function TabIcon({icon, color, focused, name}: TabIconProps) {
	return (
		<View className="w-20 flex-1 items-center gap-2">
			<Image 
				source={ icon }
				resizeMode="contain"
				tintColor={ color }
				className="w-6 h-6"
			/> 
			<Text 
				className={`${focused ? "font-psemibold" : "font-pregular"} text-xs text-center`} style={{color: color}}>
			  {name}
			</Text>
		</View>
	);
}

export default function TabLayout() {
	return (
		<>
			<Tabs 
				screenOptions={{
					tabBarShowLabel: false,
					tabBarActiveTintColor: "#FFA001",
					tabBarInactiveTintColor: "#CDCDE0",
					tabBarStyle: {
						backgroundColor: "#161622",
						borderTopWidth: 0,
						height: 55,
					}
				}}
			>
				<Tabs.Screen 
				name="home" 
				options={{
					title: "Home",
					headerShown: false,
					tabBarIcon: ({ color, focused }) => (
						<TabIcon 
						name="Home" 
						icon={ icons.home } 
						color={ color } 
						focused={ focused } 
						/>
						)
				}}
				/>
				<Tabs.Screen 
				name="bookmark" 
				options={{
					title: "Bookmark",
					headerShown: false,
					tabBarIcon: ({ color, focused }) => (
						<TabIcon 
						name="Bookmark" 
						icon={ icons.bookmark } 
						color={ color } 
						focused={ focused } 
						/>
						)
				}}
				/>
				<Tabs.Screen 
				name="create" 
				options={{
					title: "Create",
					headerShown: false,
					tabBarIcon: ({ color, focused }) => (
						<TabIcon 
						name="Create" 
						icon={ icons.plus } 
						color={ color } 
						focused={ focused } 
						/>
					)
				}}
				/>
				<Tabs.Screen 
				name="profile" 
				options={{
					title: "Profile",
					headerShown: false,
					tabBarIcon: ({ color, focused }) => (
						<TabIcon 
						name="Profile" 
						icon={ icons.profile } 
						color={ color } 
						focused={ focused } 
						/>
					)
				}}
				/>
			</Tabs>
		</>
	)
}