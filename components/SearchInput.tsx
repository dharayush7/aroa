import { 
	View, 
	TextInput, 
	TouchableOpacity, 
	Image 
} from "react-native";
import { useState } from "react";
import { icons } from "@constants";

interface SearchInputProps{
	value: string;
	handleChangeText: (e: any) => void
}

export default function SearchInput({ value, handleChangeText }: SearchInputProps) {

	const [bc, setBc] = useState("#020617");

	return (
		<View 
			className="border-[1px] w-full h-16 px-4 bg-black-100 rounded-2xl items-center flex-row justify-center space-x-4"
			style={{
				borderColor: bc
			}}
		>
			 <TextInput 
			 	className="flex-1 w-full h-full text-white font-pregular text-base justify-center items-center"
			 	value={value}
			 	placeholder="Search for a video topic"
			 	placeholderTextColor="#7b7b8b"
			 	onChange={handleChangeText}
				onFocus={() => {setBc("#FF9C01")}}
				onBlur={() => {setBc("#020617")}} 
			/>

			 <TouchableOpacity>
			 	<Image 
			 		source={icons.search}
			 		className="w-5 h-5"
			 		resizeMode="contain"
			 	/>
			 </TouchableOpacity>
		</View>

	)
}