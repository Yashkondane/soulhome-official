import { Loader2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export default function CheckoutSuccessLoading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-secondary/30 px-4 py-12">
      <div className="mb-8 flex flex-col items-center gap-4 animate-pulse">
        <div className="relative h-24 w-24">
          <Image
            src="/logo.png"
            alt="Soul Home"
            fill
            className="object-contain"
          />
        </div>
        <span className="font-serif text-2xl font-semibold text-foreground">Soul Home</span>
      </div>

      <Card className="w-full max-w-md border-border/50 text-center shadow-lg">
        <CardContent className="flex flex-col items-center justify-center space-y-6 pt-10 pb-8">
          <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <Loader2 className="absolute h-10 w-10 text-primary animate-spin" />
            <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-ping" />
          </div>
          
          <div className="space-y-2">
            <h2 className="font-serif text-2xl font-semibold text-foreground">Processing Payment...</h2>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
              Please wait a moment while we securely confirm your subscription. Do not refresh the page.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
