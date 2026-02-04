import { createClient } from "@/lib/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { BookOpen, Headphones, Play, FileText, Clock, ArrowRight } from "lucide-react"
import { ResourceFilters } from "./resource-filters"

interface ResourcesPageProps {
  searchParams: Promise<{ type?: string; category?: string; search?: string }>
}

export default async function ResourcesPage({ searchParams }: ResourcesPageProps) {
  const params = await searchParams
  const supabase = await createClient()
  
  // Build query
  let query = supabase
    .from('resources')
    .select('*, category:categories(*)')
    .eq('is_published', true)
    .order('created_at', { ascending: false })

  if (params.type) {
    query = query.eq('type', params.type)
  }

  if (params.category) {
    query = query.eq('category_id', params.category)
  }

  if (params.search) {
    query = query.ilike('title', `%${params.search}%`)
  }

  const { data: resources } = await query

  // Get categories for filter
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('sort_order', { ascending: true })

  const typeIcons = {
    pdf: FileText,
    audio: Headphones,
    video: Play,
  }

  const typeLabels = {
    pdf: "PDF Guide",
    audio: "Audio",
    video: "Video",
  }

  const typeColors = {
    pdf: "bg-blue-500/10 text-blue-600",
    audio: "bg-green-500/10 text-green-600",
    video: "bg-orange-500/10 text-orange-600",
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-bold text-foreground">Resource Library</h1>
        <p className="mt-2 text-muted-foreground">
          Explore our collection of teachings, meditations, and guides.
        </p>
      </div>

      {/* Filters */}
      <ResourceFilters 
        categories={categories || []} 
        currentType={params.type}
        currentCategory={params.category}
        currentSearch={params.search}
      />

      {/* Resources Grid */}
      {resources && resources.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource) => {
            const Icon = typeIcons[resource.type as keyof typeof typeIcons] || FileText
            const typeLabel = typeLabels[resource.type as keyof typeof typeLabels] || resource.type
            const typeColor = typeColors[resource.type as keyof typeof typeColors] || "bg-secondary text-foreground"
            
            return (
              <Card key={resource.id} className="group border-border/50 transition-all hover:border-primary/30 hover:shadow-lg">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <Badge variant="secondary" className={typeColor}>
                      {typeLabel}
                    </Badge>
                  </div>
                  <CardTitle className="mt-4 line-clamp-2 font-serif text-lg group-hover:text-primary">
                    {resource.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {resource.description || 'No description available'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      {resource.duration_minutes && (
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {resource.duration_minutes} min
                        </span>
                      )}
                      {resource.category && (
                        <span>{resource.category.name}</span>
                      )}
                    </div>
                    <Button size="sm" variant="ghost" asChild>
                      <Link href={`/dashboard/resources/${resource.slug}`}>
                        View
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      ) : (
        <Card className="border-border/50">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <BookOpen className="h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 font-semibold text-foreground">No Resources Found</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Try adjusting your filters or check back later for new content.
            </p>
            <Button variant="outline" className="mt-4 bg-transparent" asChild>
              <Link href="/dashboard/resources">Clear Filters</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
