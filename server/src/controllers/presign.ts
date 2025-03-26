import { Request, Response } from "express";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { config } from "../config";

export const presign = async (req: Request, res: Response) => {
  const { name, folder } = req.query;

  if (
    !name ||
    !folder ||
    typeof name !== "string" ||
    typeof folder !== "string"
  ) {
    return res.status(400).json({ error: "Invalid name or folder" });
  }

  const bucket = "car-rental-s3bucket";
  const contentType = "image/jpeg";
  const key = `${folder}/${name}`;

  const s3Client = new S3Client({
    region: "eu-north-1",
    credentials: {
      accessKeyId: config.aws_access_key_id || "",
      secretAccessKey: config.aws_secret_access_key || "",
    },
  });

  try {
    const signedUrl = await getSignedUrlForUpload(
      s3Client,
      bucket,
      key,
      contentType
    );
    res.json({ signedUrl });

  } catch (error) {
    console.error("Error generating signed URL:", error);
    res.status(500).json({ error: "Failed to generate signed URL" });
  }
};

async function getSignedUrlForUpload(
  s3Client: S3Client,
  bucket: string,
  key: string,
  contentType: string
) {
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    ContentType: contentType,
  });

  try {
    // Generate a signed URL that expires in 15 minutes
    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 900 });
    return signedUrl;
  } catch (err) {
    console.error("Oops! Something went wrong:", err);
    throw err;
  }
}
