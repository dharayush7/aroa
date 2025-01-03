# Appwrite Configuration Guide for AROA Project

This guide will walk you through the steps of creating a new **AROA** project using **React Native** and configuring the required **Appwrite** services, including **Authentication**, **Database**, **User Collection**, **Video Collection**, and **Storage**. At the end, you will be ready to use Appwrite as your backend service for user management, video uploads, and storage.

## Table of Contents

1. [Set up Appwrite Services](#set-up-appwrite-services)
   1. [Service 1: Authentication](#service-1-authentication)
   2. [Service 2: Database](#service-2-database)
   3. [Service 3: User Collection](#service-3-user-collection)
   4. [Service 4: Video Collection](#service-4-video-collection)
   5. [Service 5: Storage](#service-5-storage)
2. [Configure .env File](#configure-env-file)

---


## 1. Set Up Appwrite Services

You’ll need to configure **Appwrite** services such as **Authentication**, **Database**, **User Collection**, **Video Collection**, and **Storage** to handle user management and file storage.

### Steps to Set Up Appwrite:

#### 1. Service 1: Authentication

1. **Log into Appwrite Console**:
   - Visit [Appwrite Console](https://appwrite.io/).
   - Log in with your credentials or create a new account.

2. **Enable Email/Password Authentication**:
   - In the Appwrite Console, navigate to **Authentication**.
   - Under **Auth Settings**, enable **Email/Password** as the authentication method.
   
3. **Save Changes**:
   - Make sure to save your changes.

#### 2. Service 2: Database

1. **Create a Database**:
   - In the Appwrite Console, go to **Database**.
   - Click **Create Database** and name it `AROA_DB` (or any name that suits your project).
   - Save the Database ID, as it will be needed later in your `.env` file.

#### 3. Service 3: User Collection

1. **Create a Collection**:
   - Under **Database**, click on **Create Collection**.
   - Name the collection `Users` and set a unique **Collection ID** (e.g., `users_collection`).

2. **Set Attributes for User Collection**:
   - Add the following attributes to the **Users** collection:

   | **Attribute Name** | **Type**  | **Default Value** | **Size** | **Required** | **Array** |
   |--------------------|-----------|-------------------|----------|--------------|-----------|
   | **username**        | String    | Blank             | 100      | Checked      | Unchecked |
   | **email**           | Email     | Blank             | N/A      | Checked      | Unchecked |
   | **avatar**          | URL       | Blank             | N/A      | Checked      | Unchecked |
   | **accountId**       | String    | Blank             | 2200     | Checked      | Unchecked |

3. **Permissions**:
   - Set permissions for the **Users** collection:
     - Add **role: any** with permissions: **CREATE**, **READ**, **UPDATE**, **DELETE**.

4. **Save the Collection**.

#### 4. Service 4: Video Collection

1. **Create a Collection for Videos**:
   - Under **Database**, click on **Create Collection**.
   - Name the collection `Videos` and set a unique **Collection ID** (e.g., `videos_collection`).

2. **Set Attributes for Video Collection**:
   - Add the following attributes:

   | **Attribute Name** | **Type**      | **Default Value** | **Size** | **Required** | **Array** |
   |--------------------|---------------|-------------------|----------|--------------|-----------|
   | **title**          | String        | Blank             | 2200     | Checked      | Unchecked |
   | **thumbnail**      | URL           | Blank             | N/A      | Checked      | Unchecked |
   | **prompt**         | String        | Blank             | 2200     | Checked      | Unchecked |
   | **video**          | URL           | Blank             | N/A      | Checked      | Unchecked |
   | **creator**        | Relationship  | N/A               | N/A      | Checked      | Unchecked |

   - The `creator` field is a **Relationship** to the `Users` collection (many-to-one). Set **On delete** to **Set NULL** to ensure that if a user is deleted, their related video data will have the `creator` field set to `NULL`.

3. **Permissions**:
   - Add **role: user** with permissions: **CREATE**, **READ**, **UPDATE**, **DELETE**.

4. **Save the Collection**.

#### 5. Service 5: Storage

1. **Create a Storage Bucket**:
   - Go to **Storage** in the Appwrite console.
   - Click on **Create Bucket** and name it `AROA_Bucket`.

2. **Set Permissions for Storage**:
   - Add **role: users** with permissions: **CREATE**, **READ**, **UPDATE**, **DELETE**.
   - Add **role: Guests** with permissions: **READ** (unchecked for CREATE, UPDATE, DELETE).

3. **Save the Bucket**.

---

## 2. Configure `.env` File

After setting up the Appwrite services, you’ll need to configure the `.env` file in your React Native project. The `.env` file will contain the required Appwrite configuration, including the endpoints and IDs for various services.

### Create `.env` File:

1. Create a `.env` file in the root directory of your project.
2. Add the following content to the `.env` file:

```plaintext
EXPO_PUBLIC_ENDPOINT=https://[YOUR_APPWRITE_ENDPOINT]
EXPO_PUBLIC_PLATFORM=com.ayushdhar.aora
EXPO_PUBLIC_PROJECT_ID=[YOUR_PROJECT_ID]
EXPO_PUBLIC_DATABASE_ID=[YOUR_DATABASE_ID]
EXPO_PUBLIC_USER_COLLECTION_ID=[USER_COLLECTION_ID]
EXPO_PUBLIC_VIDEO_COLLECTION_ID=[VIDEO_COLLECTION_ID]
EXPO_PUBLIC_STORAGE_ID=[STORAGE_BUCKET_ID]
```

### Replace Placeholders:
- **`[YOUR_APPWRITE_ENDPOINT]`**: The URL endpoint of your Appwrite server (e.g., `https://appwrite.yourdomain.com`).
- **`[YOUR_PROJECT_ID]`**: The ID of the project you created in Appwrite.
- **`[YOUR_DATABASE_ID]`**: The ID of the database (`AROA_DB`).
- **`[USER_COLLECTION_ID]`**: The ID of the `Users` collection.
- **`[VIDEO_COLLECTION_ID]`**: The ID of the `Videos` collection.
- **`[STORAGE_BUCKET_ID]`**: The ID of the storage bucket (`AROA_Bucket`).

---

## Conclusion

You have successfully created a **React Native** project and configured the required **Appwrite services** for authentication, database, user collection, video collection, and storage. Make sure to update the `.env` file with the correct Appwrite details.

Now, you can proceed to integrate the Appwrite SDK into your React Native app, authenticate users, upload videos, and interact with the database.

If you have any issues or need further assistance, feel free to reach out to the community or refer to the official Appwrite documentation at [Appwrite Docs](https://appwrite.io/docs).