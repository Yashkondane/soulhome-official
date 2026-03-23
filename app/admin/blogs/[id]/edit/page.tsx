import { BlogForm } from "@/components/blog-form"
import { adminGetBlogById } from "@/app/actions/blog"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { notFound } from "next/navigation"

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const blog = await adminGetBlogById(id)

  if (!blog) {
    notFound()
  }

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
          <h1 className="font-serif text-3xl font-bold text-foreground tracking-tight">Edit Post</h1>
          <p className="mt-1 text-muted-foreground">Modify your existing article.</p>
        </div>
      </div>
      <BlogForm initialData={blog} />
    </div>
  )
}
