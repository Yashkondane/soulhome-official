import { adminGetBlogs, deleteBlog } from "@/app/actions/blog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PlusCircle, Pencil, Trash2, Eye, EyeOff } from "lucide-react"

export default async function AdminBlogsPage() {
  const blogs = await adminGetBlogs()

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground tracking-tight">Blog Management</h1>
          <p className="mt-1 text-muted-foreground text-lg">
            Create, edit, and manage your blog posts.
          </p>
        </div>
        <Button asChild className="gap-2">
          <Link href="/admin/blogs/new">
            <PlusCircle className="h-4 w-4" />
            New Post
          </Link>
        </Button>
      </div>

      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="font-serif">All Posts</CardTitle>
          <CardDescription>Manage your published and draft articles.</CardDescription>
        </CardHeader>
        <CardContent>
          {blogs && blogs.length > 0 ? (
            <div className="rounded-md border border-border/50">
              <div className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-4 p-4 font-medium text-muted-foreground border-b border-border/50 bg-secondary/20">
                <div>Title</div>
                <div className="w-24 text-center">Status</div>
                <div className="w-32 hidden sm:block">Date</div>
                <div className="w-24 text-right">Actions</div>
              </div>
              <div className="divide-y divide-border/50">
                {blogs.map((blog) => (
                  <div key={blog.id} className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-4 p-4 transition-colors hover:bg-secondary/10">
                    <div className="font-medium text-foreground truncate max-w-[200px] sm:max-w-md">
                      {blog.title}
                    </div>
                    <div className="w-24 text-center">
                      {blog.is_published ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-600 dark:text-green-400">
                          <Eye className="h-3 w-3" /> Published
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-500/10 px-2 py-1 text-xs font-medium text-yellow-600 dark:text-yellow-400">
                          <EyeOff className="h-3 w-3" /> Draft
                        </span>
                      )}
                    </div>
                    <div className="w-32 text-sm text-muted-foreground hidden sm:block">
                      {new Date(blog.created_at).toLocaleDateString()}
                    </div>
                    <div className="flex w-24 items-center justify-end gap-2">
                      <Button variant="ghost" size="icon" asChild className="h-8 w-8 text-muted-foreground hover:text-primary">
                        <Link href={`/admin/blogs/${blog.id}/edit`}>
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Link>
                      </Button>
                      <form action={async () => {
                        "use server"
                        await deleteBlog(blog.id)
                      }}>
                        <Button type="submit" variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </form>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex min-h-[200px] flex-col items-center justify-center rounded-md border border-dashed border-border/50 bg-secondary/5 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <PlusCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground font-serif">No posts yet</h3>
              <p className="mt-2 text-sm text-muted-foreground mb-4">
                You haven&apos;t written any blog posts. Start creating your first one.
              </p>
              <Button asChild variant="outline">
                <Link href="/admin/blogs/new">Write a Post</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
