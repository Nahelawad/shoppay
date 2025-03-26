import { ErrorMessage, useField } from "formik";
import styles from "./styles.module.scss";
import { MenuItem, TextField } from "@mui/material";

export default function SingularSelect({
    data,
    handleChange,
    placeholder,
    ...rest
}){
    const [field,meta]=useField(rest);
    return(
        <div style={{marginBottom:"1rem"}}>
            <TextField
            variant="outlined"
            name={field.name}
            select
            label={placeholder}
            value={field.value}
            onChange={handleChange}
            className={`${styles.select} ${meta.touched && meta.error && styles.error_select}`}>

             <MenuItem key={""} value={""}>
             No selected/ Or Empty
             </MenuItem>
            
            {
                data.map((option)=>(

                    <MenuItem key={option._id} value={option.name}>
                    {
                        option.name
                    }
                    </MenuItem>

                ))
            }
            </TextField>
            {
                meta.touched && meta.error && <p className={styles.error__msg}>
                    <ErrorMessage name={field.name}/>

                </p>
            }
        </div>
    )
}