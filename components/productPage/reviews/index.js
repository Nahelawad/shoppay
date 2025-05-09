import { Rating } from "@mui/material";
import styles from "./styles.module.scss";
import { useSession,signIn } from "next-auth/react";
import AddReview from "./AddReview";
import { useState } from "react";
import Table from "./Table";

export default function Reviews({product}){
  const {data:session}=useSession()
  const [rating,setRating]=useState("");
  const[reviews,setReviews]=useState(product.reviews.reverse());
    return <div className={styles.reviews}>
        <div className={styles.reviews__container}>
            <h1> Customer Reviews ({product.reviews.length})</h1>
            <div className={styles.reviews__stats}>
                <div className={styles.reviews__stats_overview}>
                  <span> Average Rating </span>  

                  <div className={styles.reviews__stats_overview_rating}>
                    <Rating
                      name="half-rating-read"
                      defaultValue={product.rating}
                      precision={0.5}
                      readOnly
                      style={{color:"yellow",width:"200px"}}
                      
                    />
                    {product.rating ==0? "No review yet":product.rating}
                  </div>
                </div>

                <div className={styles.reviews__stats_reviews}>
                  {
                    product.ratings.map((rating,i)=>(
                      <div className={styles.reviews__stats_reviews_review}>
                            <Rating
                      name="half-rating-read"
                      defaultValue={5-i}
                      readOnly
                      style={{color:"yellow",width:"120px"}}
                    /> 
                      <div className={styles.bar}>
                        <div className={styles.bar__inner}
                        style={{width:`${rating.percentage}%`}}
                        >
                        </div>
                      </div>
                      <span>{rating.percentage}%</span>
                      </div>
                    ))
                  }
                </div>

            </div>
            {
              session ? (<AddReview product={product} setReviews={setReviews}/>):(
              <button
              onClick={()=>signIn()}
              className={styles.login_btn}>Log in to add review</button>
            )}
            <Table reviews={reviews}/>
        </div>
    </div>
}