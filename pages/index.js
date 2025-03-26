import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import Header from "../components/header";
import Footer from "../components/footer";
import axios from "axios";
import Main from "../components/home/main";
import { useSession, signIn, signOut } from "next-auth/react";
import FlashDeals from "../components/home/flashDeals";
import Category from "../components/home/category";
import { Women_dresses ,Gaming_Videogames,Mensfashion, Men_swiper} from "../data/home";
import { useMediaQuery } from 'react-responsive'
import ProductsSwiper from "../components/productSwiper/index";

import { connectDb } from "../utils/db";
import Product from "../models/Product";
import ProductCard from "../components/productCard";

export default function Home({country,products}) {
  console.log("products",products)
  const { data: session } = useSession();
  const isMedium=useMediaQuery({query:"(max-width:850px)"});
  const MobilePhone=useMediaQuery({query:"(max-width:550px)"});
  return (

    <div>
    <Header country={country}/>
    <div className={styles.home}>
      <div className={styles.container}>
        <Main/>
        <FlashDeals/>
        <div className={styles.home_category}>
        <Category
         header="Dresses"
          products={Women_dresses} 
          background="#5a31f4"
          />
          {
            !isMedium &&(
              <Category
              header="Gaming and video games"
               products={Gaming_Videogames} 
               background="#ff0000"
               />
            )
          }

{
            MobilePhone &&(
              <Category
              header="Gaming and video games"
               products={Gaming_Videogames} 
               background="#ff0000"
               />
            )
          }
          
           <Category
         header="Men's Fashion"
          products={Mensfashion} 
          background="#000000"
          />

        </div>
        <ProductsSwiper products={Men_swiper}/>
        <div className={styles.products}>
          {
            products.map((product)=>(
              <ProductCard product={product} key={product._id}/>
            ))}
        </div>
      </div>
    </div>
    <Footer country={country}/>

    </div>
  );    
       
}

export async function getServerSideProps() {
  connectDb();
  let products = await Product.find().lean();
    
  
  let data=await axios
  .get("https://api.ipregistry.co/66.165.2.7?key=ira_nQdwyi1ghX0lVOUrx6ja1XvhtEOE0u09L9I6")
  .then((res)=>{
    return res.data.location.country;
  })
  .catch((err)=>{
    console.log(err);
  });

 
  
  return{
    props:{
      products:JSON.parse(JSON.stringify(products)),
      
      //country:{name:data.name, flag:data.flag.emojitwo},
      country:{
        name:"UK",
        flag: "https://media.istockphoto.com/id/1964360577/vector/flag-of-the-united-kingdom-of-great-britain-and-northern-ireland-button-flag-icon-standard.jpg?s=612x612&w=0&k=20&c=NTxXwUSXaUuqzgZWAp_W9p1eKybYTStyIUl-eP5toWM=",
        },
        
    },
  };
  
}
