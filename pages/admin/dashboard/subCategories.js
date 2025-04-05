import Category from "../../../models/Category";
import subCategory from "../../../models/SubCategory";
import Layout from "../../../components/admin/layout";
import { connectDb,disconnectDb } from "../../../utils/db";
import { useState,useEffect } from "react";
import Create from "../../../components/admin/subCategories/Create";
import List from "../../../components/admin/subCategories/list";

export default function subCategories({categories,subCategories}){
    const [data,setData]=useState(subCategories);
    useEffect(() => {
        console.log("Updated Data:", data);
    }, [data]);
    return(
           <Layout>
            <div>
                <Create setSubCategories={setData} categories={categories}/>
                
                    
                    <List categories={categories} subCategories={data} setSubCategories={setData}/>
                    
                
             
            </div>
           </Layout>
        
    );
}

export async function getServerSideProps(context) {
 connectDb()

 const categories=await Category.find({}).sort({updatedAt:-1}).lean();
 const subCategories=await subCategory.find({})
 .populate({path:"parent",model:Category})
 .sort({updatedAt:-1}).lean();


 return {
    props:{
        categories:JSON.parse(JSON.stringify(categories)),
        subCategories:JSON.parse(JSON.stringify(subCategories)),
    },
 }; 
}
