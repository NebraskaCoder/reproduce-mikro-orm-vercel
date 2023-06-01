import { z } from "zod";
import { initMikroOrm } from "@/lib/mikroorm";

import { Task } from "@/models/Task";

import type { NextApiRequest, NextApiResponse } from "next";

const schemaPost = z.object({
  slug: z.string().min(1),
  subject: z.string().min(1),
  description: z.string().min(1),
});

async function HandleGet(
  req: NextApiRequest,
  res: NextApiResponse<Task[] | { message: string }>
) {
  const em = await initMikroOrm();

  const tasks = await em.find(Task, {});

  return res.status(200).json(tasks);
}

async function HandlePost(
  req: NextApiRequest,
  res: NextApiResponse<Task | { message: string }>
) {
  const validation = schemaPost.safeParse(req.body);

  if (!validation.success) {
    if (process.env.NODE_ENV === "development") {
      console.log("Body not valid", validation.error);
    }
    return res.status(400).json({ message: "Body not valid." });
  }

  try {
    const { slug, subject, description } = validation.data;

    const em = await initMikroOrm();

    const task = new Task();
    task.slug = slug;
    task.subject = subject;
    task.description = description;

    await em.persistAndFlush(task);
    return res.status(201).json(task);
  } catch (ex) {
    console.log("Error creating auction:", ex);
    return res.status(500).json({ message: "Error creating auction." });
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Task | Task[] | { message: string }>
) {
  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed." });
  }

  switch (req.method) {
    case "GET":
      return HandleGet(req, res);
    case "POST":
      return HandlePost(req, res);
  }
}
