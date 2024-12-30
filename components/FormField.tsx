import { 
	View, 
	Text, 
	TextInput, 
	TouchableOpacity, 
	Image 
} from "react-native";
import { useState } from "react";
import { icons } from "@constants";

interface FromFieldProps{
	title: string;
	value: string;
	placeHolder?: string;
	otherStyle?: string;
	keybordType?: string;
	handleChangeText: (e: any) => void
}

export default function FromField({
	title, value, placeHolder, otherStyle, handleChangeText
}: FromFieldProps) {

	const [showPassword, setShowPassword] = useState(false);
	const [bc, setBc] = useState("#020617");

	return (
		<View className={`${otherStyle}`}>
			<Text className="text-base text-gray-100 mb-2">{title}</Text>

			<View 
				className="border-[1px] w-full h-16 px-4 bg-black-100 rounded-2xl items-center flex-row justify-center"
				style={{
					borderColor: bc
				}}
			>
				 <TextInput 
				 	className="flex-1 w-full h-full text-white font-psemibold text-base"
				 	value={value}
				 	placeholder={placeHolder}
				 	placeholderTextColor="#7b7b8b"
				 	onChange={handleChangeText}
				 	secureTextEntry={title === "Password" && !showPassword}
					onFocus={() => {setBc("#FF9C01")}}
					onBlur={() => {setBc("#020617")}} 
				/>

				 {title === "Password" && (
				 		<TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
				 			<Image 
				 				source={!showPassword ? icons.eye : icons.eyeHide}
				 				className="w-6 h-6"
				 				resizeMode="contain"
				 			/>
				 		</TouchableOpacity>
				 	)}
			</View>
		</View>
	)
}