import{Request,Response} from "express";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";



export const presign = async (req:Request,res:Response)=>{
    const s3Client = new S3Client({
        region: "eu-west-1",
        credentials: {
          accessKeyId: process.env.ACCESS_KEY || "",
          secretAccessKey: process.env.SECRET_KEY || "",
        },
      });
}