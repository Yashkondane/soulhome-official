import { createClient } from "@/lib/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ResourceForm } from "../resource-form"

export default async function NewResourcePage() {
  const supabase = await createClient()

  const { data: categories, error } = await supabase
    .from('categories')
    .select('*')
    .order('name', { ascending: true })
  
  console.log('[v0] Categories fetched:', categories)
  console.log('[v0] Categories error:', error)

  return (
    <div className="space-y-8">
      <div>
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/admin/resources">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Resources
          </Link>
        </Button>
        <h1 className="font-serif text-3xl font-bold text-foreground">Add New Resource</h1>
        <p className="mt-2 text-muted-foreground">
          Create a new resource for your members.
        </p>
      </div>

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Resource Details</CardTitle>
          <CardDescription>
            Fill in the details for your new resource.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResourceForm categories={categories || []} />
        </CardContent>
      </Card>
    </div>
  )
}
