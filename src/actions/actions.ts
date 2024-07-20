"use server"

import { cookies } from "next/headers"

export async function setLanguage(lang: string): Promise<void> {
  cookies().set("locale", lang)
}