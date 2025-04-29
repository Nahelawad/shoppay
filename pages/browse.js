import Header from "../components/header";
import styles from "../styles/browse.module.scss";
import { connectDb,disconnectDb } from "../utils/db";
import Product from "../models/Product";
import Category from "../models/Category";
import SubCategory from "../models/SubCategory";
import { filterArray,removeDuplicates,randomize} from "../utils/arrays_utils";
import Link from "next/link";
import ProductCard from "../components/productCard";
import CategoryFilter from "../components/browse/CategoryFilter";
import SizesFilter from "../components/browse/SizesFilter";
import BrandsFilter from "../components/browse/BrandsFilter";
import StylesFilter from "../components/browse/stylesFilter";
import HeadingFilters from "../components/browse/headingFilters";
import { useRouter } from "next/router";
export default function Browse({categories,products,subCategories,sizes,brands,stylesData,price}){

    const router = useRouter();

    const filter =({search,category,brand,style,size,price,shipping})=>{
        const path=router.pathname;
        const {query} = router;

        if(search) query.search=search;
        if(category) query.category=category;
        if(brand) query.brand=brand;
        if(style) query.style=style;
        if(size) query.size=size;
        if(price) query.price=price;
        if(shipping) query.shipping=shipping;

        router.push({
            pathname:path,
            query:query,
        });
    };

    const searchHandler = (search)=>{
        if (search == ""){
            filter({search:{}});
        }else{
            filter({search});
        }
    };

    const categoryHandler = (category)=>{
            filter({category});
        
    };

    const brandHandler = (brand)=>{
        filter({brand});
    
};

const styleHandler = (style)=>{
    filter({style});

};

const sizeHandler = (size)=>{
    filter({size});

};

const multiPriceHandler = (min,max)=>{
    filter({price:`${min}_${max}`});
};


const priceHandler=(price,type)=>{
    let priceQuery=router.query.price?.split("_") || "";
    let min=priceQuery[0] || "";
    let max=priceQuery[1] || "";
    let newPrice="";

    if(type==="min"){
        newPrice = `${price}_${max}`;
    }else{
        newPrice = `${min}_${price}`;
    }

    filter({price: newPrice})
}

const shippingHandler=(shipping)=>{
    filter({shipping});
}

function checkChecked(queryName,value){
    if(router.query[queryName]?.search(value) !==-1){
        return true;
    }
    return false;
 }

 function replaceQuery(queryName, value) {
    const existedQuery = router.query[queryName];
    let result = "";
  
    if (existedQuery) {
      const valuesArray = existedQuery.split("_").filter(Boolean);
  
      if (valuesArray.includes(value)) {
        const filtered = valuesArray.filter((v) => v !== value);
        result = filtered.join("_"); 
      } else {
        result = [...valuesArray, value].join("_");
      }
    } else {
      result = value;
    }
  
    return {
      result,
      active: existedQuery?.split("_").includes(value),
    };
  }
  
  

     
       return (
        <div className={styles.BrowseHeader}>
           <Header searchHandler={searchHandler} country="UK"/>

           <div className={styles.browse__container}>
            <div className={styles.browse__path}>
                Home/Browse
            </div>

            <div className={styles.browse__tags}>
                {
                    categories.map((c)=>(
                        <Link href="" key={c._id}>
                            {
                                c.name
                            }
                        
                        </Link>
                    ))
                }

            </div>

            <div className={styles.browse__store}>
                <div className={`${styles.browse__store_filters} ${styles.scrollbar}`}>
                    <button className={styles.browse__clearBtn}>
                        Clear All (3)
                    </button>
                    <CategoryFilter categories={categories} subCategories={subCategories} categoryHandler={categoryHandler} replaceQuery={replaceQuery}/>
                    <SizesFilter sizes={sizes} sizeHandler={sizeHandler}/>
                    <BrandsFilter brands={brands} brandHandler={brandHandler} replaceQuery={replaceQuery}/>
                    <StylesFilter data={stylesData} styleHandler={styleHandler} replaceQuery={replaceQuery}/>
                </div>
                

                <div className={styles.browse__store_products_wrap}>
                    <HeadingFilters priceHandler={priceHandler} multiPriceHandler={multiPriceHandler} shippingHandler={shippingHandler} replaceQuery={replaceQuery}/>
                    <div className={styles.browse__store_products}>
                        {
                            products.map((product)=>(
                                <ProductCard product={product} key={product._id}/>
                            ))
                        }

                    </div>
                </div>

            </div>

           </div>

           
        </div>
       )
        
     
        
}


