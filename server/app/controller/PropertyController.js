const Admin = require('../model/admin')
const Property = require('../model/property')
const path=require('path')
const fs=require('fs')

class PropertyController{
    async propertyView(req,res) {
        try {
            res.render('property',{
                title:'Add Property',
             role:req.cookies.adminRole,
             title:req.cookies.adminName,
                     image:req.cookies.adminImg,

            })
        } catch (error) {
            console.log("Property view error",error)
        }
    }
  

    async createProperty(req,res){
        // console.log(req.body)
        try {
            const email=req.cookies.email
            const adminData=await Admin.findOne({email})

            const{title,category,description,propertyType,roomType,location,amenities,capacity:{guests,bedrooms,beds,bathrooms},price,rules}=req.body
        // Convert checkbox values from "on" to boolean
        const processedRules = {
            petsAllowed: rules?.petsAllowed === 'on',
            smokingAllowed: rules?.smokingAllowed === 'on',
            partiesAllowed: rules?.partiesAllowed === 'on',
            childrenAllowed: rules?.childrenAllowed === 'on'
        };
        
        const data=new Property({title,category,description,propertyType,roomType,location,amenities,capacity:{guests,bedrooms,beds,bathrooms},price,rules:processedRules,host:adminData._id})
              
        // Handle file uploads
              if (req.file) {
                // For single file
                data.images = [req.file.path]; // Store as array
            } else if (req.files) {
                // For multiple files (if you configure multer to handle multiple)
                data.images = req.files.map(file => file.path);
            }

           const sData=await data.save()
           if(sData){
        //    res.status(201).json({
        //     status:true,
        //     message:"Property created successfully",
        //     data:sData
        //    })
           return res.redirect('/inventoryTable')

        }
        } catch (error) {
            console.log("Property Create error",error)
        }
    }
//added pagination to the property list
    async propertyTableView(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = 10;
            const skip = (page - 1) * limit;
    
            const total = await Property.countDocuments();
            const data = await Property.find().skip(skip).limit(limit).sort({ createdAt: -1 });
    
            const totalPages = Math.ceil(total / limit);
    
            res.render('inventoryTable', {
                title: 'Inventory Table',
                role: req.cookies.adminRole,
                title: req.cookies.adminName,
                image: req.cookies.adminImg,
                data,
                currentPage: page,
                totalPages
            });
        } catch (error) {
            console.log("Property view error", error);
        }
    }
    
    async edit(req,res) {
        try {
            const id=req.params.id
            // console.log(id)
            const data=await Property.findById(id)
           // console.log(data)
           res.render("update",{
            title:'Update property',
            role:req.cookies.adminRole,
            title:req.cookies.adminName,
            image:req.cookies.adminImg,
            data:data,
           })
            
        } 
        catch (error) {
            console.log("Property view error",error)
        }
    }
    async delete(req,res) {
        try {
            const id=req.params.id
            // console.log(id)
            const data=await Property.findByIdAndDelete(id)
          if(data && data.images){
            data.images.forEach(imagePath=>{
                fs.unlinkSync(imagePath)
            })
          }
            // console.log(data)
            if(data){
                console.log('Propert row deleted successfully')
                res.redirect('/inventoryTable')
            }
        } catch (error) {
            console.log("Property view error",error)
        }
    }

}
module.exports=new PropertyController()