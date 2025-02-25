"use client"

import { useState } from "react"
import { Minus } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"

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

export default function AccordionWithDelete() {
  const [items, setItems] = useState<Item[]>(initialItems)

  const handleDelete = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
  }

  return (
    <Accordion type="single" collapsible className="w-full max-w-md">
      {items.map((item) => (
        <AccordionItem value={item.id} key={item.id}>
          <div className="flex items-center justify-between">
            <AccordionTrigger>{item.title}</AccordionTrigger>
            <Button
              variant="ghost"
              size="icon"
              className="mr-2 h-8 w-8 shrink-0"
              onClick={(e) => {
                e.stopPropagation()
                handleDelete(item.id)
              }}
            >
              <Minus className="h-4 w-4" />
              <span className="sr-only">Delete item</span>
            </Button>
          </div>
          <AccordionContent>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

