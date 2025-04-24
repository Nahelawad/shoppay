import styles from "../styles.module.scss";
import { useState } from "react";
import { FaMinus } from "react-icons/fa";
import { BsPlusLg } from "react-icons/bs";

export default function Card({category}){
    const [show,setShow]=useState(true);
    return (
        <>
            <section>
                <li>
                    <input type="radio" name="filter" id={category._id}/>
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