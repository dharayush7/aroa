import { Dimensions } from "react-native";
import { VideoView, useVideoPlayer } from "expo-video";

const width = Dimensions.get('window').width

export default function Video({uri}: {uri: string}) {
	const player = useVideoPlayer(uri, (player) => {
		player.loop = true;
		player.play();
	});

	return (
		<VideoView 
			player={player}
			showsTimecodes={false}
			style={{
				width: width-50,
				height: 240,
				borderRadius: 12,
				marginTop: 12
			}}
		/>
	);
}