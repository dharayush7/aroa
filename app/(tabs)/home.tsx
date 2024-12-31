import { useState, useEffect } from "react";
import { 
	Text, 
	View, 
	FlatList, 
	Image, 
	RefreshControl, 
	ListRenderItem 
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from "@constants";
import SearchInput from"@components/SearchInput";
import Trending from "@components/Trending";
import Empty from "@components/Empty";
import VideoCard from "@components/VideoCard";
import { getAllPosts, PostType, getLatestPosts } from "@lib/appwrite";
import useAppwrite from "@lib/useAppwrite";


export default function Home() {
	const [refreshing, setRefreshing] = useState(false);
	const [search, setSearch] = useState("");
	const { 
		data: posts, 
		loading, 
		refetch 
	} = useAppwrite<PostType[]>(getAllPosts);	
	const { data: latestPosts } = useAppwrite<PostType[]>(getLatestPosts);	

	const onRefresh = async () => {
		setRefreshing(true);
		await refetch();
		setRefreshing(false);
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
					<View className="my-6 px-4 space-y-6">
						<View className="justify-between item-start flex-row mb-6">
							<View>
								<Text className="font-pmediam text-sm text-gray-100">
									Welcome Back
								</Text>
								<Text className="text-2xl font-psemibold text-white">
									dharayush7
								</Text>
							</View>

							<View className="mt-1.5">
								<Image 
									className="h-10 w-9"
									source={images.logoSmall}
									resizeMode="contain"
								/>
							</View>
						</View>

						<SearchInput 
						value={search} 
						handleChangeText={(e) => setSearch(e.nativeEvent.text)} />
						<View className="w-full flex-1 pt-5 pb-8">
							<Text className="text-gray-100 text-lg font-pregular mb-3">
								Latest Videos
							</Text>
							<Trending posts={latestPosts ?? []}/>
						</View>
					</View>
				)}
				ListEmptyComponent={() => (
					<Empty 
						title="No Videos Found"
						subtitle="Be the first one to upload a video"
					/>
				)}
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
			/>
		</SafeAreaView>
	)
}