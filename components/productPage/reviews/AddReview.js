import { useEffect, useState } from "react";
import Select from "./Select";
import styles from "./styles.module.scss";
import { Rating } from "@mui/material";
import Images from "./images";
import { useDispatch } from "react-redux";
import { hideDialog, showDialog } from "../../../store/DialogSlice";
import DialogModal from "../../../components/dialogModal"
import dataURItoBlob from "../../../utils/dataURItoBlob";
import { uploadImages } from "../../../requests/upload";
import axios from "axios";


export default function AddReview({product,setReviews}){
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(hideDialog());
    },[])
    const [size,setSize]=useState("");
    const [style,setStyle]=useState("");
    const [fit,setFit]=useState("");
    const [review,setReview]=useState("");
    const [rating,setRating]=useState();
    const [images,setImages]=useState([]);
    let uploaded_images=[];

    const handleSubmit =async()=>{
        let msgs=[];
        if (!style){
            msgs.push({
                msg:"Please select a Style",
                type:"error",
            });
        }
        if (!rating){
            msgs.push({
                msg:"Please select a Rating",
                type:"error",
            });
        }
        if (!review){
            msgs.push({
                msg:"Please Type Your Review",
                type:"error",
            });
        }
        if(msgs.length>0){
            dispatch(showDialog({
                header:"Addingf review error",
                msgs,
            }))
        }else{
            if(images.length>0){
                let temp=images.map((img)=>{
                    return dataURItoBlob(img);
                });
                const path="reviews images";
                let formData=new FormData();
                formData.append("path",path);
                temp.forEach((img)=>{
                    formData.append("file",img)
                });
                uploaded_images=await uploadImages(formData);
            }
            const {data}=await axios.put(`/api/product/${product._id}/review`,{
                size,
                style,
                fit,
                rating,
                review,
                images:uploaded_images,
            });
            setReviews(data.reviews);
            setStyle("");
            setSize("");
            setFit("");
            setImages([]);
            setRating("");
            setReview("");
        }
    };
    
    

    return <div className={styles.reviews__add}>
        <DialogModal/>
        <div className={styles.reviews__add_wrap}>
            <div className={styles.flex} style={{gap:"10px"}}>
                <Select
                property={size} 
                text="Size" 
                data={product.allSizes.filter((x)=>x.size !== size)}
                handleChange={setSize}/>
                
                
                <Select
                property={style} 
                text="Style" 
                data={product.colors.filter((x)=>x !== style)}
                handleChange={setStyle}/>

                <Select
                property={fit} 
                text="How does it Fit" 
                data={fits.filter((x)=>x !== fit)}
                handleChange={setFit}/>

            </div>
            <Images images={images} setImages={setImages}/>
            <textarea
              name="review"
              value={review}
              onChange={(e)=>setReview(e.target.value)}
              placeholder="Write your review here"
            />

            <Rating
            name="half-rating-read"
            defaultValue={0}
            value={rating}
            onChange={(e)=>setRating(e.target.value)}
            precision={0.5}
            style={{color:"yellow",fontSize:"3rem",width:"200px"}}
            />

           <button
           
           onClick={()=>handleSubmit()}
           className={styles.login_btn}>Submit review</button>


        </div>
    </div>
}

let fits= ["Small","True to size","Large","No fitting Item"];