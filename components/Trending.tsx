import { useState, useEffect } from "react";
import { 
	FlatList, 
	TouchableOpacity, 
	ImageBackground, 
	Image,
} from "react-native";
import * as Animatable from 'react-native-animatable';
import { VideoView, useVideoPlayer } from "expo-video";
import { PostType } from "@lib/appwrite";
import { icons } from "@constants";

const zoomIn: Animatable.Animation | string | Animatable.CustomAnimation = {
	0: {
		scaleX: 0.9,
		scaleY: 0.9
	},
	1: {
		scaleX: 1,
		scaleY: 1
	}
}

const zoomOut: Animatable.Animation | string | Animatable.CustomAnimation = {
	0: {
		scaleX: 1,
		scaleY: 1
	},
	1: {
		scaleX: 0.9,
		scaleY: 0.9
	}
}

interface TerndingItemProps {
	activeItem: string;
	item: PostType;
}

function TerndingItem({ activeItem, item } :TerndingItemProps) {
	const [play, setPlay] = useState(false)
	const {video} = item;

	const player = useVideoPlayer(video, (player) => {});

	useEffect(() => {
  const subscription = player.addListener('playToEnd', () => {
    setPlay(false);
  	});
  }, [player]);

	 useEffect(() => {
	 	if(play) {
	 		player.play();
	 	}
	 }, [play]);

	return (
		<Animatable.View
			className="mr-5"
			animation={activeItem === item.$id ? zoomIn : zoomOut}
			duration={500}
		>
			{play ? (
				<VideoView 
					player={player}
					showsTimecodes={false}
					style={{
						width: 208,
						height: 288,
						borderRadius: 15
					}}
				/>
			) : (
				<TouchableOpacity 
					className="relative justify-center items-center"
					activeOpacity={0.7}
					onPress={() => setPlay(true)}
				>
					<ImageBackground 
						source={{ uri: item.thumble }}
						className="w-52 h-72 rounded-[15px] my-5 overflow-hidden shadow-lg shadow-black/40"
						resizeMode="cover"
					/>
					<Image 
						source={icons.play}
						className="absolute w-12 h-12"
						resizeMode="contain"
					/>
				</TouchableOpacity>
			)}
		</Animatable.View>
	)
}

export default function Trending({ posts }: { posts: PostType[] }) {

	const [ activeItem, setActiveItem ] = useState("")
	const viewableItemsChanged = ({ viewableItems }: any) => {
		if (viewableItems.length > 0) {
			setActiveItem(viewableItems[0].key);
		}
	}

	return (
		<FlatList 
			data={posts}
			keyExtractor={(item) => item.$id}
			renderItem={({ item }) => (
					<TerndingItem activeItem={activeItem} item={item} />
			)}
			onViewableItemsChanged={viewableItemsChanged}
			viewabilityConfig={{
				itemVisiblePercentThreshold: 70
			}}
			contentOffset={{ x: 170, y: 0 }}
			horizontal
		/>
	);
}