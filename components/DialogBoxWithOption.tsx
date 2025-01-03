import React, { useState } from "react"
import { Text, View, TouchableOpacity } from "react-native";

interface DialogBoxWithOptionProps {
	title: string;
	textTitle: string;
	showDialog: boolean;
	setShowDialog: (e: boolean) => void

}

export default function DialogBoxWithOption({
	title,
	textTitle,
	showDialog,
	setShowDialog
}: DialogBoxWithOptionProps) {
	return (
		<>
		{showDialog && (
			<View className="w-full h-full absolute flex-1 justify-center items-center">
				<View className="w-full items-center justify-center pt-4 pb-4 px-4 bg-white rounded-xl">
					<Text className="text-black text-lg text-pregular">
						{title}
					</Text>
						<TouchableOpacity 
							className="items-end w-full mt-6"
							activeOpacity={0.7}
							onPress={() => setShowDialog(false)}
						>
							<Text className="pr-2 text-secondary text-md text-center">
								{textTitle}
							</Text>
						</TouchableOpacity>
					</View>
			</View>
		)}
		</>
	)
}