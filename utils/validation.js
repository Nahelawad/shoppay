export const validateEmail=(email)=>{
    const regexStr = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexStr.test(email);
};

export const validateCreateProduct =(product,images)=>{
    let sizes=product.sizes;
    let details=product.details;
    let questions=product.questions;
    const checks=[{
        msg:"Name,Description and brand added successfully",
        type:"success",
    },
];

if(images.length <3){
    checks.push({
        msg:`choose atleast 3 images (${3-images.length} remaining)`,
        type:"error",
    });
}else{
    checks.push({
        msg:`${images.length} choosen correctly`,
        type:"success",
    });
}

    if(!product.color.color){
        checks.push({
            msg:"Choose a main product color please",
            type:"error",
        })
    }else{
        checks.push({
            msg:"Product color has been choosen successfully",
            type:"success",
        });
    }
    if(!product.color.image){
        checks.push({
            msg:" Please Choose a product style image",
            type:"error",
        })
    }else{
        checks.push({
            msg:"Product Style image has been choosen successfully",
            type:"success",
        });
    }
    

    for (var i=0; i<sizes.length;i++){
        if(sizes[i].qty=="" || sizes[i].price=="" || sizes[i].size=="" ){
            checks.push({
                msg:" Please fill all informations on Sizes.",
                type:"error",
            });
            break;
        }else{
            checks.push({
                msg:" Atleast one size/qty/price is choosen correctly",
                type:"success",
            })
        }
    }

    for (var i=0; i<details.length;i++){
        if(details[i].name=="" || details[i].value==""){
            checks.push({
                msg:" Please fill all informations on Details.",
                type:"error",
            });
            break;
        }else{
            checks.push({
                msg:" Atleast one detail is correctly added",
                type:"success",
            })
        }
    }

    for (var i=0; i<questions.length;i++){
        if(questions[i].question=="" || details[i].answer==""){
            checks.push({
                msg:" Please fill all informations on questions.",
                type:"error",
            });
            break;
        }else{
            checks.push({
                msg:" Atleast one question",
                type:"success",
            })
        }
    }

    var s_test=checks.find((c)=>c.type=="error");
    if(s_test){
        return checks;
    }else{
        return "valid";
    }
};

