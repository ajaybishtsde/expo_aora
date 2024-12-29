import { VideoItem } from "@/typings";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { Models } from "react-native-appwrite";

const useAppwrite = (fn: any) => {
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const result: VideoItem[] = await fn();
      setData(result);
    } catch (error) {
      console.log("error", (error as Error).message);
      Alert.alert("Error", (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const refatchData = () => fetchData();
  return { data, isLoading, refatchData };
};
export default useAppwrite;
