import { 
	Account, 
	Client, 
	ID, 
	Avatars, 
	Databases,
	Query,
	Models,
	Storage,
	ImageGravity
} from 'react-native-appwrite';

const appwriteConfig = {
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
const storage = new Storage(client);

interface CreateUserProps {
	email: string;
	password: string;
	username: string;
}

interface SignInProps {
	email: string;
	password: string;
}

interface CreatorType {
	avatar: string;
	username: string;
}

export interface PostType extends Models.Document {
	$id: string;
	$createdAt: string;
	creator: CreatorType;
	title: string;
	prompt: string;
	thumble: string;
	video: string;
}

interface CreateVideoProps {
	title: string;
	video: any;
	thumbonail: any;
	prompt: string;
	userId: string;
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
		throw new Error;
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
		throw new Error;
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

export const getAllPosts = async () => {
	try {
		const posts = await databases.listDocuments(
			appwriteConfig.datbaseId,
			appwriteConfig.videoCollectionId,
			[Query.orderDesc('$createdAt')]

		);
		return posts.documents as PostType[];
	} catch(error) {
		throw new Error;
	}
}

export const getLatestPosts = async () => {
	try {
		const posts = await databases.listDocuments(
			appwriteConfig.datbaseId,
			appwriteConfig.videoCollectionId,
			[Query.orderDesc('$createdAt'), Query.limit(7)]
		);
		return posts.documents as PostType[];
	} catch(error) {
		throw new Error;
	}
}

export const searchPost = async (query: string) => {
	try {
		const posts = await databases.listDocuments(
			appwriteConfig.datbaseId,
			appwriteConfig.videoCollectionId,
			[Query.search('title', query)]
		);
		return posts.documents as PostType[];
	} catch(error) {
		console.log(error);
		throw new Error;
	}
}

export const getUserPost = async (userId: string) => {
	try {
		const posts = await databases.listDocuments(
			appwriteConfig.datbaseId,
			appwriteConfig.videoCollectionId,
			[Query.equal('creator', userId), Query.orderDesc('$createdAt')]
		);
		return posts.documents as PostType[];
	} catch(error) {
		console.log(error);
		throw new Error;
	}
}


export const signOut = async () => {
	try {
		const session = await account.deleteSession('current');
		return session;
	} catch (err) {
		console.log(err);
		throw new Error;
	}
}

const getFilePreview = async (fileId: string, type: string) => {
	let fileUrl;

	try {
		if (type === "video") {
			fileUrl = await storage.getFileView(appwriteConfig.storageId, fileId); 
		} else if(type === "image") {
			fileUrl = await storage.getFilePreview(
				appwriteConfig.storageId,
				fileId,
				2000,
				2000,
				ImageGravity.Top,
				100
			);
		} else {
		throw new Error("Inavlid type of file");
		}
		if (!fileUrl) {
		throw new Error("No file found");
		}
		return fileUrl;
	} catch(err) {
		console.error(err);
		throw new Error;
	}
}

const uploadFile = async (file: any, type: string) => {
	const asset = {
		name: file.name,
		type: file.mimeType,
		uri: file.uri,
		size: file.size
	};
	console.log(asset);
	try {
		const res = await storage.createFile(
			appwriteConfig.storageId,
			ID.unique(),
			asset
		);
		const fileUrl = await getFilePreview(res.$id, type);
		return fileUrl;
	} catch (err) {
		console.error(err);
		throw new Error;
	}
}

export const createVideo = async (form: CreateVideoProps) => {
	try {
		console.log(form);
		const [thumbonailUrl, videoUrl] = await Promise.all([
			uploadFile(form.thumbonail, "image"),
			uploadFile(form.video, "video")
	]);

		const newPost = await databases.createDocument(
			appwriteConfig.datbaseId,
			appwriteConfig.videoCollectionId,
			ID.unique(), 
			{
				title: form.title,
				prompt:form.prompt,
				thumble: thumbonailUrl,
				video: videoUrl,
				creator: form.userId
			}
		);

		return newPost;
	} catch(err) {
		console.error(err);
		throw new Error;
	}
}