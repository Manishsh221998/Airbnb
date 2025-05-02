const Property = require("../../model/property")

 
class ApiCOntrollerProperty{
    async getAllProperty(req,res){
        try {
             const data=await Property.find()
            if(data){
            return res.status(200).json({
                status:true,
                totalCOunt:data.length,
                message:"Property fetched successfully",
                data:data
            })
           }
         } catch (error) {
            console.log(error)
        }
    }
    async getCategoryList(req,res){
        try {
            const{field,value}=req.query
            const data=await Property.aggregate([
                {
                    $match:{
                        [field]:value,
                    }
                }
            ])
            return res.status(200).json({
                status:true,
                totalCount:data.length,
                message:"Category-wise property fetched successfully",
                data
            })
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports=new ApiCOntrollerProperty()