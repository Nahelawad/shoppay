import React from "react";
import styles from "./styles.module.scss";
import { HashLoader } from "react-spinners";
export default function DotLoaderspinner({loading}){
    return <div className={styles.loader}>
    
    <HashLoader color="#4e00f8" loading={loading}/>

    </div>;
}