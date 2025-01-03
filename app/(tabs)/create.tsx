import { useState, useEffect } from "react";
import { 
	Text, 
	View, 
	ScrollView, 
	TouchableOpacity, 
	Image,
} from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from 'react-native-safe-area-context';
import * as DocumentPicker from "expo-document-picker";
import FormField from "@components/FormField";
import LoadingDialog from "@components/LoadingDialog";;
import DialogBoxWithOption from "@components/DialogBoxWithOption"
import CustomButton from "@components/CustomButton";
import Video from "@components/Video";
import { useGlobalContext } from "@contexts/GlobalProvider";
import { icons } from "@constants";
import { createVideo } from "@lib/appwrite";


export default function Create() {
	const { user } = useGlobalContext();

	interface FormProps {
		title: string;
		video: any;
		thumbonail: any;
		prompt: string;
	}
	const [form, setForm] = useState<FormProps>({
		title: "",
		video: null,
		thumbonail: null,
		prompt: "",
	});
	const [uploading, setUploading] = useState(false);
	const [showDialog, setShowDialog] = useState(false)
  const [msg, setMsg] = useState("");


	const submit = async () => {
		if(!form.title || !form.video || !form.thumbonail || !form.prompt) {
			setMsg("Please fill all nesseccary fields");
      setShowDialog(true);
		} else {
			setUploading(true);
			try {
				console.log(form);
				await createVideo({...form, userId: user.$id});
				router.push("/home");
			} catch(err) {
				setMsg("Error when uploading the videos and thumbonail");
				setShowDialog(true);
			} finally {
				setForm({
					title: "",
					video: null,
					thumbonail: null,
					prompt: "",
				});
				setUploading(false);
			}
		}
	}

	const openPicker = async (documentType: string) => {
		const result = await DocumentPicker.getDocumentAsync({
			type: documentType === "image" 
			? ['image/png', 'image/jpg', 'image/jpeg']
			: ['video/mp4', 'video/gif']
		});
		if (!result.canceled) {
			if(documentType === "image") {
				setForm({...form, thumbonail: result.assets[0]});
			}
			if(documentType === "video") {
				setForm({...form, video: result.assets[0]});
			}
		} 
	}

	return (
		<SafeAreaView className="bg-primary h-full px-4 pt-4">
			<ScrollView className="ralative">
				<Text className="text-2xl text-white font-psemibold">Upload Video</Text>
				<FormField 
					title="Video Title"
					value={form.title}
					placeHolder="Give your video a catch title..."
					handleChangeText={(e) => setForm({
						...form, title: e.nativeEvent.text
					})}
					otherStyle="mt-10"
				/>
				<View className="mt-7 space-y-2">
					<Text className="text-base text-gray-100 font-pmedium">
						Upload Video
					</Text>
					<TouchableOpacity 
						onPress={() => openPicker("video")}
					>
						{form.video ? (
							<Video uri={form.video.uri}/>
						) : (
						<View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center">
							<View className="w-14 h-14 border berder-dashed border-secondary-100 justify-center items-center">
								<Image 
									source={icons.upload}
									resizeMode="contain"
									className="h-1/2 w-1/2"
								/>
							</View>
						</View>
						)}
					</TouchableOpacity>
				</View>
				<View className="mt-7 space-y-2">
					<Text className="text-base text-gray-100 font-pmedium">
						Thumbonail Image
					</Text>
					<TouchableOpacity
						onPress={() => openPicker("image")}
					>
						{form.thumbonail ? (
							<Image 
								source={{ uri: form.thumbonail.uri }}
								className="w-full h-64 rounded-2xl mt-4"
								resizeMode= "cover"
							/>
						) : (
						<View className="w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center border-2 border-black-200 flex-row space-x-2">
							<Image 
								source={icons.upload}
								resizeMode="contain"
								className="h-5 w-5"
							/>
							<Text className="text-sm text-gray-100 font-pmedium">
								Choose a file
							</Text>
 						</View>
						)}
					</TouchableOpacity>
				</View>
				<FormField 
					title="Prompt"
					value={form.prompt}
					placeHolder="Give a description about the video"
					handleChangeText={(e) => setForm({
						...form, prompt: e.nativeEvent.text
					})}
					otherStyle="mt-7"
				/>
				<CustomButton 
					title="Publish"
         	containerStyle="mt-7"
         	handelPress={submit}
         	isLoading={uploading}
				/>
				<DialogBoxWithOption 
          title={msg} 
          textTitle="close" 
          showDialog={showDialog} 
          setShowDialog={setShowDialog}
        />

        {uploading && (
          <LoadingDialog title="Publishing..."/>
        )}

			</ScrollView>
		</SafeAreaView>
	)
}