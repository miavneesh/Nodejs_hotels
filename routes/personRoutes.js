const express = require('express');
const router = express.Router();
const Person = require('./../models/Person')




// Fetching Data From The Database By GET method
// R (Read) of CRUD
router.get('/', async (req,res)=>{
    try {
        const data = await Person.find() 
        console.log("data fetched successfully")
        res.status(200).json(data)
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal server error"})
        
    }
    
})

//Fetching data with a specific field
router.get('/:workType', async (req,res)=>{
    try {
        const workType =req.params.workType;
        if(workType == 'chef' || workType =='manager' || workType == 'waiter'){
            const response= await Person.find({work:workType});
            console.log("Response Fetched");
            res.status(200).json(response)
        }else{
            res.status(404).json({error:"Invalid Work Type"})
        }    
        
    } catch (error) {
        console.log(err);
        res.status(500).json({error:"Internal Server Error"})
    }    
})    

//Giving New Entry To The Person Data
//C (Create) of CRUD
router.post('/', async(req, res)=>{

    try {
        const data = req.body  //Assuming the req body contains the person data
        
        //creating a new Person document using mongoose model 
        const newPerson = new Person(data)
        
        //saving new person in the database 
        const response = await newPerson.save()
        console.log("Person data saved successfully")
        res.status(200).json(response)

    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal server error"})
    }
})

//Updating The Data Already Existed
//U (Update) of CRUD
router.put('/:id', async(req,res)=>{
 try{
    const personID = req.params.id;
    const updatedPersonData = req.body

    const response = await Person.findByIdAndUpdate(personID, updatedPersonData,{
       new:true,
       runValidators:true
   })

   if(!response){
       return res.status(404).json({error:"Person not found"})
   }
   res.status(200).json(response)
 }

 catch(error){
     console.log(error);
     res.status(500).json({error:"Internal server error"})
   }
})


//Deleting Entry From Given Data
//D (Delete) of CRUD 
router.delete('/:id', async (req, res)=>{
    try {
        const personID = req.params.id;
        const response = await Person.findByIdAndDelete(personID)

        if(!response){
            return res.status(404).json({error:"Person not found"})
        }
        
        console.log("Data Deleted");
        res.status(200).json({massage:"Person's Data Deleted Successfully"})

    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal Server Error"})
    }
})

module.exports = router;