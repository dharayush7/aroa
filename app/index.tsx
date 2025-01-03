import { useEffect } from "react";
import { Text, View, ScrollView, Image } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { images } from "@constants";
import CustomButton from "@components/CustomButton";
import { useGlobalContext } from "@contexts/GlobalProvider";


export default function Home() {
  const { isLoading, isLoggedIn, setUser } = useGlobalContext();
  if(!isLoading && isLoggedIn) return <Redirect href="/home" />;
  
  useEffect(() => {
    if(!isLoading && !isLoggedIn) setUser(null);
  }, [isLoading, isLoggedIn]);

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center items-center min-h-[85vh] px-4">
          <Image 
          source={images.logo}
          className="w-[130px] h-[84px]"
          resizeMode="contain"
          />
          <Image 
          source={images.cards}
          className="max-w-[380px] w-full h-[300px]"
          resizeMode="contain"
          />

          <View className="relative mt-5">
          <Text className="text-3xl text-white font-bold text-center">
            Discover Endless
          </Text>
          <Text className="text-3xl text-white font-bold text-center">Possibilities with {" "}
            <Text className="text-secondary-200">Aora</Text>
          </Text>
          <Image 
            source={images.path}
            className="w-[65px] h-[15px] absolute" 
            style={{ bottom: -8, right: -1 }}
          />
         </View>
         <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">Where Creativity Meets Innovation: Embark on a Journey of Limitless Exploration with Aora</Text>
         <CustomButton 
         title="Continue with Email" 
         handelPress={() => router.push("/sign-in")}
         containerStyle="w-full mt-5"
         isLoading={false}
         />
         <Text className="mt-12 text-gray-100 font-pregular">Devoloped by AYUSH DHAR</Text>
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}
