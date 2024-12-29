import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";
interface InputFieldType {
  value?: string;
  placeholder: string;
  handleChangeText: (text: string) => void;
  otherStyle?: string;
  keyboardType?: string;
}
const SearchInput = ({
  value,
  placeholder,
  handleChangeText,
  otherStyle,
  ...props
}: InputFieldType) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className="border-2 border-black-200 w-full h-16 px-2 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row">
      <TextInput
        className="text-base mt-0.5 text-white flex-1 font-pregular"
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#7b7b8b"
        onChangeText={(text) => handleChangeText(text)}
      />
      <TouchableOpacity activeOpacity={0.7}>
        <Image source={icons.search} className="h-5 w-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
