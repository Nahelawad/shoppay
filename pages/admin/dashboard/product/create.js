import Layout from "../../../../components/admin/layout";
import styles from "../../../../styles/products.module.scss";
import { connectDb,disconnectDb } from "../../../../utils/db";
import Product from "../../../../models/Product";
import Category from "../../../../models/Category";
import { useEffect, useState } from "react";
import axios from "axios";

const initialState={
    name:"",
    description:"",
    brand:"",
    sku:"",
    discount:0,
    images:[],
    description_images:[],
    parent:"",
    category:"",
    subCategories:"",
    color:{
        color:"",
        image:"",
    },
    sizes:[
        {
            size:"",
            qty:"",
            price:"",
        },
    ],
    details:[{
        name:"",
        value:"",
    },],
    questions:[{
        name:"",
        value:"",
    },],
    shippingFee:"",
};
export default function create({parents,categories}){
    const [product,setProduct]=useState(initialState);
    const [subs,setSubs]=useState([]);
    useEffect(()=>{
        const getParentData=async()=>{
            if(!product.parent) return;

            const {data}=await axios.post(`/api/product/${product.parent}`);
            if(data){
                setProduct({
                    ...product,
                    name:data.name,
                    description:data.description,
                    brand:data.brand,
                    category:data.category,
                    subCategories:data.subCategories,
                    questions:[],
                    details:[],
                })
            }
        };
        getParentData();

    },[product.parent]);
    useEffect(()=>{
        async function getSubs() {
            const {data}=await axios.get("/api/admin/subCategory",{
                params:{
                    category:product.category,
                },
            }
                
            );  
            setSubs(data);     
        }
        getSubs();
    },[product.category])
    return(
        <Layout>
            <div className={styles.header}>
                Create Product
            </div>

        </Layout>
    );
}


export async function getServerSideProps(context) {
    connectDb();

    const results=await Product.find().select("name subProducts").lean();
    const categories=await Category.find().lean();


    disconnectDb();

    return{
        props:{
            parents:JSON.parse(JSON.stringify(results)),
            categories:JSON.parse(JSON.stringify(categories)),
        },
    };
    
}