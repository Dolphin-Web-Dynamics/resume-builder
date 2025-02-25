"use client"

import { useState } from "react"
import { Minus, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Item {
  id: string
  title: string
  content: string
}

const initialItems: Item[] = [
  { id: "1", title: "Item 1", content: "Content for Item 1" },
  { id: "2", title: "Item 2", content: "Content for Item 2" },
  { id: "3", title: "Item 3", content: "Content for Item 3" },
]

export default function CardWithDelete(items) {
  const [items, setItems] = useState<Item[]>(initialItems)
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

  const handleDelete = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
    setExpandedItems((prev) => {
      const newSet = new Set(prev)
      newSet.delete(id)
      return newSet
    })
  }

  const toggleExpand = (id: string) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  return (
    <div className="w-full max-w-md space-y-4">
      {items.map((item) => (
        <Card key={item.id}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toggleExpand(item.id)}>
                {expandedItems.has(item.id) ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                <span className="sr-only">Toggle expand</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleDelete(item.id)}>
                <Minus className="h-4 w-4" />
                <span className="sr-only">Delete item</span>
              </Button>
            </div>
          </CardHeader>
          {expandedItems.has(item.id) && (
            <CardContent>
              <p>{item.content}</p>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  )
}

