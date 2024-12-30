import { View, Text, Image } from "react-native";
import { router } from "expo-router";
import { images } from "@constants";
import CustomButton from "@components/CustomButton";

interface EmptyProps {
	title: string;
	subtitle: string;
}

export default function Empty({ title, subtitle }: EmptyProps) {
	return (
		<View className="justify-center items-center px-4">
			<Image 
				source={images.empty}
				className="w-[270px] h-[215px]"
				resizeMode="contain"
			/>
			<Text className="text-xl text-center font-psemibold text-white mt-2">
				{title}
			</Text>
			<Text className="font-pmediam text-sm text-gray-100">
				{subtitle}
			</Text>
			<CustomButton 
				title="Create video"
				handelPress={() => router.push("/create")}
				containerStyle="w-full my-5"
				isLoading={false}
			/>
		</View>
	);
}