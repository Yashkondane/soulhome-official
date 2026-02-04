import { createClient } from "@/lib/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Plus, FileText, Headphones, Play, Eye, EyeOff, Pencil, Trash2, Download } from "lucide-react"
import { DeleteResourceButton } from "./delete-resource-button"

export default async function AdminResourcesPage() {
  const supabase = await createClient()

  const { data: resources } = await supabase
    .from('resources')
    .select('*, category:categories(*)')
    .order('created_at', { ascending: false })

  const typeIcons = {
    pdf: FileText,
    audio: Headphones,
    video: Play,
  }

  const typeLabels = {
    pdf: "PDF",
    audio: "Audio",
    video: "Video",
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">Resources</h1>
          <p className="mt-2 text-muted-foreground">
            Manage your resource library content.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/resources/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Resource
          </Link>
        </Button>
      </div>

      {resources && resources.length > 0 ? (
        <div className="space-y-4">
          {resources.map((resource) => {
            const Icon = typeIcons[resource.type as keyof typeof typeIcons] || FileText
            const typeLabel = typeLabels[resource.type as keyof typeof typeLabels] || resource.type

            return (
              <Card key={resource.id} className="border-border/50">
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 overflow-hidden">
                    {resource.thumbnail_url ? (
                      <img
                        src={resource.thumbnail_url}
                        alt={resource.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <Icon className="h-6 w-6 text-primary" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="truncate font-medium text-foreground">
                        {resource.title}
                      </h3>
                      <Badge variant="outline">{typeLabel}</Badge>
                      {resource.is_published ? (
                        <Badge variant="secondary" className="bg-green-500/10 text-green-600">
                          <Eye className="mr-1 h-3 w-3" />
                          Published
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="bg-orange-500/10 text-orange-600">
                          <EyeOff className="mr-1 h-3 w-3" />
                          Draft
                        </Badge>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {resource.category?.name || 'Uncategorized'} • Created {new Date(resource.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/admin/resources/${resource.id}/edit`}>
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Link>
                    </Button>
                    <DeleteResourceButton resourceId={resource.id} resourceTitle={resource.title} />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      ) : (
        <Card className="border-border/50">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <FileText className="h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 font-semibold text-foreground">No Resources Yet</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Start building your resource library by adding your first resource.
            </p>
            <Button className="mt-4" asChild>
              <Link href="/admin/resources/new">
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Resource
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
