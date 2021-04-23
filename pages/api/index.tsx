import { NextApiRequest, NextApiResponse } from "next";
import { FaceAPI } from "face-filters-azure-ai";
import Jimp from "jimp";
import { Maybe } from "../../utils";

export interface APIResponse {
  error?: {
    code: string;
    message: string;
  };
  result?: string;
}

if (!process.env.TOKEN) throw new Error("NO TOKEN FOR AZURE");

const face = new FaceAPI(
  process.env.TOKEN,
  "https://westus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=true&recognitionModel=recognition_04&returnRecognitionModel=false&detectionModel=detection_03&faceIdTimeToLive=86400"
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const filter = req.body.filter ?? req.query.filter;
  const url = req.body.url ?? req.query.url;

  if (!filter) {
    res.statusCode = 400;
    res.send({
      error: {
        code: "FILTER_MISSING",
        message: "No filter property in req body",
      },
    } as APIResponse);
    return;
  }

  if (!url) {
    res.statusCode = 400;
    res.send({
      error: {
        code: "URL_MISSING",
        message: "No url property in req body",
      },
    } as APIResponse);
    return;
  }
  let image = await Maybe(
    (function () {
      switch (filter.toLowerCase()) {
        case "clown":
          return clownHair;
        case "bonk":
          return bonk;
        default:
          return;
      }
    })(),
    face,
    url
  );

  if (image) {
    await sendJimp(res, image);
    return;
  }

  res.send({
    error: {
      code: "FILTER_UNKNOWN",
      message: "Filter name not valid",
    },
  });
}

async function sendJimp(response: NextApiResponse, image: Jimp) {
  return new Promise<void>(async (res) => {
    const buffer = await image.getBufferAsync(Jimp.MIME_PNG);
    response.writeHead(200, {
      "Content-Type": "image/png",
      "Content-Length": buffer.length,
    });
    response.end(buffer, () => {
      res();
    });
  });
}

async function clownHair(face: FaceAPI, url: string) {
  try {
    const scale = 1.8;
    const clownH =
      "https://media.discordapp.net/attachments/795461900367429643/812156013624950835/clown_hair.png";

    return await face.faceFilter(url, clownH, scale, (coord, { w }) => ({
      x: coord.x + coord.w / 2 - w / 2,
      y: coord.y - coord.h / 1.5,
    }));
  } catch (e) {
    console.trace(e);
    return undefined;
  }
}

async function bonk(face: FaceAPI, url: string) {
  try {
    const scale = 0.7;
    const hammer =
      "https://cdn.discordapp.com/attachments/795461900367429643/812544803430596608/1f528.png";

    return await face.faceFilter(url, hammer, scale, (coord, { h }) => ({
      x: coord.x + coord.w / 2,
      y: coord.y + coord.h / 25 - h / 5,
    }));
  } catch (e) {
    console.trace(e);
    return undefined;
  }
}
