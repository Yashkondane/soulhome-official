"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, Loader2, CheckCircle2 } from "lucide-react"
import { toast } from "sonner"
import { downloadResource } from "@/app/actions/download"

interface DownloadButtonProps {
  resourceId: string
  fileUrl: string
  fileName: string
  hasDownloaded: boolean
  slug: string
}

export function DownloadButton({
  resourceId,
  fileUrl,
  fileName,
  hasDownloaded,
  slug
}: DownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false)

  // We don't need local state for 'downloaded' as much because revalidatePath will update the prop
  // But for immediate feedback, we can keep it.
  const [downloaded, setDownloaded] = useState(hasDownloaded)

  async function handleDownload() {
    setIsDownloading(true)

    try {
      // Call Server Action
      const result = await downloadResource(resourceId, fileUrl, slug)

      if (result.success) {
        setDownloaded(true)
        if (result.message) {
          toast.info(result.message)
        } else {
          toast.success("Access Granted! Opening file...")
        }

        // Open the Google Drive URL
        window.open(result.url, '_blank')
      }
    } catch (error) {
      console.error('Download failed:', error)
      toast.error(error instanceof Error ? error.message : "Download failed")
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div className="space-y-3">
      <Button
        className="w-full"
        onClick={handleDownload}
        disabled={isDownloading}
      >
        {isDownloading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {downloaded ? "Opening..." : "Unlocking..."}
          </>
        ) : (
          <>
            <Download className="mr-2 h-4 w-4" />
            {downloaded ? "Open Resource" : "Download Resource"}
          </>
        )}
      </Button>
      {downloaded && (
        <p className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
          <CheckCircle2 className="h-3 w-3 text-primary" />
          Access Unlocked
        </p>
      )}
    </div>
  )
}
