import { BlogForm } from "@/components/blog-form"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export default function NewBlogPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild className="h-8 w-8 text-muted-foreground hover:text-foreground">
          <Link href="/admin/blogs">
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground tracking-tight">Write a Post</h1>
          <p className="mt-1 text-muted-foreground">Create a new article for your community.</p>
        </div>
      </div>
      <BlogForm />
    </div>
  )
}
