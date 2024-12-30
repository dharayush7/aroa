import { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { PostType } from "@lib/appwrite";
import { icons } from "@constants";


export default function VideoCard({ 
	post: { title, 
		thumble, 
		video, 
		creator: { username, avatar }
	}
}: { post: PostType }) {

	const [isPlay, setIsPlay] = useState(false);

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

				<View className="pt-2">
					<Image 
						source={icons.menu}
						className="w-5 h-5"
						resizeMode="contain"
					/>
				</View>
			</View>
			{isPlay ? (
				<Text className="text-white">Playing</Text>
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
