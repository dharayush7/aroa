import { 
	Text,
	View
} from "react-native";

interface InfoBoxProps {
	title: string | number
	subtitle?: string
	containerStyle?: string
	titleStyle?: string
	subtitleStyle?: string
}

export default function InfoBox({ 
	title, 
	subtitle, 
	containerStyle, 
	titleStyle, 
	subtitleStyle 
}: InfoBoxProps) {
	return (
		<View className={containerStyle || ""}>
			<Text 
				className={`text-white text-center font-psemibold ${titleStyle}`}
			>
				{title}
			</Text>	
			{subtitle && (
				<Text 
					className={`text-sm text-gray-100 text-center font-pregular ${subtitleStyle}`}
				>
					{subtitle}
				</Text>
			)}
		</View>
	);
}