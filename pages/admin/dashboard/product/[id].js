
import Layout from "../../../../components/admin/layout";
import styles from "../../../../styles/products.module.scss";
import { connectDb, disconnectDb } from "../../../../utils/db";
import Product from "../../../../models/Product";
import Category from "../../../../models/Category";
import ProductCard from "../../../../components/admin/products/productCard";
import mongoose from "mongoose";



export default function ProductDetails({ product }) {
  if (!product) return <Layout><div>Product not found.</div></Layout>;

  console.log("product",product);

  return (
    <Layout>
      <div className={styles.header}>
        Product Details
      </div>

      <ProductCard product={product} key={product._id}/>

  
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return { notFound: true };
  }

  await connectDb();
  const product = await Product.findById(id)
    .populate({ path: "category", model: Category })
    .lean();
  await disconnectDb();

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}
