import { Magic } from "@magic-sdk/admin";

export const mAdmin = new Magic(process.env.MAGIC_API_SECRET_KEY);
