import { useDispatch } from "react-redux";
import styles from "./styles.module.scss";
import { useRef } from "react";
import { ErrorMessage, useField } from "formik";
import { showDialog } from "../../../../store/DialogSlice";
import { RiDeleteBin7Fill, RiShape2Line } from "react-icons/ri";
import { GiExtractionOrb } from "react-icons/gi";


export default function Images({images,setImages,header,text,name,setColorImage,...props}){
    const dispatch=useDispatch();
    const fileInput=useRef(null);
    console.log("images",images)
    const [meta,field]=useField(props);
    const handleImages =(e)=>{
        let files=Array.from(e.target.files);
        files.forEach((img,i)=>{
            if(i==5 || images.length==6){
                dispatch(showDialog({
                    header:"Maximum 6 images are allowed",
                    msgs:[{
                        msg: "Maximum of 6 images are allowed",
                        type:"error",

                    },
                ],
                })
            
           
            );
                return;
            }
            if(img.type!=="image/jpeg"
                && img.type!=="image/png"
                && img.type!=="image/webp"
            ){
                dispatch(showDialog({
                    header:"Unsupported Format",
                    msgs:[{
                        msg: `${img.name} format is not supported only JPEG,PNG,WEBP are allowed`,
                        type:"error",

                    },
                ],
                })
            
           
            );
            files=files.filter((item)=>item!==img.name);
            return
            }else if(img.size>1024*1024*10){
                dispatch(showDialog({
                    header:"Maximum 6 images are allowed",
                    msgs:[{
                        msg: "size is too larege maximum 10mb allowed",
                        type:"error",

                    },
                ],
                })
            
           
            );
                return;
            }else{
                const reader =new FileReader();
                reader.readAsDataURL(img);
                reader.onload=(e)=>{
                    setImages((images)=>[...images,e.target.result]);
                };
            }

        });
    };

    const handleRemove=(image)=>{
       setImages((images)=>images.filter((item)=>item !==image));
    };
    return (
        <div className={styles.images}>
            <div 
            className={`${styles.header} ${meta.error? styles.header__error:""}`}>

            
            <div className={styles.flex}>
                {
                    meta.error && <img src="../../../images/warning.png"/>
                }

                {header}
            </div>
            <span>
                {
                    meta.touched && meta.error && <div className={styles.error__msg}>
                        <span></span>
                        <ErrorMessage name={name}/>
                    </div>
                }
            </span>
            </div>

            <input type="file" name={name} ref={fileInput} hidden multiple accept="image/jpeg,image/png,image/webp" onChange={handleImages} />

            <div className={styles.images__main}>
                <div className={`${styles.images__main_grid} ${
                    images.length==2 ? styles.grid__two:
                    images.length==3 ? styles.grid__three:
                    images.length==4 ? styles.grid__four:
                    images.length==5 ? styles.grid__five:
                    images.length==6 ? styles.grid__six:
                    ""

                }`}>

                    {
                        !images.length?<img src="../../../images/no_image.png"/>:
                        (
                            images.map((img,i)=>(
                                <div className={styles.images__main_grid_wrap} key={i}>
                                    <div className={styles.blur}>
                                    </div>
                                    <img src={img} alt=""/>
                                    <div className={styles.images__main_grid_actions}>

                                        <button onClick={()=>handleRemove(img)}>
                                            <RiDeleteBin7Fill/>
                                        </button>

                                        <button onClick={()=>setColorImage(img)}>
                                            <GiExtractionOrb/>
                                        </button>

                                        <button>
                                            <RiShape2Line/>
                                        </button>


                                    </div>
                                </div>
                            ))
                        )
                    }


                </div>
            </div>
            <button type="reset" disabled={images.length==6}
            style={{opacity:`${images.length==6 && "0.5"}`}}
            onClick={()=>fileInput.current.click()}
            className={`${styles.btn} ${styles.btn__primary}`}
            
            >
                Add Images

            </button>
            
        </div>
    )
}