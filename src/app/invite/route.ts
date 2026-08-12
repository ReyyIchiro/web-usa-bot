import { brand } from "../../../brand.config";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.redirect(brand.inviteUrl, { status: 302 });
}
