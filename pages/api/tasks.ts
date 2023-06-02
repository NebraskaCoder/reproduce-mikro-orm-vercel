import { z } from "zod";
import mikroOrmConfig from "@/config/mikro-orm";
import { MikroORM } from "@mikro-orm/core";

import { Task } from "@/models/Task";

import type { NextApiRequest, NextApiResponse } from "next";
import type { PostgreSqlDriver } from "@mikro-orm/postgresql";
import type { EMType } from "@/types/MikroORMTypes";

const schemaPost = z.object({
  slug: z.string().min(1),
  subject: z.string().min(1),
  description: z.string().min(1),
});

async function HandleGet(
  em: EMType,
  _req: NextApiRequest,
  res: NextApiResponse<Task[] | { message: string }>
) {
  const tasks = await em.find(Task, {});

  return res.status(200).json(tasks);
}

async function HandlePost(
  em: EMType,
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

    const task = new Task();
    task.slug = slug;
    task.subject = subject;
    task.description = description;

    await em.persistAndFlush(task);
    return res.status(201).json(task);
  } catch (ex) {
    console.log("Error creating task:", ex);
    return res.status(500).json({ message: "Error creating task." });
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Task | Task[] | { message: string }>
) {
  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed." });
  }

  const orm = await MikroORM.init<PostgreSqlDriver>(mikroOrmConfig);

  const em = orm.em.fork();

  switch (req.method) {
    case "GET":
      return await HandleGet(em, req, res);
    case "POST":
      return await HandlePost(em, req, res);
  }
}
