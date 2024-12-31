import { 
	View, 
	TextInput, 
	TouchableOpacity, 
	Image 
} from "react-native";
import { useState } from "react";
import { usePathname, router } from "expo-router";
import { icons } from "@constants";

interface SearchInputProps{
	value: string;
	handleChangeText: (e: any) => void
}

export default function SearchInput(
	{ initialQuery }: { initialQuery?: string }
) {

	const [bc, setBc] = useState("#020617");
	const [query, setQuery] = useState(initialQuery || "");
	const pathname = usePathname();

	return (
		<View 
			className="border-[1px] w-full h-16 px-4 bg-black-100 rounded-2xl items-center flex-row justify-center space-x-4"
			style={{
				borderColor: bc
			}}
		>
			 <TextInput 
			 	className="flex-1 w-full h-full text-white font-pregular text-base justify-center items-center"
			 	value={query}
			 	placeholder="Search for a video topic"
			 	placeholderTextColor="#CDCDE0"
			 	onChange={(e) => setQuery(e.nativeEvent.text)}
				onFocus={() => {setBc("#FF9C01")}}
				onBlur={() => {setBc("#020617")}} 
			/>

			 <TouchableOpacity
			 	onPress={() => {
			 		if(query) {
			 			if (pathname.startsWith('/search')) 
			 				router.setParams({ query });
			 			else router.push(`/search/${query}`);
			 		}
			 	}}
			 >
			 	<Image 
			 		source={icons.search}
			 		className="w-5 h-5"
			 		resizeMode="contain"
			 	/>
			 </TouchableOpacity>
		</View>

	)
}