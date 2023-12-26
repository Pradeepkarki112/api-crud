import Topic from "@/models/topic"
import { NextResponse } from "next/server"
import connectMongoDB from "./../../../src/libs/mongodb"

export async function POST(request) {
  const { title, description } = await request.json()
  await connectMongoDB()
  await Topic.create({ title, description })
  return NextResponse.json({ message: "Topic Created " }, { status: 201 })
}

export async function GET() {
  await connectMongoDB()
  const topics = await Topic.find()
  return NextResponse.json({ topics })
}
