// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const potions = await prisma.referencePotion.findMany({
        include: { recipe: true },
      });
      const ingredients = await prisma.ingredient.findMany();
      const data = { potions: potions, ingredients: ingredients };
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  }
}
