import Topic from "@/models/topic"
import { NextResponse } from "next/server"
import connectMongoDB from "../../../src/libs/mongodb"

export async function POST(request) {
  try {
    const { title, description } = await request.json()

    if (!title || !description) {
      return NextResponse.json(
        { error: "title and description are required" },
        { status: 400 }
      )
    }

    await connectMongoDB()
    await Topic.create({ title, description })

    return NextResponse.json({ message: "Topic Created" }, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    await connectMongoDB()
    const topics = await Topic.find()

    return NextResponse.json({ topics }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}

export async function DELETE(request) {
  try {
    const id = request.nextUrl.searchParams.get("id")

    if (!id) {
      return NextResponse.json(
        { error: "ID parameter is required" },
        { status: 400 }
      )
    }

    await connectMongoDB()
    const deletedTopic = await Topic.findByIdAndDelete(id)

    if (!deletedTopic) {
      return NextResponse.json({ error: "Topic not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Topic Deleted" }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
