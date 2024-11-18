import { comparePassword, hashPassword } from '../helpers/authHelper.js';
import userModel from '../models/userModel.js';
import JWT from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();


export const registerController= async(req,res) =>{
    try{
        const{name,email,password,phone}=req.body
        //valadiation
        if(!name){
            return res.send({error:'Name is Required'})
        }
        if(!email){
            return res.send({error:'Email is Required'})
        }
        if(!password){
            return res.send({error:'password is Required'})
        }
        if(!phone){
            return res.send({error:'Phone no is Required'})
        }
        

        //existing user:
        const existinguser=await userModel.findOne({email})
        if(existinguser){
            return res.status(200).send({
                success:true,
                message:'User already exists. Please Login',

            })
        }
        const hashedPassword=await hashPassword(password)
        //save
        const user=await new userModel({name,email,phone,password:hashedPassword}).save()
        res.status(201).send({
            success:true,
            message:"User registered Successfully",
            user,
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Regestration',
            error
        })
    }
};

export const loginController =async(req,res) =>{
    try{
        const{email,password} = req.body
        if (!email || !password){
            return res.status(404).send({
                success:false,
                message:'Invalid email or password'
            })
        }
        //check user
        const user= await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:'Email is not registered'
            })
        }
        const match=await comparePassword(password,user.password)
        if(!match){
            return res.status(200).send({
                success:false,
                message:'Invalid password'
            })
        }
        const token=await JWT.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});
        res.status(200).send({
            success:true,
            message:"Login Successful",
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone
            },
            token,
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in login',
            error
        })
    }
};
