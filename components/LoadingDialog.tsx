import { Text, View, ActivityIndicator } from "react-native";

export default function LoadingDialog ({ title }: { title: string }){
	return (
		<View className="h-full w-full absolute z-5 flex-1 justify-center items-center">
			<View className="w-[70%] h-28 bg-white rounded-xl justify-center items-center gap-2">
				<ActivityIndicator size="large" color="#111" />
				<Text className="text-black text-lg text-pregular text-center">
					{title}
				</Text>
			</View>
		</View>
	)
}