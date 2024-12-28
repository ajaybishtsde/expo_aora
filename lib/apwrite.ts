import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from "react-native-appwrite";
export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.expo.aora",
  projectId: "676fecfb002145192948",
  databaseId: "676feeb30000e99bbaca",
  userCollectionId: "676feedd000e39a12f16",
  videoCollectionId: "676fef05002ca8c0b3b5",
  storageId: "676ff0b9000f012a9f9d",
};

const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
// Register User
type userDataType = {
  email: string;
  username: string;
  password: string;
};
export const createUser = async (
  email: string,
  password: string,
  username: string
) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!newAccount) throw new Error("something went worng");
    const avatarUrl = avatars.getInitials(username);
    await signIn(email, password);
    const newUser = databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );
    return newUser;
  } catch (error) {
    console.log("error>>>>>>>>>", error);
    throw new Error("SOmething went wrong");
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.log("error>>>>>>>>>.", error);
    throw new Error("Something went wrong...");
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = account.get();
    if (!currentAccount) throw Error;
    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", (await currentAccount).$id)]
    );
    if (!currentUser) throw Error;
    return currentUser.documents[0];
  } catch (error) {
    console.log("error>>>>>>>>>>>>>", error);
    throw new Error("Something went wrong");
  }
};
