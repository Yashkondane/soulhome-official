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
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-bold text-foreground">Categories</h1>
        <p className="mt-2 text-muted-foreground">
          Organize your resources into categories.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Add Category Form */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="font-serif">Add Category</CardTitle>
            <CardDescription>
              Create a new category for your resources.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CategoryForm />
          </CardContent>
        </Card>

        {/* Existing Categories */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="font-serif">Existing Categories</CardTitle>
            <CardDescription>
              Manage your resource categories.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {categories && categories.length > 0 ? (
              <div className="space-y-3">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center justify-between rounded-lg border border-border/50 p-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <FolderOpen className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{category.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {countByCategory[category.id] || 0} resources
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
              <div className="text-center py-8">
                <FolderOpen className="mx-auto h-12 w-12 text-muted-foreground" />
                <p className="mt-4 text-sm text-muted-foreground">
                  No categories yet. Create your first one!
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
