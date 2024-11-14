import ProductModel from "../Modal/ProductSchema.js";

const Product = {

    createproduct: async (req,res) => {
        try {
            const {productname, price, category, inStock} = req.body
            const image = req.files ? req.files.map(file =>  `${req.protocol}://${req.get('host')}/uploads/${file.filename}`) : [];

            if(productname && price && category && inStock && image){
                 const doc = new ProductModel({
                    productname: productname,
                    price: price,
                    category: category,
                    inStock: inStock,
                    image: image,
                 })
                 const result = await doc.save()
                 res.status(200).send({"status":"success", "message":"Product is successfully created", "result": result})
            }else{
                res.status(400).send({"status":"failled", "message":"All are required"})
            }
        } catch (error) {
            res.status(500).send({"status":"failled","message":"An error occour", error: error.message})
        }
    },

    AllProduct: async (req,res) =>{
        try {
            const result = await ProductModel.find()
            if(result){
                res.status(200).send({"status":"success", "message":"All products ssuccessfully Shown", "result": result})
            }else{
                res.status(400).send({"status":"failled", "message":"Give valid information"})
            }
        } catch (error) {
            res.status(500).send({"status":"failled","message":"An error occour", error: error.message})

        }
    }, 


  
    ProductByID: async (req,res) =>{
        try {
            const id  = req.params.id;

            if (!id) {
                return res.status(400).send({ "status": "failed", "message": "Property ID is required" });
              }

            const result = await ProductModel.findById(id)
            if(result){
                res.status(200).send({"status":"Success", "message":"Property Successfully Get", "result":result})
            }else{
                res.status(400).send({"status":"failed","message":"Please Give Valid Information"})
            }
        } catch (error) {
            res.status(500).send({"status":"failed", "message":"An error occurred", "error":error.message})
        }
     },


     ProductUpdate: async (req, res) => {
        try {
            const id = req.params.id;
            const updateData = { ...req.body };

            if (req.files && req.files.length > 0) {
                const image = req.files.map(file => `${req.protocol}://${req.get('host')}/uploads/${file.filename}`);

                updateData.image = image;
            }

            const result = await ProductModel.findByIdAndUpdate(id, updateData, { new: true });
            if (result) {
                res.status(200).send({ "status": "Success", "message": "Property Successfully Updated", "result": result });
            } else {
                res.status(400).send({ "status": "failed", "message": "Please provide valid information" });
            }
        } catch (error) {
            res.status(500).send({ "status": "failed", "message": "An error occurred during update.", "error": error.message });
        }
    },


    ProductDelete: async (req,res) =>{
        try {
            const id  = req.params.id;

            if (!id) {
                return res.status(400).send({ "status": "failed", "message": "Property ID is required" });
              }

            const result = await ProductModel.findByIdAndDelete(id)
            if(result){
                res.status(200).send({"status":"Success", "message":"Property Successfully Delete", "result":result})
            }else{
                res.status(400).send({"status":"failed","message":"Please Give Valid Information"})
            }
        } catch (error) {
            res.status(500).send({"status":"failed", "message":"An error occurred", "error":error.message})
        }
     },


   
  

   

}
export default Product