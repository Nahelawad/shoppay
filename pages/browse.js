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
export default function Browse({categories,products,subCategories}){

     
       return (
        <div className={styles.BrowseHeader}>
           <Header country="UK"/>

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
                    <CategoryFilter categories={categories} subCategories={subCategories}/>
                </div>
                <div className={styles.browse__store_products_wrap}>
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
    connectDb();
    let ProductsDb=await Product.find().sort({createdAt:-1 }).lean();
    let products=randomize(ProductsDb);
    let categories=await Category.find().lean();
    let subCategories=await SubCategory.find().
    populate({
        path:"parent",
        model:Category,
    })
    .lean();

    let colors=await Product.find().distinct("subProducts.color.color");
    let brandsDb= await Product.find().distinct("brand");
    let sizes=await Product.find().distinct("subProducts.sizes.size");
    let details=await Product.find().distinct("details");
    let stylesDb= filterArray(details,"Style");
    let patternsDb= filterArray(details,"Pattern Type");
    let materialsDb=filterArray(details,"Material");
    let styles=removeDuplicates(stylesDb);
    let patterns=removeDuplicates(patternsDb);
    let materials=removeDuplicates(materialsDb);
    
    console.log(randomize(sizes));
    console.log(sizes);

    return{
        props:{
            categories:JSON.parse(JSON.stringify(categories)),
            products:JSON.parse(JSON.stringify(products)),
            subCategories:JSON.parse(JSON.stringify(subCategories)),
        },
    };
     
    
}