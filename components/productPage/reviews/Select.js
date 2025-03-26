import { useState } from "react";
import styles from "./styles.module.scss";
import { IoArrowDown } from "react-icons/io5";

export default function Select({ property, text, data,handleChange }) {
    console.log(data);

    const [visible, setVisible] = useState(false);
    console.log(data);

    return (
        <div className={styles.select}>
            {text}:
            <div className={styles.select__header}
            onMouseOver={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
            style={{
                background: `${text == "Style" && property.color && `${property.color}`
                    }`,
            }}
            
            >
                <span
                className={`${styles.flex} ${styles.select__header_wrap}`} style={{ 
                    padding: "0 5px",
                }}>
                    {
                        text=="Size"? (property || `Select ${text}`):
                        text=="Style" && property.image?(
                            <img src={property.image}/>
                        ) :(
                            text=="How does it Fit" && property ? (
                              property
                            ): !property && text == "How does it Fit"? "How does it fit": "Select style"
                        )
                    }
                    <IoArrowDown/>
                </span>
                {visible && data && (
                    <ul 
                    className={styles.select__header_menu}>
                        {data.map((item, i) => {
                            if (text === "Size") {
                                return (
                                    <li key={i} onClick={()=>handleChange(item.size)}>
                                        <span>{item.size}</span>
                                    </li>
                                );
                            }
                            if (text === "Style") {
                                return (
                                    <li key={i} onClick={()=>handleChange(item)}
                                    style={{background:`${item.color}`}}
                                    >
                                        <span>
                                            <img src={item.image}/>
                                        </span>
                                    </li>
                                );
                            }


                            if (text === "How does it Fit") {
                                return (
                                    <li key={i} onClick={()=>handleChange(item)}
                                    
                                    >
                                        <span>
                                            {item}
                                        </span>
                                    </li>
                                );
                            }
                            return null; 
                        })}
                    </ul>
                )}
            </div>
        </div>
    );
}