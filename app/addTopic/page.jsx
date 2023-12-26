"use client"
import { useRouter } from "next/router"
import { useState } from "react"

export default function AddTopic() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title || !description) {
      alert("Title and description are required.")
      return
    }

    try {
      const res = await fetch(`${process.env.DOMAIN}/api/topics`, {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({ title, description })
      })

      if (!res.ok) {
        throw new Error("Failed to create a topic")
      }

      // if (res.ok) {
      router.push("/")
      // } else {
      //   throw new Error("Failed to create a topic")
      // }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className="border border-slate-500 px-6 py-2"
        placeholder="Topic Title"
      />
      <input
        type="text"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className="border border-slate-500 px-6 py-2"
        placeholder="Topic Description"
      />
      <button
        type="submit"
        className="bg-green-600 font-bold text-white py-3 px-6 w-fit rounded-md"
      >
        Add Topic
      </button>
    </form>
  )
}
