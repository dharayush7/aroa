import React, { useState, useEffect } from "react";
import { 
	View,
	FlatList,
	Image,
	TouchableOpacity,
	ActivityIndicator
} from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from 'react-native-safe-area-context';
import { icons } from "@constants";
import { useGlobalContext } from "@contexts/GlobalProvider";
import Empty from "@components/Empty";
import VideoCard from "@components/VideoCard";
import InfoBox from "@components/InfoBox";
import { PostType, getUserPost, signOut } from "@lib/appwrite";
import useAppwrite from "@lib/useAppwrite";


export default function Profile() {
	
	const { user, setUser, setIsLoggedIn } = useGlobalContext();
	const [len, setLen] = useState(0);
	const { 
		data: posts,
		loading
	} = useAppwrite<PostType[]>(() => getUserPost(user.$id));		


	useEffect(() => {
		if(!loading){
			posts?.map((e, index) => {
				setLen(index + 1);
			});
		}
	}, [loading]);

	const logout = async () => {
		await signOut();
		setIsLoggedIn(false);
		router.replace("/");
	}

	return (
		<SafeAreaView className="bg-primary h-full">
			<FlatList 
				data={posts}
				keyExtractor={(item) => item.$id }
				renderItem={({ item }) => (
					<VideoCard post={item} />
				)}
				ListHeaderComponent={() => (
					<View className="w-full justify-center items-center mt-6 mb-12 px-4">	
						<TouchableOpacity 
							className="w-full items-end mb-10"
							onPress={logout}
						>
							<Image 
							source={icons.logout}
							resizeMode="contain"
							className="w-6 h-6"
							/>
						</TouchableOpacity>

						<View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
							<Image 
								source={{ uri: user?.avatar }}
								className="w-[90%] h-[90%] rounded-lg"
								resizeMode="cover"
							/>
						</View>
						<InfoBox 
							title={user.username}
							containerStyle="mt-5"
							titleStyle="text-2xl"
						/>
						<View className="mt-5 flex-row mb-6">
							<InfoBox 
								title={len}
								subtitle="Posts"
								titleStyle="text-2xl"
								subtitleStyle="text-xl"
							/>
						</View>
						{loading && (
							  <ActivityIndicator size="large" color="#F3F4F6" />
						)}
					</View>
				)}
				ListEmptyComponent={() => (
					<>
					{!loading && (
						<Empty 
							title="No Videos are posted"
							subtitle="Upload a New Video Now"
						/>
					)}
					</>
				)}
			/>
		</SafeAreaView>
	);
}