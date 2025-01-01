import React, { useState, useEffect } from "react";
import { 
	Text, 
	View, 
	FlatList, 
	ActivityIndicator
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from "@constants";
import SearchInput from"@components/SearchInput";
import Empty from "@components/Empty";
import VideoCard from "@components/VideoCard";
import { PostType, searchPost } from "@lib/appwrite";
import useAppwrite from "@lib/useAppwrite";



export default function Search() {
	const [refreshing, setRefreshing] = useState(false);
	const { query: prm } = useLocalSearchParams();
	const query = prm.toString();
	const { 
		data: posts,
		loading, 
		refetch 
	} = useAppwrite<PostType[]>(() => searchPost(query));		

	useEffect(() => {
		refetch();
	}, [query]);
	
	return (
		<SafeAreaView className="bg-primary h-full">
			<FlatList 
				data={posts}
				keyExtractor={(item) => item.$id }
				renderItem={({ item }) => (
					<VideoCard post={item} />
				)}
				ListHeaderComponent={() => (
					<View className="my-6 px-4">	
						<Text className="font-pmediam text-sm text-gray-100">
							Search Result
						</Text>
						<Text className="text-2xl font-psemibold text-white">
							{query}
						</Text>
						<View className="mt-6 mb-8">
							<SearchInput initialQuery={query} />
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
								title="No Videos Found"
								subtitle="No videos found for this search"
							/>
						)}
					</>
				)}
			/>
		</SafeAreaView>
	)
}