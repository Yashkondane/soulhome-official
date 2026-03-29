
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Calendar, User } from "lucide-react"
import { getPublishedBlogs } from "@/app/actions/blog"

export const metadata = {
  title: "Blog | Soulhome",
  description: "Read the latest insights and teachings.",
}

export default async function BlogPage() {
  const blogs = await getPublishedBlogs()

  return (
    <main className="min-h-screen pt-28 pb-24 sm:pt-32 bg-background flex flex-col items-center">
      {/* Decorative Top Arch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-3xl -z-10" />

      <div className="mx-auto w-full max-w-5xl px-6 sm:px-8">
        <div className="text-center mb-16 space-y-4">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground">
            Teachings & <span className="text-primary italic">Insights</span>
          </h1>
          <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto">
            Explore articles about spiritual growth, healing, and inner peace.
          </p>
        </div>

        {blogs && blogs.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog: any) => (
              <Link key={blog.id} href={`/blog/${blog.slug}`} className="group block">
                <Card className="h-full border-border/50 bg-secondary/10 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img
                      src={blog.cover_image_url}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(blog.published_at!).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                      <div className="flex items-center gap-1.5 capitalize">
                        <User className="w-3.5 h-3.5" />
                        {((blog.profiles as any)?.full_name) || 'Soulhome'}
                      </div>
                    </div>

                    <h2 className="font-serif text-xl font-medium text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                      {blog.title}
                    </h2>

                    {blog.excerpt && (
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-4 leading-relaxed">
                        {blog.excerpt}
                      </p>
                    )}

                    <div className="flex items-center text-sm font-medium text-primary mt-auto">
                      Read Article
                      <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 px-4 rounded-2xl bg-secondary/5 border border-border/50">
            <h3 className="font-serif text-2xl text-foreground mb-2">Coming Soon</h3>
            <p className="text-muted-foreground">The blog is currently empty. Check back soon for new teachings.</p>
          </div>
        )}
      </div>
    </main>
  )
}
