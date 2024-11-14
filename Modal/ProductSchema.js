import mongoose from "mongoose";

const Product = mongoose.Schema({
     productname:{
        type: String,  required:true, trim:true, 
     },
     price:{
        type:Number, required:true,
     },
     category:{
        type:String, require:true, trim:true,
     },
     inStock:{
        type:Boolean, 
     },
     image:{
        type:[String],
     }

})
const ProductModel  = mongoose.model("productDetailes", Product)
export default ProductModel;