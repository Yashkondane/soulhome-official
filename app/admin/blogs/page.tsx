import { adminGetBlogs, deleteBlog } from "@/app/actions/blog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PlusCircle, Pencil, Trash2, Eye, EyeOff } from "lucide-react"

export default async function AdminBlogsPage() {
  const blogs = await adminGetBlogs()

  return (
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h1 className="font-serif text-4xl font-bold text-foreground tracking-tight">Content Management</h1>
          <p className="mt-2 text-muted-foreground text-lg font-medium opacity-80">
            Publish and distribute spiritual wisdom through your blog.
          </p>
        </div>
        <Button asChild className="rounded-xl px-6 py-6 h-auto shadow-xl shadow-primary/20 transition-transform active:scale-95 group">
          <Link href="/admin/blogs/new">
            <PlusCircle className="mr-2 h-5 w-5 transition-transform group-hover:rotate-90 duration-300" />
            New Spiritual Guide
          </Link>
        </Button>
      </div>

      <Card className="border-border/40 bg-white/40 backdrop-blur-xl dark:bg-black/40 overflow-hidden">
        <CardHeader className="border-b border-border/40 pb-6 bg-secondary/10">
          <div className="flex items-center gap-4">
             <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FileText className="h-5 w-5" />
             </div>
             <div>
                <CardTitle className="font-serif text-2xl tracking-tight">Manuscript Library</CardTitle>
                <CardDescription>Comprehensive list of all your published and drafted articles.</CardDescription>
             </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {blogs && blogs.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                 <thead>
                    <tr className="border-b border-border/40 bg-secondary/5 text-[10px] uppercase font-bold tracking-[0.2em] text-muted-foreground/60">
                       <th className="px-6 py-4">Status</th>
                       <th className="px-6 py-4">Title</th>
                       <th className="px-6 py-4">Creation Date</th>
                       <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-border/40">
                   {blogs.map((blog) => (
                     <tr key={blog.id} className="group transition-colors hover:bg-primary/5">
                        <td className="px-6 py-5 align-middle">
                          {blog.is_published ? (
                            <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 text-[10px] font-bold uppercase tracking-wider rounded-full py-0.5 px-3">
                               Live
                            </Badge>
                          ) : (
                            <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 text-[10px] font-bold uppercase tracking-wider rounded-full py-0.5 px-3">
                               Draft
                            </Badge>
                          )}
                        </td>
                        <td className="px-6 py-5 align-middle">
                           <p className="font-bold text-foreground text-base tracking-tight group-hover:text-primary transition-colors">
                             {blog.title}
                           </p>
                           <p className="text-xs text-muted-foreground italic max-w-sm truncate mt-0.5 opacity-60">
                             Soulful transmission for your community
                           </p>
                        </td>
                        <td className="px-6 py-5 align-middle text-sm text-muted-foreground font-medium opacity-80">
                           {new Date(blog.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                        </td>
                        <td className="px-6 py-5 align-middle text-right">
                           <div className="flex items-center justify-end gap-2">
                              <Button variant="ghost" size="icon" asChild className="h-10 w-10 rounded-xl hover:bg-primary/10 hover:text-primary text-muted-foreground transition-all duration-300" title="Edit Post">
                                <Link href={`/admin/blogs/${blog.id}/edit`}>
                                  <Pencil className="h-5 w-5" />
                                </Link>
                              </Button>
                              <form action={async () => {
                                "use server"
                                await deleteBlog(blog.id)
                              }}>
                                <Button type="submit" variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-red-500/10 hover:text-red-500 text-muted-foreground transition-all duration-300" title="Delete Post">
                                  <Trash2 className="h-5 w-5" />
                                </Button>
                              </form>
                           </div>
                        </td>
                     </tr>
                   ))}
                 </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="h-20 w-20 rounded-full bg-primary/5 flex items-center justify-center mb-6">
                <FileText className="h-10 w-10 text-primary/40" />
              </div>
              <h3 className="text-2xl font-bold text-foreground tracking-tight">The Library is Quiet</h3>
              <p className="mt-2 text-muted-foreground font-medium max-w-sm mx-auto">
                Your thoughts are yet to be recorded. Share your wisdom with the world through a new blog post.
              </p>
              <Button asChild className="mt-10 rounded-xl px-8 py-6 text-lg h-auto shadow-xl shadow-primary/20">
                <Link href="/admin/blogs/new">Transcribe First Post</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
