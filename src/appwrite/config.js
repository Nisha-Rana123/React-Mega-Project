import conf from '../conf.js';
import {Client , Account , ID , Databases , Storage , Query} from "appwrite" ;
export class Services{
    client = new Client();
    account;
    databases;
    bucket;
    constructor(){
        this.client
                .setEndpoint(conf.appwriteUrl)
                .setProject(conf.projectId);
                this.databases = new Databases(this.client);
                this.bucket = new Storage(this.client);
            
}
//create post method
async createPost({title , slug ,content , featuredImage , status , userID}){
    try {
          return await this.databases.createDocument(
            conf.databaseId,
            conf.collectionId,
            ID.unique(),
            {title ,content , featuredImage , status , userID}

          )
    } 
    catch(error){
        throw error;
    }
}
//update post method
async updatePost({slug , title  ,content , featuredImage , status}){
try{
      return await this.databases.updateDocument(
        conf.databaseId,
        conf.collectionId,
        slug,
        {
            title ,content , featuredImage , status
        }
      )
}
catch(error){
    console.log("Appwrite service :: updatePost :: error", error)
}
}
//delete post method
async deletePost(slug){
try{
    await this.databases.deleteDocument(
        conf.DatabaseId,
        conf.CollectionId,
        slug
    )
    return true;
} catch(error){
    console.log("Appwrite service :: deletePost :: error", error)
    return false;
}
}
//get single post method
async getPosts(slug){
    try{
        return await this.databases.getDocument(
            conf.databaseId,
            conf.collectionId,
            slug
        )
        return true;
    }
    catch(error){
        console.log("Appwrite Service :: getPost :: error", error)
        return false;
    }
}
//get all posts method
async getPosts(queries =[Query.equal("status", "active")]){
    try{
        return await this.databases.listDocuments(
            conf.databaseId,
            conf.collectionId,
            queries
        )

    }
    catch(error){
console.log("Appwrite Service :: getPosts :: error", error)
        return false;
    }
}
//upload file method
async uploadFile(file){
    try{
        return await this.bucket.createFile(
            conf.bucketId,
            ID.unique(),
            file
        )
    }
    catch(error){
        console.log("Appwrite Service :: uploadFile :: error", error)
        return false;
    }
}
//delete file method
async deleteFile(fileId){
try{
await this.bucket.deleteFile(
    conf.bucketId,
    fileId
)
}

catch(error){
    console.log("Appwrite Service :: deleteFile :: error", error)
    return false;
}}
//get file preview method
getFilePreview(fileId){
    return this.bucket.getFilePreview(
        conf.bucketId,
        fileId
    )
}
}
const service = new Services();
export default service;
//test file
console.log("i am here")