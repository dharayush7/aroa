import { 
	Account, 
	Client, 
	ID, 
	Avatars, 
	Databases,
	Query
} from 'react-native-appwrite';

export const appwriteConfig = {
	endpoint: process.env.EXPO_PUBLIC_ENDPOINT!,
	platform: process.env.EXPO_PUBLIC_PLATFORM!,
	projectId: process.env.EXPO_PUBLIC_PROJECT_ID!,
	datbaseId: process.env.EXPO_PUBLIC_DATABASE_ID!,
	userCollectionId: process.env.EXPO_PUBLIC_USER_COLLECTION_ID!,
	videoCollectionId: process.env.EXPO_PUBLIC_VIDEO_COLLECTION_ID!,
	storageId: process.env.EXPO_PUBLIC_STORAGE_ID!
}

const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform) ;

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

interface CreateUserProps {
	email: string;
	password: string;
	username: string;
}

interface SignInProps {
	email: string;
	password: string;
}

export const createUser = async (
	{ email, password, username }: CreateUserProps
) => {
	try{
		const newAccount = await account.create(
			 ID.unique(),
			 email,
			 password,
			 username
			);
		if (!newAccount) throw Error;

		const avatarUrl = avatars.getInitials(username);
		await signIn({email, password});

		const newUser = await databases.createDocument(
			appwriteConfig.datbaseId,
			appwriteConfig.userCollectionId,
			ID.unique(),
			{
				accountId: newAccount.$id,
				email,
				username,
				avatar: avatarUrl
			}
		)

		return newUser;
	} catch (error) {
		console.error(error);
		throw new Error(error as string)
	}
}

export const signIn = async (
	{ email, password }: SignInProps
) => {
	try{
		const session = await account.createEmailPasswordSession(email, password);
		return session;
	} catch(error) {
		console.error(error);
		throw new Error(error as string);
	}
}


export const getCurrentUser = async () => {
	try {
		const currentAccount = await account.get();
		if (!currentAccount) throw Error;

		const currentUser = await databases.listDocuments(
			appwriteConfig.datbaseId,
			appwriteConfig.userCollectionId,
			[Query.equal('accountId', currentAccount.$id)]
		);

		if (!currentUser) throw Error;

		return currentUser.documents[0];

	} catch(error) {
		console.error(error);
	}
}
