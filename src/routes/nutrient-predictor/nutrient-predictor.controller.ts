import { Request, Response } from 'express';
import fs from "fs/promises"
import path from "path"
import { openai } from '../../services/open-ai/open-ai.service.js';

// import { s3Client } from '../../services/s3/s3.service.js';
// import { PutObjectCommand } from "@aws-sdk/client-s3"
// import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
// import { NUTRIENT_PREDICTOR_PRE_SIGNED_URL_TTL } from '../../utils/constants/nutrient-predictor.constants.js';

import { getNutrientPrediction } from "../../utils/requests/nutrient-predictor/nutrient-predictor.requests.js"
import { isNutrientPredictionCached, saveNutrientPrediction } from '../../redis/queries/nutrient-predictor/nutrient-predictor.queries.js';

// nutrient prediction
export async function httpGetNutrientPrediction(req: Request, res: Response): Promise<void> {
  try {
    const mealDescription = String(req.body)

    const nutrientPredictionCached = await isNutrientPredictionCached(mealDescription)
    if (nutrientPredictionCached) {
      const resNutrientPrediction = await getNutrientPrediction(mealDescription)
      res.status(200).json(resNutrientPrediction)
    } else {
      const resGetNutrientPrediction = await getNutrientPrediction(mealDescription)
  
      if (resGetNutrientPrediction) {
        await saveNutrientPrediction(mealDescription, resGetNutrientPrediction.predictionResults)
        res.status(200).json(resGetNutrientPrediction)
      }
    }
  } catch (error) {
    // TODO: handle error
    console.log(error)
  }
}

// get food prediction
export async function httpGetFoodPrediction(req: Request, res: Response): Promise<void> {
  try {
    const imagePath = req?.file?.path!
    const imageBuffer = await fs.readFile(imagePath!)

    const base64Image = imageBuffer.toString("base64")!
    const mimeType = req?.file?.mimetype!

    const response = await openai.chat.completions.create({
      model: process.env.REACT_APP_OPEN_API_MODEL!,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Please describe the food in this image as accurately as possible in a single sentence.",
            },
            {
              type: "image_url",
              image_url: {
                url: `data:${mimeType};base64,${base64Image}`,
              },
            },
          ],
        },
      ],
    });

    const foodObject = response.choices[0]?.message?.content
    console.log(foodObject)

    res.status(200).json(foodObject)
  } catch (error) {
    console.error("OpenAI image processing failed:", error);
    res.status(500).json({ error: "Image processing failed" });
  } finally {
    // clean up uploaded file
    if (req.file?.path) {
      await fs.unlink(req.file.path)
    }
  }
}

// generating pre-signed URL
// export async function httpGeneratePresignedURL(req: Request, res: Response): Promise<void> {
//   try {
//     const { objectKey } = req.body
    
//     const command = PutObjectCommand({
//       Bucket: process.env.AWS_S3_NUTRIENT_PREDICTOR_BUCKET,
//       objectKey,
//       ContentType: "application/octet-stream"
//     })

//     // generate pre-signed URL valid for N mins
//     const presignedUrl = await getSignedUrl(s3Client, command, { expiresIn: NUTRIENT_PREDICTOR_PRE_SIGNED_URL_TTL })
//     if (presignedUrl) {
//       res.status(200).json(presignedUrl)
//     }
//   } catch (error) {
//     console.log(error)
//   }
// }