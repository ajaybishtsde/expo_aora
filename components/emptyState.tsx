import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "../constants";
import CustomButton from "./customButton";
import { router } from "expo-router";
type PropsType = {
  title: string;
  subTitle: string;
};
const EmptyState: React.FC<PropsType> = ({ title, subTitle }) => {
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
      />
      <Text className="text-white text-xl font-psemibold text-center mt-2">
        {title}
      </Text>
      <Text className="text-sm font-pmedium text-gray-100 ">{subTitle}</Text>
      <CustomButton
        title="Create Video"
        handlePress={() => router.push("/create")}
        containerStyle="w-full my-4"
      />
    </View>
  );
};

export default EmptyState;
