
import styles from "./styles.module.scss";
import ListItem from "./ListItem";

export default function List({categories,setCategories}){
    return (
        <div className={styles.list}>
            {
                categories.map((category)=>(
                    
                    <ListItem
                    category={category}
                    key={category._id}
                    setCategories={setCategories}                    
                    />
                ))
            }
            
        </div>


    )
    
}