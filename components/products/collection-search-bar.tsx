"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"

type Props = {
  onSelect: (collection: string) => void
}

export function CollectionSearchBar({ onSelect }: Props) {
  const [input, setInput] = useState("")
  const [filtered, setFiltered] = useState<string[]>([])
  const [collections, setCollections] = useState([
    "Spring 2026",
    "Summer 2026",
    "Winter 2025",
  ])
  const [isOpen, setIsOpen] = useState(false)

  const wrapperRef = useRef<HTMLDivElement>(null)

  // Filter collections on input
  useEffect(() => {
    if (input === "") setFiltered(collections)
    else
      setFiltered(
        collections.filter((c) =>
          c.toLowerCase().includes(input.toLowerCase())
        )
      )
  }, [input, collections])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSelect = (collection: string) => {
    onSelect(collection)
    setInput("")
    setIsOpen(false)
  }

  const handleCreateNew = () => {
    if (input && !collections.includes(input)) {
      setCollections((prev) => [...prev, input])
    }
    onSelect(input)
    setInput("")
    setIsOpen(false)
  }

  return (
    <div className="relative w-64" ref={wrapperRef}>
      <input
        type="text"
        value={input}
        placeholder="Search or create collection..."
        onChange={(e) => {
          setInput(e.target.value)
          setIsOpen(true)
        }}
        onFocus={() => setIsOpen(true)}
        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
          {filtered.length > 0 ? (
            filtered.map((c) => (
              <div
                key={c}
                onClick={() => handleSelect(c)}
                className="px-3 py-2 hover:bg-indigo-100 cursor-pointer"
              >
                {c}
              </div>
            ))
          ) : (
            <div className="flex justify-between items-center px-3 py-2">
              <span>No match</span>
              <Button size="sm" onClick={handleCreateNew}>
                Create "{input}"
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
