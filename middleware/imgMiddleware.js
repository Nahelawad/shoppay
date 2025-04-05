import next from "next";
import fs from "fs";

export const imgMiddleware = async (req,res,next)=>{
    try {
        if(!req.files){
            return res.status(400).json({message:"No files were choosen"})
        }
        let files=Object.values(req.files).flat();
        for (const file of files){
            if(file.mimetype!=="image/jpeg" && file.mimetype!=="image/png" && file.mimetype!=="image/webp" ){
                removeTmp(file.tempFilePath);
                return res.status(400).json({message:"file format is not correct,only JPEG,PNG OR WEBP"});
            }
            if(file.size>1024*1024*10){
                removeTmp(file.tempFilePath);
                return res.status(400).json({message:"file size is too large maximum 10 mb is allowed"});
            }
            
        }


        
        next();
        
    } catch (error) {
        res.status(500).json({message:error?.message});
        
    }
};


const removeTmp=(path)=>{
    fs.unlink(path,(error)=>{

        if(error) throw error;
    });

}