import { BiCategory } from "react-icons/bi";
import styles from "./styles.module.scss";
import { MenuArray } from "../../../data/home";
import Link from "next/link";
import { GiLargeDress } from "react-icons/gi";
import { GiClothes } from "react-icons/gi";
import { FaHeadphones } from "react-icons/fa";
import { IoWatch } from "react-icons/io5";
import { FaHouse } from "react-icons/fa6";
import { GiHealthCapsule } from "react-icons/gi";
import { GiBallerinaShoes } from "react-icons/gi";
import { GiDiamondRing } from "react-icons/gi";
import { MdOutlineSportsVolleyball } from "react-icons/md";
import { FaBaby } from "react-icons/fa";
import { MdLocalMovies } from "react-icons/md";
import { IoGameController } from "react-icons/io5";
import { MdOutlineSmartphone } from "react-icons/md";
import { FaRobot } from "react-icons/fa";
import { FaGift } from "react-icons/fa";
import { FaHammer } from "react-icons/fa";
import { FaLock } from "react-icons/fa";







export default function Menu(){
    return(
        <div className={styles.menu}>

        <ul>
          <li>
             <a className={styles.menu__header}>
              <BiCategory/>
              <b>Categories</b>
             </a>
          </li>

          <div className={styles.menu__list}>
            {MenuArray.map((item,i)=>(
             <li>
               <Link href={item.link}>

{
  i==0? (
  <GiLargeDress/>
):i==1 ?(
<GiClothes />
):i==2?(<FaHeadphones />):
i==3?(<IoWatch />):i==4?(<FaHouse />):
i==5?(<GiHealthCapsule />):
i==6?(<GiBallerinaShoes />):
i==7?(<GiDiamondRing />):
i==8?(<MdOutlineSportsVolleyball />):
i==9?(<FaBaby />):
i==10?(<MdLocalMovies />):
i==11?(<IoGameController />):
i==12?(<MdOutlineSmartphone />):
i==13?(<FaRobot />):
i==14?(<FaGift />):
i==15?(<FaHammer />):
i==16?(<FaLock />):""


}
  <span>{item.name}</span>

</Link>
             </li>
            ))

            }
          </div>


        </ul>

        </div>
    );
}