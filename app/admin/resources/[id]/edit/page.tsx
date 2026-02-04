import { createClient } from "@/lib/server"
import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ResourceForm } from "../../resource-form"

interface EditResourcePageProps {
  params: Promise<{ id: string }>
}

export default async function EditResourcePage({ params }: EditResourcePageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data: resource } = await supabase
    .from('resources')
    .select('*')
    .eq('id', id)
    .single()

  if (!resource) {
    notFound()
  }

  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('name', { ascending: true })

  return (
    <div className="space-y-8">
      <div>
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/admin/resources">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Resources
          </Link>
        </Button>
        <h1 className="font-serif text-3xl font-bold text-foreground">Edit Resource</h1>
        <p className="mt-2 text-muted-foreground">
          Update the details for this resource.
        </p>
      </div>

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Resource Details</CardTitle>
          <CardDescription>
            Make changes to your resource below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResourceForm categories={categories || []} resource={resource} />
        </CardContent>
      </Card>
    </div>
  )
}
