import { sidebarData } from "../../../data/profile";
import styles from "./styles.module.scss";
import Item from "./Item";
export default function Sidebar({data}){
    return (
        <div className={styles.sidebar}>
           <div className={styles.sidebar__container}>
            <img src={data.image}/>
            <span className={styles.sidebar__name}>
                {data.name}
            </span>
            <ul>
                {
                    sidebarData.map((item,i)=>(
                        <Item
                        key={i}
                        item={item}
                        visible={data.tab == i.toString()
                        }
                        index={i.toString()}
                        />

                    ))
                }
            </ul>
           </div>
        </div>
    )
}