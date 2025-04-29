import styles from "../styles.module.scss";
import { useState } from "react";
import { FaMinus } from "react-icons/fa";
import { BsPlusLg } from "react-icons/bs";

export default function Card({category,categoryHandler,replaceQuery}){
    const [show,setShow]=useState(true);
    const check=replaceQuery("category",category._id);
    return (
        <>
            <section>
                <li onClick={()=> categoryHandler(check.active? "":category._id)}>
                    <input type="radio" name="filter" id={category._id} checked={check.active}/>
                    <label htmlFor={category._id}>
                        {
                            category.name
                        }
                    </label>

                     <span>
                                        {
                                            show? <FaMinus/> : <BsPlusLg/>
                                        }
                                    </span>
                    

                </li>
            </section>
        </>
    )
}