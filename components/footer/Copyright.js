import React from "react";
import styles from './styles.module.scss';
import Link from "next/link";
import { FaLocationDot } from "react-icons/fa6";

export default function Copyright({country}){
    return(
        <div className={styles.footer__copyright}>
            <section>©2024 SHOPPAY ALL RIGHTS RESERVED.</section>
            <section>
                <ul>
                    {
                        data.map((link)=>(
                            <li>
                                <Link href={link.link}>{link.name}</Link>
    
                            </li>
                        ))}
                        <li>
                            <a>
                            <FaLocationDot /> {country.name}
                            </a>
                        </li>

                    
                </ul>
            </section>
        </div>
    )
}

const data=[
    {
        name:"Privacy Center",
        link:"",
    },
    {
        name:"Privacy & Cookie Policy",
        link:"",
    },
    {
        name:"Manage Cookies",
        link:"",
    },
    {
        name:"Terms & Conditions",
        link:"",
    },
    {
        name:"Copyright Notice",
        link:"",
    },
];