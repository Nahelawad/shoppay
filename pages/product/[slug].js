import styles from "../../styles/product.module.scss";
import { connectDb,disconnectDb } from "../../utils/db";
import Category from "../../models/Category";
import Product from "../../models/Product";
import SubCategory from "../../models/SubCategory";
import User from "../../models/User";
import Head from "next/head";
import Header from "../../components/header"
import Footer from "../../components/footer";
import { model } from "mongoose";
import MainSwiper from "../../components/productPage/mainSwiper/index";
import { useState } from "react";
import Infos from "../../components/productPage/infos";
import Reviews from "../../components/productPage/reviews";

export default function product({product}){
const [activeImg,setActiveImg]=useState("");
console.log("reviews",product.reviews);
  
    return <>
        <Head>
          <title>{product.name}</title>
        </Head>
        <Header country="UK"/>
        <div className={styles.product}>
          <div className={styles.product__container}>
            <div className={styles.path}>
              Home/{product.category.name}/
              {
                product.subCategories.map((sub)=>(
                  <span>/{sub.name}</span>
                ))
              }

            </div>

            <div className={styles.product__main}>

              <MainSwiper images={product.images} activeImg={activeImg}/>

              <Infos product={product} setActiveImg={setActiveImg}/>

            </div>
            <Reviews product={product}/>


          </div>

        </div>
    </>
}

export async function getServerSideProps(context) {
  const { query } = context;
  const slug = query.slug;
  const style = query.style || 0;
  const size = query.size || 0;
  const reviews = query.review || 0;

  connectDb();

  let products = await Product.find()
    .sort({ createdAt: -1 })
    .lean()
    .populate({ path: "category", model: Category })
    .populate({ path: "subCategories", model: SubCategory })
    .populate({ path: "reviews.reviewBy", model: User })
    ;

  let product = products.find((product) => product.slug === slug);

  if (!product) {
    return {
      notFound: true,
    };
  }

  let subProduct = product.subProducts?.[style];

  let prices = subProduct.sizes
    .map((s) => s.price)
    .sort((a, b) => a - b);

  let newProduct = {
    ...product,
    style,
    images: subProduct.images,
    sizes: subProduct.sizes,
    discount: subProduct.discount,
    sku: subProduct.sku,
    colors: product.subProducts.map((p) => p.color),
    PriceRange:
    subProduct.discount? 
    `From ${(prices[0]/subProduct.discount).toFixed(2)} to ${(prices[prices.length - 1]-prices[prices.length-1]/subProduct.discount).toFixed(2)}£`
    : `From ${prices[0]} to ${prices[prices.length - 1]}£`
      ,
    price:
      subProduct.discount > 0
        ? (
            subProduct.sizes[size].price -
            subProduct.sizes[size].price / subProduct.discount
          ).toFixed(2)
        : subProduct.sizes[size].price,
    priceBefore: subProduct.sizes[size].price,
    quantity: subProduct.sizes[size].qty,
    ratings: [
      { percentage: calculatePercentage("5") },
      { percentage: calculatePercentage("4") },
      { percentage: calculatePercentage("3") },
      { percentage: calculatePercentage("2") },
      { percentage: calculatePercentage("1") },
    ],
    reviews:product.reviews.reverse(),
    allSizes: product.subProducts
      .map((p)=>{
      return p.sizes;
    }).flat().sort((a,b)=>{
      return a.size-b.size;
    }).filter((element,index,array)=>
      array.findIndex((el2)=>el2.size===element.size)=== index
),

  };

  function calculatePercentage(num){
    return(((product.reviews.reduce((a,review)=>{
      return a+(review.rating == Number(num) || review.rating== Number(num)+0.5);
    },0)*100))/product.reviews.length).toFixed(1);
  }

  disconnectDb();

  return {
    props: {
      product: JSON.parse(JSON.stringify(newProduct)), 
    },
  };
}





