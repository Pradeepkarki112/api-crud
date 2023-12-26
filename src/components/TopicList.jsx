import React from "react"
import Link from "next/link"
import RemoveBtn from "./RemoveBtn"
import { HiPencilAlt } from "react-icons/hi"

const getTopics = async () => {
  try {
    const res = await fetch(`${process.env.DOMAIN}/api/topics`, {
      cache: "no-store"
    })

    if (!res.ok) {
      throw new Error("Failed to fetch topics")
    }

    return res.json()
  } catch (error) {
    console.log("Error loading topics:", error)
  }
}

export default async function TopicList() {
  const { topics } = await getTopics()
  return (
    <>
      {topics.map((item, index) => (
        <div
          key={index}
          className="p-4 border border-slate-300 rounded-md my-3 flex justify-between items-start gap-5"
        >
          <div>
            <h2 className="font-bold text-2xl">{item.title}</h2>
            <div>{item.description}</div>
          </div>
          <div className="flex gap-2">
            <RemoveBtn />
            <Link href={`/editTopic/${item._id}`}>
              <HiPencilAlt size={24} />
            </Link>
          </div>
        </div>
      ))}
    </>
  )
}
