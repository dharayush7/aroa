import { Text, View, ScrollView, Image, Alert } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from "react";
import { Link, router } from "expo-router";
import { images } from "@constants";
import FormField from "@components/FormField";
import CustomButton from "@components/CustomButton";
import { createUser, getCurrentUser } from "@lib/appwrite";
import { useGlobalContext } from "@contexts/GlobalProvider";

export default function SignUp() {

	const [form, setForm] = useState({
		username: "",
		email: "",
		password: "",
	});

	const[isSubmitting, setSubmitting] = useState(false);
  const { setUser, setIsLoggedIn } = useGlobalContext();

	const submit = async () => {
    if(!form.email || !form.password || !form.username) {
      Alert.alert('Error', 'Please fill all the fields');
    } else {
      setSubmitting(true);
      try{
        const result = await createUser({
          email: form.email,
          password: form.password,
          username: form.username
        });
        const user = await getCurrentUser();
        setUser(user);
        setIsLoggedIn(true);
        router.replace("/home");
      } catch(error) {
        Alert.alert("Error", "");
        console.log(error);
      } finally {
        setSubmitting(false)
      }
    }
	}

	return (
		<SafeAreaView className="bg-primary h-full">
			<ScrollView>
				<View className="w-full min-h-[85vh] px-4 my-4 justify-center">
					<Image 
						source={images.logo} 
						className="w-[115px] h-[35px]"
					/>
					<Text className="text-2xl text-white text-semibold mt-10 font-semibold">
						 Sign up to Aora
					</Text>

					<FormField 
          title="userName"
          value={form.username}
          handleChangeText={(e) => setForm({
            ...form,
            username: e.nativeEvent.text,
          })}
          otherStyle="mt-10"
         />

					<FormField 
          title="Email"
          value={form.email}
          handleChangeText={(e) => {
            setForm({
                      ...form,
                      email: e.nativeEvent.text,
                    });
          }}
          otherStyle="mt-7"
          keybordType="email-address"
         /> 

         <FormField 
          title="Password"
          value={form.password}
          handleChangeText={(e) => setForm({
            ...form,
            password: e.nativeEvent.text
          })}
          otherStyle="mt-7"
         />

         <CustomButton 
         	title="Sign Up"
         	containerStyle="mt-7"
         	handelPress={submit}
         	isLoading={isSubmitting}
         />
         <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Already have an account?
            </Text>
            <Link
              href="/sign-in"
              className="text-lg font-psemibold text-secondary"
            >
              Signin
            </Link>
          </View>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}