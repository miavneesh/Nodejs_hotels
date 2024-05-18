const express = require('express')
const router = express.Router()
const MenuItem = require('./../models/menuItem')


router.post('/', async(req, res)=>{

    try {
        const data = req.body  //Assuming the req body contains the person data
        
        //creating a new Person document using mongoose model 
        const newMenuItem = new MenuItem(data)
        
        //saving new person in the database 
        const response = await newMenuItem.save()
        console.log("Menu data saved successfully")
        res.status(200).json(response)

    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal server error"})
    }
})


router.get('/', async (req,res)=>{
    try {
        const data = await MenuItem.find() 
        console.log("Menu data fetched successfully")
        res.status(200).json(data)
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal server error"})
        
    }

})

router.get('/:taste', async (req,res)=>{
    try {
        const taste =req.params.taste;
        if(taste == 'sweet' || taste =='sour' || taste == 'spicy'|| taste=='crunchy'){
            const response= await MenuItem.find({taste:taste});
            console.log("response fetched");
            res.status(200).json(response)
        }else{
            res.status(404).json({error:"Invalid taste type"})
        }
        
    } catch (error) {
        console.log(err);
        res.status(500).json({error:"Internal server error"})
    }
})



router.put('/:id', async(req,res)=>{
    try{
       const menuItemID = req.params.id;
       const updatedMenuItemData = req.body
   
       const response = await MenuItem.findByIdAndUpdate(menuItemID, updatedMenuItemData,{
          new:true,
          runValidators:true
      })
   
      if(!response){
          return res.status(404).json({error:"Menu Item data not found"})
      }
      res.status(200).json(response)
    }
   
    catch(error){
        console.log(error);
        res.status(500).json({error:"Internal server error"})
      }
   })
   
   router.delete('/:id', async (req, res)=>{
       try {
           const menuItemID = req.params.id;
           const response = await MenuItem.findByIdAndDelete(menuItemID)
   
           if(!response){
               return res.status(404).json({error:"Menu Item not found"})
           }
           
           console.log("data delete");
           res.status(200).json({massage:"Menu item data deleted successfully"})
   
       } catch (error) {
           console.log(error);
           res.status(500).json({error:"Internal server error"})
       }
   })

module.exports = router