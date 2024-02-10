import { Request,Response,NextFunction } from "express"

const jwt= require("jsonwebtoken")
require('dotenv').config()
export const secret= process.env.SECRET_KEY
enum ResponseStatus {
    success= 200,
    notFound= 400,
    error=500
}

export const authenticate= (req:Request,res:Response,next:NextFunction)=>{
    const authheader= req.headers.authorization
    if(!authheader){
       return res.status(200).json({message:"no token headers"})
    }

    const token= authheader.split(" ")[1]
    jwt.verify(token,secret,(err:Error|null,decoded:any)=>{
        if(err){
            return res.send(err)
        }
        res.send(`welcome ${decoded}`)
        next()
    })

}