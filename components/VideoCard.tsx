import { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import { VideoView, useVideoPlayer } from "expo-video";
import { PostType } from "@lib/appwrite";
import { icons } from "@constants";

const width = Dimensions.get('window').width

export default function VideoCard({ 
	post: { 
		title, 
		prompt,
		thumble, 
		video, 
		creator: { username, avatar }
	}
}: { post: PostType }) {

	const [isPlay, setIsPlay] = useState(false);
	const player = useVideoPlayer(video, (player) => {});

	useEffect(() => {
	  const subscription = player.addListener('playToEnd', () => {
	    setIsPlay(false);
	  	});
	  }, [player]);

		 useEffect(() => {
		 	if(isPlay) {
		 		player.play();
		 	}
		 }, [isPlay]);

	return (
		<View className="flex-col items-center px-4 mb-14">
			<View className="flex-row items-start gap-3">
				<View className="justify-center items-center flex-row flex-1">
					<View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center">
						<Image 
							source={{uri: avatar}}
							className="w-full h-full rounded-lg"
							resizeMode="cover"
						/>
					</View>
					<View className="justify-center flex-1 ml-3 gap-y-1">
						<Text 
							className="text-white font-psemibold text-sm"
							numberOfLines={1}
						>
							{title}
						</Text>
						<Text 
							className="text-xs text-gray-100 font-pregular"
							numberOfLines={1}
						>
							{username}
						</Text>
					</View>
				</View>
			</View>
			<View className="mt-3 items-start w-full">
				<Text 
				className="text-sm text-gray-100 font-pregular text-start"
				numberOfLines={3}
				>{prompt}</Text>
			</View>
			{isPlay ? (
				<VideoView 
					player={player}
					showsTimecodes={false}
					style={{
						width: width - 10,
						height: 240,
						borderRadius: 12,
						marginTop: 12
					}}
				/>
			): (
				<TouchableOpacity 
					className="w-full h-60 rounded-xl mt-3 relative justify-center items-center" 
					activeOpacity={0.7}
					onPress={() => setIsPlay(true)}
				>
					<Image 
						source={{ uri: thumble }}
						className="w-full h-full rounded-xl mt-3"
						resizeMode="cover"
					/>
					<Image 
						source={icons.play}
						className="w-12 h-12 absolute"
						resizeMode="contain"
					/>
				</TouchableOpacity>
			)}
		</View>
	);

}
