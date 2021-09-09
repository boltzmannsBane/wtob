import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      await handleConsumeRequest(req.body, res);
      res.status(200).json({ msg: "all good" });
    } catch (err) {
      res.status(500).json({ msg: "consume request failed" });
    }
  }
}

async function handleConsumeRequest(body, res) {
  const { id, title } = JSON.parse(body);
  let model = title.includes("Elixir") ? "potoin" : "dish";
  const deleteConsumable = await prisma[model].delete({
    where: {
      id: id,
    },
  });
}
