import { createClient } from "@/lib/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, FolderOpen, Pencil, Trash2 } from "lucide-react"
import { CategoryForm } from "./category-form"
import { DeleteCategoryButton } from "./delete-category-button"

export default async function AdminCategoriesPage() {
  const supabase = await createClient()

  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('name', { ascending: true })

  // Get resource counts per category
  const { data: resourceCounts } = await supabase
    .from('resources')
    .select('category_id')

  const countByCategory = resourceCounts?.reduce((acc, r) => {
    if (r.category_id) {
      acc[r.category_id] = (acc[r.category_id] || 0) + 1
    }
    return acc
  }, {} as Record<string, number>) || {}

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-2">
        <h1 className="font-serif text-4xl font-bold text-foreground tracking-tight">System Taxonomy</h1>
        <p className="text-muted-foreground text-lg font-medium opacity-80">
          Organize your resource library into structured spiritual domains.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-5">
        {/* Add Category Form */}
        <Card className="lg:col-span-2 border-border/40 bg-white/40 backdrop-blur-xl dark:bg-black/40 overflow-hidden self-start">
          <CardHeader className="border-b border-border/40 pb-6 bg-primary/5">
             <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                   <Plus className="h-5 w-5" />
                </div>
                <div>
                   <CardTitle className="font-serif text-xl tracking-tight">Manifest Category</CardTitle>
                   <CardDescription>Define a new classification for your resources.</CardDescription>
                </div>
             </div>
          </CardHeader>
          <CardContent className="p-8">
            <CategoryForm />
          </CardContent>
        </Card>

        {/* Existing Categories */}
        <Card className="lg:col-span-3 border-border/40 bg-white/40 backdrop-blur-xl dark:bg-black/40 overflow-hidden">
          <CardHeader className="border-b border-border/40 pb-6 bg-secondary/10">
             <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                   <FolderOpen className="h-5 w-5" />
                </div>
                <div>
                   <CardTitle className="font-serif text-xl tracking-tight">Existing Classifications</CardTitle>
                   <CardDescription>Audit and manage your current resource taxonomy.</CardDescription>
                </div>
             </div>
          </CardHeader>
          <CardContent className="p-0">
            {categories && categories.length > 0 ? (
              <div className="divide-y divide-border/40">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center justify-between p-6 transition-colors hover:bg-primary/5"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/50 shadow-inner text-primary">
                        <FolderOpen className="h-6 w-6 opacity-60" />
                      </div>
                      <div>
                        <p className="font-bold text-foreground text-lg tracking-tight">{category.name}</p>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest opacity-60">
                          {countByCategory[category.id] || 0} RESOURCES MAPPED
                        </p>
                      </div>
                    </div>
                    <DeleteCategoryButton 
                      categoryId={category.id} 
                      categoryName={category.name}
                      hasResources={(countByCategory[category.id] || 0) > 0}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="h-20 w-20 rounded-full bg-primary/5 flex items-center justify-center mb-6">
                  <FolderOpen className="h-10 w-10 text-primary/40" />
                </div>
                <h3 className="text-2xl font-bold text-foreground tracking-tight">Taxonomy Empty</h3>
                <p className="mt-2 text-muted-foreground font-medium max-w-xs mx-auto">
                  No categories have been defined yet. Create your first classification on the left.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
