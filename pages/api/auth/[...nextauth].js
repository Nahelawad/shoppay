import NextAuth from 'next-auth'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import clientPromise from "./lib/mongodb";
import User from "../../../models/User";
import bcyrpt from "bcrypt";
import {connectDb} from "../../../utils/db";
import CredentialsProvider from "next-auth/providers/credentials";

connectDb();
export default NextAuth({
  adapter:MongoDBAdapter(clientPromise),
  providers: [
    // OAuth authentication providers...

    CredentialsProvider({
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
         
        const email=credentials.email;
        const password=credentials.password;
        const user=await User.findOne({email});


        if (user) {
         
          return SignInUser({password,user});
        } else {
          
  
          throw new Error("This email does not exist.")

        }
      }
    }),
   
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),

   
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    
    
  ],

  callbacks:{
    async session({session,token}){
      let user=await User.findById(token.sub);
      session.user.id=token.sub ||user._id.toString();
      session.user.role=user.role || "user";
      token.role=user.role || "user";
      return session;
    }

  },

  pages:{
  signIn:"/signin",
  },
  session:{
    strategy:"jwt",
  },
  secret:process.env.JWT_SECRET,
});

const SignInUser=async ({password,user})=>{
  if(!user.password){
    throw new Error("Please enter your password.");
  }
  const testPasword =await bcyrpt.compare(password,user.password);
  
  if(!testPasword){
    throw new Error("Email or password is wrong");
  }
  return user;
  

};