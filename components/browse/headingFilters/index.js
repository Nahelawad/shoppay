import { Tooltip } from "@mui/material";
import styles from "./styles.module.scss";
import { AiTwotoneStar } from "react-icons/ai";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import Link from "next/link";
import { BsCheckLg } from "react-icons/bs";
import { useRouter } from "next/router";

export default function HeadingFilters({priceHandler,multiPriceHandler,shippingHandler,replaceQuery}){

    const router=useRouter();
    const [show,setShow]=useState(false);
    const check =replaceQuery(
        "shipping",
        router.query.shipping == "0"? false:"0"
    )
    return <div className={styles.filters}>
        <div className={styles.filters__price}>
            <span>
                Price:
            </span>
            <input type="number" placeholder="min" min="0" value={router.query.price?.split("_")[0] ||""} onChange={(e)=>priceHandler(e.target.value,"min")}/>
            <input type="number" placeholder="max" max="0" value={router.query.price?.split("_")[1] ||""} onChange={(e)=>priceHandler(e.target.value,"max")}/>
        </div>

        <div className={styles.filters__priceBtns}>
            <Tooltip
            title={<h2>
                Check out products under 10£
            </h2>}
            placement="top"
            arrow
            >

                <button className={styles.tooltip_btn}
                  onClick={()=>multiPriceHandler(0,10)}
                
                >
                    <span style={{height:"10%"}}>

                    </span>
                </button>


            </Tooltip>

            <Tooltip
            title={<h2>
                Check out products between 10£ and 50£
            </h2>}
            placement="top"
            arrow
            >

                <button className={styles.tooltip_btn}  onClick={()=>multiPriceHandler(10,50)} >
                    <span>

                    </span>
                </button>


            </Tooltip>

            <Tooltip
            title={<h2>
                Check out products between 50£ and 100£
            </h2>}
            placement="top"
            arrow
            onClick={()=>multiPriceHandler(50,100)}
            >

                <button className={styles.tooltip_btn} onClick={()=>multiPriceHandler(10,50)} >
                <span style={{height:"50%"}}>

                </span>
                </button>


            </Tooltip>

            <Tooltip
            title={<h2>
                Check out products between 100£ and 500£
            </h2>}
            placement="top"
            arrow
            onClick={()=>multiPriceHandler(100,500)}
            >

                <button className={styles.tooltip_btn}  onClick={()=>multiPriceHandler(10,50)}>
                    <span style={{height:"75%"}}>

                    </span>
                </button>


            </Tooltip>

            <Tooltip
            title={<h2>
                Check out products for more than 500£
            </h2>}
            placement="top"
            arrow
            onClick={()=>multiPriceHandler(500,"")}
            >

                <button className={styles.tooltip_btn} onClick={()=>multiPriceHandler(10,50)}>
                    <span style={{height:"100%"}}>

                    </span>
                </button>


            </Tooltip>

        </div>

        <div className={styles.filters__shipping} onClick={()=>shippingHandler(check.result)}>
            <input type="checkbox" name="shipping" id="shipping" checked={router.query.shipping == "0"}/>
            <label htmlFor="shipping">
                Free Shipping
            </label>
        </div>
        <div className={styles.filters__rating}>
            <input type="checkbox" name="rating" id="rating"/>
            <label htmlFor="rating">
                <AiTwotoneStar/>
                <AiTwotoneStar/>
                <AiTwotoneStar/>
                <AiTwotoneStar/>
                <AiTwotoneStar/> & up

            </label>

        </div>

        <div className={styles.filters__sort}>
            <span> Sort By</span>

            <div className={styles.filters__sort_list} 
            onMouseOver={()=>setShow(true)}
            onMouseLeave={()=>setShow(false)}
            >
                <button 
                >
                    Recommend
                    <div style={{transform:`${show? "rotate(180deg)":"rotate(0)"}`}}>
                        <IoIosArrowDown/>
                    </div>
                </button>

                <ul style={{
                    transform:`${show?"scale3d(1,1,1)":"scale3d(1,0,1)"}`,
                }}>

                    <li>
                        <Link href="">
                        <b>
                            Recommended <BsCheckLg/>
                        </b>
                        </Link>
                    </li>
                    <li>
                        <Link href="">
                        Most Popular
                        </Link>
                    </li>
                    <li>
                        <Link href="">
                        New Arrivals
                        </Link>
                    </li>
                    <li>
                        <Link href="">
                        Top reviewed
                        </Link>
                    </li>
                    <li>
                        <Link href="">
                        Price(low to high)
                        </Link>
                    </li>

                    <li>
                        <Link href="">
                        Price(high to low)
                        </Link>
                    </li>


                </ul>

            </div>

        </div>
    </div>
}