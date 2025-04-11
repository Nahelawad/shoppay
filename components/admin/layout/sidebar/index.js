import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.scss";
import { toggleSidebar } from "../../../../store/ExpandSlice";
import { MdArrowForwardIos, MdOutlineCategory, MdSpaceDashboard } from "react-icons/md";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FcSalesPerformance } from "react-icons/fc";
import { IoListCircleSharp, IoNotificationsSharp } from "react-icons/io5";
import { FaPlus, FaUser } from "react-icons/fa6";
import { LuMessageCircle } from "react-icons/lu";
import { FaThList } from "react-icons/fa";
import { RiCoupon2Fill, RiLogoutBoxFill, RiSettingsLine } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";

export default function Sidebar(){
    const router=useRouter();

    const route = router.pathname.replace("/admin/dashboard", "").replace(/^\//, "");
    console.log(route)
    const { data:session }=useSession();   
    const dispatch=useDispatch();
    const {expandSidebar}=useSelector((state)=>({...state}))
    const expand =expandSidebar.expandSidebar;
   const handleExpand=()=>{
    dispatch(toggleSidebar());
   }
    return(
        <div className={`${styles.sidebar} ${expand? styles.opened:""}`}>
            <div className={styles.sidebar__toggle} onClick={()=>handleExpand()}>
                 
                 <div
                 style={{transform:`${expand? "rotate(180deg)":""}`, transition:"all .4s",}
                }
                 >
                    <MdArrowForwardIos/>
                 </div>

            </div>

            <div className={styles.sidebar__container} >
                <div className={styles.sidebar__header}>
                    <span></span>
                    <span></span>
                    <span></span>

                </div>

                <div className={styles.sidebar__user}>

                    <img src={session?.user?.image}/>
                    <div className={styles.show}>
                    <span>
                       WELCOME BACK 👋
                    </span>
                    <span>
                    {session?.user?.name}
                    </span>
                </div>
                </div>
                

                <ul className={styles.sidebar__list}>
                    <li className={route==undefined? styles.active:""}>
                        <Link href="/admin/dashboard">
                            <MdSpaceDashboard/>
                            <span className={styles.show}>
                                Dashboard
                            </span>
                        </Link>
                    </li>
                     <li className={route=="sales"? styles.active:""}>
                        <Link href="/admin/dashboard/sales">
                        <FcSalesPerformance />
                            <span className={styles.show}>
                               Sales
                            </span>
                        </Link>
                    </li>
                    <li className={route=="orders"? styles.active:""}>
                        <Link href="/admin/dashboard/orders">
                            <IoListCircleSharp/>
                            <span className={styles.show}>
                               Orders
                            </span>
                        </Link>
                    </li>
                    <li className={route=="users"? styles.active:""}>
                        <Link href="/admin/dashboard/users">
                            <FaUser/>
                            <span className={styles.show}>
                               Users
                            </span>
                        </Link>
                    </li>
                    <li className={route=="messages"? styles.active:""}>
                        <Link href="/admin/dashboard/messages">
                        <LuMessageCircle />
                            <span className={styles.show}>
                                Messages
                            </span>
                        </Link>
                    </li>
                </ul>
                <div className={styles.sidebar__dropdown}>
                    <div className={styles.sidebar__dropdown_heading}>
                    <div className={styles.show}> Product </div>
                    </div>
                    <ul className={styles.sidebar__list}>
                    <li className={route=="product/all"? styles.active:""}>
                        <Link href="/admin/dashboard/product/all">
                        <FaThList/>
                            <span className={styles.show}>
                               All Products
                            </span>
                        </Link>
                    </li>

                    <li className={route=="product/create"? styles.active:""}>
                        <Link href="/admin/dashboard/product/create">
                        <FaPlus/>
                            <span className={styles.show}>
                               Create Product
                            </span>
                        </Link>
                    </li>
                    </ul>

                </div>
                <div className={styles.sidebar__dropdown}>
                    <div className={styles.sidebar__dropdown_heading}>
                    <div className={styles.show}> Categories/subs </div>
                    </div>
                    <ul className={styles.sidebar__list}>
                    <li className={route=="categories"? styles.active:""}>
                        <Link href="/admin/dashboard/categories">
                        <MdOutlineCategory/>
                            <span className={styles.show}>
                               Categories
                            </span>
                        </Link>
                    </li>

                    <li className={route=="subCategories"? styles.active:""}>
                        <Link href="/admin/dashboard/subCategories">
                        <div>
                            <div style={{transform:"rotate(189deg)"}}>
                                <MdOutlineCategory/>

                            </div>
                        </div>
                            <span className={styles.show}>
                              Sub-Categories
                            </span>
                        </Link>
                    </li>
                    </ul>

                    <div className={styles.sidebar__dropdown}>
                    <div className={styles.sidebar__dropdown_heading}>
                    <div className={styles.show}> Coupons </div>
                    </div>
                    <ul className={styles.sidebar__list}>
                    
                    <li className={route=="coupouns"? styles.active:""}>
                        <Link href="/admin/dashboard/coupons">
                        <RiCoupon2Fill/>
                            <span className={styles.show}>
                               Coupons
                            </span>
                        </Link>
                    </li>
                    </ul>

                </div>
                <nav>
                    <ul className={`${styles.sidebar__list} ${expand?styles.nav__flex:""}`}>
                        <li>
                            <Link href="">
                            <RiSettingsLine/>
                            </Link>
                        </li>
                        <li>
                            <Link href="">
                            <IoNotificationsSharp/>
                            </Link>
                        </li>
                        <li>
                            <Link href="">
                            <AiFillMessage/>
                            </Link>
                        </li>
                        <li>
                            <Link href="">
                            <RiLogoutBoxFill/>
                            </Link>
                        </li>
                    </ul>
                </nav>
                </div>
            </div>
        </div>
        )
    

}