export async function getServerSideProps(context) {
  const {query} = context;

  const searchQuery=query.search || "";
  const categoryQuery=query.category || "";

  const priceQuery=query.price?query.price.split("_"): [];
  const shippingQuery=query.shipping || 0;

 

  const brandQuery=query.brand?query.brand.split("_") : [];
  const brandRegex = `^${brandQuery[0] || ""}`;
  const brandSearchRegex=createRegex(brandQuery,brandRegex);

  const styleQuery=query.style?query.style.split("_") : [];
  const styleRegex = `^${styleQuery[0] || ""}`;
  const styleSearchRegex=createRegex(styleQuery,styleRegex);
//---------------------------------------------------------------
  const sizeQuery=query.size?query.size.split("_") : [];
  const sizeRegex = `^${sizeQuery[0] || ""}`;
  const sizeSearchRegex=createRegex(sizeQuery,sizeRegex)


 const search =searchQuery && searchQuery !==""?{
    name:{
        $regex:searchQuery,
        $options:"i",
    }
 }: {};

 const category=categoryQuery && categoryQuery !=="" ?{category:categoryQuery}:{};

 
 const brand =brandQuery.length>0 ?{
    brand:{
        $regex:brandSearchRegex,
        $options:"i",
    },
 }: {};

 const style =styleQuery.length>0?{
    "details.value":{
        $regex:styleSearchRegex,
        $options:"i",
    },
 }: {};

 const size =sizeQuery.length>0 ?{
    "subProducts.sizes.size":{
        $regex:sizeSearchRegex,
        $options:"i",
    },
 }: {};


 const price = priceQuery.length > 0 ? {
    "subProducts.sizes.price": {
      ...(priceQuery[0] ? { $gte: Number(priceQuery[0]) } : {}),
      ...(priceQuery[1] ? { $lte: Number(priceQuery[1]) } : {}),
    }
  } : {};

  const shipping= shippingQuery && shippingQuery == "0"?{
    shipping:0,
  }:{};
  





 function createRegex(data,styleRegex){
   
    if(data.length>1){
        for(var i=1; i<data.length; i++){
            styleRegex +=`|^${data[i]}`;
        }
    }

    return styleRegex;
 }

 



    connectDb();
    let ProductsDb=await Product.find({...search,...category,...brand,...style,...size,...price,...shipping}).sort({createdAt:-1 }).lean();
    let products=randomize(ProductsDb);
    let categories=await Category.find().lean();
    let subCategories=await SubCategory.find().
    populate({
        path:"parent",
        model:Category,
    })
    .lean();

    let colors=await Product.find().distinct("subProducts.color.color");
    let brandsDb= await Product.find({...category}).distinct("brand");
    let sizesDB=await Product.find({...category}).distinct("subProducts.sizes.size");
    let details=await Product.find().distinct("details");
    let stylesDb= filterArray(details,"Style");
    let styles=removeDuplicates(stylesDb);
    let sizes=removeDuplicates(sizesDB);
    let brands=removeDuplicates(brandsDb);
    
    console.log(randomize(sizes));
    console.log(ProductsDb);

    return{
        props:{
            categories:JSON.parse(JSON.stringify(categories)),
            products:JSON.parse(JSON.stringify(products)),
            subCategories:JSON.parse(JSON.stringify(subCategories)),
            sizes,
            colors,
            brands,
            stylesData:styles,
        },
    };
     
    
}