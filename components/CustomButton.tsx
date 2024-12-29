import { TouchableOpacity, Text } from "react-native";

interface CustomButtonProps {
	title: string;
	handelPress: () => void;
	containerStyle?: string;
	textStyle?: string;
	isLoading: boolean;
}

export default function CustomButton({ 
	title, handelPress, containerStyle, textStyle, isLoading 
} :CustomButtonProps) {
	return (
		<TouchableOpacity 
		className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${containerStyle} ${isLoading ? "opacity-50" : 
		""}`}
		onPress={handelPress}
		activeOpacity={0.7}
		disabled={isLoading}
		>
			<Text className={`text-primary font-psemibold text-xl ${textStyle}`}>
				{title}
			</Text>
		</TouchableOpacity>
	)
}