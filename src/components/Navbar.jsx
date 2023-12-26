import Link from "next/link"
import React from "react"

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center bg-slate-800 px-8 py-3 mb-3">
      <Link className="text-[#00FFFF] font-bold" href={"/"}>
        API Tutorial
      </Link>
      <Link className="bg-[#00FFFF] p-2  rounded-md" href={"/addTopic"}>
        Add Topic
      </Link>
    </nav>
  )
}
