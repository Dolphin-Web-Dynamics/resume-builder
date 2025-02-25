"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Item {
  id: string
  title: string
  content: string
}

const initialItems: Item[] = [
  { id: "1", title: "Item 1", content: "This is the content for Item 1. It can be quite long and detailed if needed." },
  {
    id: "2",
    title: "Item 2",
    content: "Here's the content for Item 2. Feel free to expand this with more information.",
  },
  { id: "3", title: "Item 3", content: "Content for Item 3 goes here. You can add as much text as you want." },
]

export default function ExpandableList() {
  const [items, setItems] = useState<Item[]>(initialItems)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const handleToggle = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const handleDelete = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
    if (expandedId === id) {
      setExpandedId(null)
    }
  }

  return (
    <div className="w-full max-w-md space-y-2">
      {items.map((item) => (
        <div key={item.id} className="border rounded-lg overflow-hidden">
          <div className="flex items-center justify-between p-4 bg-background">
            <h3 className="text-lg font-medium">{item.title}</h3>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" onClick={() => handleToggle(item.id)}>
                {expandedId === item.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                <span className="sr-only">Toggle item</span>
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}>
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete item</span>
              </Button>
            </div>
          </div>
          <AnimatePresence>
            {expandedId === item.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <div className="p-4 bg-muted">
                  <p>{item.content}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}

