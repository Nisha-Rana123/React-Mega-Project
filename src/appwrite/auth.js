 import conf from '../conf.js';

import {Client , Account,  ID } from "appwrite" ;



export class AuthService{
    client = new Client();
    account;
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.projectId);
        this.account = new Account(this.client);
    }
    //sign up method
    async createAccount({email, password , name}){
        try {
         const userAccount = await this.account.create(ID.unique(), email, password, name);
        if (userAccount) {
            //call another method
          return this.login({email, password});
        }
        else{  
            return userAccount;
        }
        }
        catch(error){
             throw error;
        }
    }
    //login method
    async login({email, password}){
        try{
          return await this.account.createEmailSession(email, password);
        }
        catch(error){
           throw error;
        }
    }
    //get current user method
    async getCurrentUser(){
        try{
            return  await this.account.get();
        }catch(error){
            throw error;
        }

    }
    //logout method
    async Logout(){
        try{
       await this.account.deleteSession();
        }catch(error){
            throw error;
        }
    }
};
const authService= new AuthService();


export  default authService;

