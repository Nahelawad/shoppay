import { createSlice } from "@reduxjs/toolkit";

const initialState={
    show:true,
    header:"Error creating product",
    msgs:[
        {
        msg:"Choose atleast 2 images",
        type:"error",

    },
    {
        msg:"Choose atleast 2 images",
        type:"error",

    },
],
link:{
    link:"",
    link_text:"",
},
};

export const DialogSlice=createSlice({
    name:"dialog",
    initialState,
    reducers:{
        showDialog(state,action){
            state.show=true;
            state.header=action.payload.header;
            const rawMsgs = action.payload.msgs;
            state.msgs = Array.isArray(rawMsgs)
                     ? rawMsgs
                     : rawMsgs
                    ? [rawMsgs]
                    : [];
      state.link = action.payload.link || {};
            state.link=action.payload.link;
        },
        hideDialog(state,action){
            state.show=false;
            state.header="";
            state.msgs=[];
            state.link={};
        },
    },
});

export const {showDialog,hideDialog}=DialogSlice.actions;
export default DialogSlice.reducer;