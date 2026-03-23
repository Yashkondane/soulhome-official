import { getBlogBySlug, getPublishedBlogs } from "@/app/actions/blog"
import { notFound } from "next/navigation"
import Image from "next/image"
import ReactMarkdown from "react-markdown"
import { Calendar, User, ArrowLeft, Image as ImageIcon } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const blog = await getBlogBySlug(slug)
  
  if (!blog) {
    return { title: 'Not Found' }
  }

  return {
    title: `${blog.title} | Soulhome Blog`,
    description: blog.excerpt || blog.title,
    openGraph: {
      images: [blog.cover_image_url],
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const blog = await getBlogBySlug(slug)

  if (!blog) {
    notFound()
  }

  return (
    <article className="min-h-screen pt-28 pb-24 bg-background selection:bg-primary/20">
      <div className="mx-auto max-w-4xl px-6 sm:px-8">
        
        {/* Back Button */}
        <Button variant="ghost" className="mb-8 text-muted-foreground hover:text-foreground -ml-2" asChild>
          <Link href="/blog">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Journal
          </Link>
        </Button>

        {/* Header Content */}
        <header className="space-y-6 mb-12">
          <div className="flex items-center gap-4 text-sm font-medium text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {new Date(blog.published_at!).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
            <div className="w-1 h-1 rounded-full bg-border" />
            <div className="flex items-center gap-1.5 capitalize">
              <User className="w-4 h-4" />
              {blog.profiles?.full_name || 'Soulhome'}
            </div>
          </div>
          
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground font-bold tracking-tight leading-tight">
            {blog.title}
          </h1>
          
          {blog.excerpt && (
            <p className="text-xl text-muted-foreground leading-relaxed">
              {blog.excerpt}
            </p>
          )}
        </header>

        {/* Hero Image */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full rounded-2xl overflow-hidden mb-16 shadow-2xl border border-border/50">
          <img 
            src={blog.cover_image_url} 
            alt={blog.title} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Markdown Content */}
        <div className="prose prose-lg dark:prose-invert prose-headings:font-serif prose-headings:font-semibold prose-a:text-primary hover:prose-a:text-primary/80 max-w-none mb-20 prose-img:rounded-xl prose-img:border prose-img:border-border/50">
          <ReactMarkdown>{blog.content}</ReactMarkdown>
        </div>

        {/* Image Gallery (Minimum 3 images support) */}
        {blog.gallery_image_urls && blog.gallery_image_urls.length > 0 && (
          <div className="mt-20 pt-16 border-t border-border/50">
            <div className="flex items-center gap-3 mb-8">
              <ImageIcon className="w-6 h-6 text-primary" />
              <h2 className="font-serif text-3xl font-semibold text-foreground">Gallery</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[250px]">
              {blog.gallery_image_urls.map((url: string, index: number) => (
                <div 
                  key={index}
                  className={`relative rounded-xl overflow-hidden shadow-sm border border-border/50 group ${
                    // Make the first image span 2 columns if there are exactly 3 images, or just mason it.
                    index === 0 && blog.gallery_image_urls.length === 3 ? 'sm:col-span-2 lg:col-span-1' : ''
                  }`}
                >
                  <img 
                    src={url} 
                    alt={`Gallery image ${index + 1}`} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </article>
  )
}
