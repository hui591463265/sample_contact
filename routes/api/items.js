const express = require('express');
const router = express.Router();

//Item Model
const Item = require('../../models/Item');

//router get api/items to get all items
router.get('/', (req,res)=>{
    Item.find()
        .then(items => res.json(items))
})
//@route Post api/items to create new item
router.post('/', (req,res)=>{
    const newItem = new Item({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        phone:req.body.phone,
        picture:req.body.picture
    })

    newItem.save().then(item=> res.json(item));
});

//@route Update api/items to update item by id
router.put('/:id', (req,res)=>{ 
    Item.findByIdAndUpdate(req.params.id,{
        $set:{
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            email:req.body.email,
            phone:req.body.phone,
            picture:req.body.picture
        }
    })
        .then(()=> res.json({success:true}))
        .catch(err=> res.status(404).json({success:false}))
});

//@route DELETE api/items to delete item by id
router.delete('/:id', (req,res)=>{
    Item.findById(req.params.id)
        .then(item=>item.remove().then(()=> res.json({success:true})))
        .catch(err=> res.status(404).json({success:false}))
});

module.exports = router;