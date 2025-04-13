import { useState } from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import { MdSpaceDashboard } from "react-icons/md";
import { IoListCircleSharp, IoNotificationsSharp } from "react-icons/io5";
import { FaThList, FaUser,FaPlus, FaHome } from "react-icons/fa";
import { RiSettings2Line } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa6";
import { signOut } from "next-auth/react";

export default function Dropdown({userImage}){
    const [show,SetShow]=useState(false);
    return <div className={styles.dropdown} onMouseOver={()=>SetShow(true)} onMouseLeave={()=>SetShow(false)}>

        <div className={styles.dropdown__toggle}>
            <img src={userImage}/>
        </div>
        <div className={`${styles.dropdown__content} ${show? styles.active:""}`}>

            <div className={styles.dropdown__content_icons}>
            <div className={styles.dropdown__content_icons_icon}>
            <Link href="/admin/dashboard">
                <MdSpaceDashboard/>
                </Link>
            </div>

                
            <div className={styles.dropdown__content_icons_icon}>
                <Link href="/admin/dashboard/orders">
                 <IoListCircleSharp/>
                </Link>
                </div>

                <div className={styles.dropdown__content_icons_icon}>
                 <Link href="/admin/dashboard/users">
                <FaUser/>                
                </Link>
                </div>


                <div className={styles.dropdown__content_icons_icon}>
                <Link href="/admin/dashboard/product/all">
                <FaThList/>
                </Link>
                </div>


                <div className={styles.dropdown__content_icons_icon}>
                <Link href="/admin/dashboard/product/create">
                <FaPlus/>
                </Link>
                </div>
                

            </div>


            <div className={styles.dropdown__content_items}>
                <div className={styles.dropdown__content_items_item}>
                    <Link href="/">
                    <FaHome/>
                    </Link>
                </div>
                <div className={styles.dropdown__content_items_item}>
                    <Link href="/">
                    <FaRegUser/>
                    </Link>
                </div>
                <div className={styles.dropdown__content_items_item}>
                    <Link href="/">
                    <IoNotificationsSharp/>
                    </Link>
                </div>
                <div className={styles.dropdown__content_items_item}>
                    <Link href="/">
                    <RiSettings2Line/>
                    </Link>
                </div>
            </div>

            <div className={styles.dropdown__logout}>

                <button onClick={()=>signOut()}>
                    Log Out
                </button>


            </div>


        </div>
    </div>
}