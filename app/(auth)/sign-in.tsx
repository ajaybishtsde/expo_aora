import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import InputFiled from "@/components/inputFiled";
import CustomButton from "@/components/customButton";
import { Link, router } from "expo-router";
import { signIn } from "@/lib/appwrite";
interface FormType {
  email: string;
  password: string;
}
const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormType>({
    email: "",
    password: "",
  });
  const handleSubmit = async () => {
    console.log("formData>>>>>>>>>>>>>>>>>>>>>>>>>>", formData);
    if (!formData.email || !formData.password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    setIsSubmitting(true);

    try {
      await signIn(formData.email, formData.password);
      // todo:Set user to global context
      router.replace("/home");
    } catch (error: unknown) {
      console.log("error", error);
      Alert.alert("Error", (error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="h-[35px] w-[115px]"
          />
          <Text className="font-psemibold text-2xl text-white mt-10">
            Log in to Aora
          </Text>
          <InputFiled
            title="Email"
            value={formData.email}
            otherStyle="mt-7"
            handleChangeText={(text: string) =>
              setFormData(() => ({ ...formData, email: text }))
            }
            keyboardType="email-address"
            placeholder="Enter your email"
          />
          <InputFiled
            title="Password"
            value={formData.password}
            otherStyle="mt-7"
            handleChangeText={(text: string) =>
              setFormData(() => ({ ...formData, password: text }))
            }
            placeholder="Enter your password"
          />
          <CustomButton
            title="Sign In"
            containerStyle="mt-7"
            handlePress={handleSubmit}
            isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-secondary"
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
