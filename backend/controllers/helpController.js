import asyncHandler from "express-async-handler";
import Help from "../models/Help.js";

export const insertHelp = asyncHandler(async(req,res)=>{

    await Help.insertOne({
        name:req.body.name,
        phone:req.body.phone,
        email:req.body.email,
        subject:req.body.subject,
        message:req.body.message
    })
    
    res.status(201).json({message:"Help Request Sent Successfully"})
})

export const fetchHelpList = asyncHandler(async(req,res)=>{
    const result = await Help.find()

    res.status(200).json(result)
    console.log(result)
})
