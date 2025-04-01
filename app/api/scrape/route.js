import * as cheerio from "cheerio";
import { NextResponse } from "next/server";
export async function POST(req) {
  const { url } = await req.json();
  try {
    const res = await fetch(url);
    const data = await res.text();

    const $ = cheerio.load(data);
    $("script, style").remove();

    const textContent = $("body")
      .find("*")
      .contents()
      .map((_, element) => {
        if (element.type === "text") {
          return $(element).text().trim();
        }
        return "";
      })
      .get()
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();

    return NextResponse.json({ data: textContent, error: null });
  } catch (error) {
    return NextResponse.json({
      data: null,
      error: { message: "Something went wrong, please try again." },
    });
  }
}
