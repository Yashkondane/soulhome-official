"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, Loader2, CheckCircle2 } from "lucide-react"
import { createClient } from "@/lib/client"

interface DownloadButtonProps {
  resourceId: string
  fileUrl: string
  fileName: string
  hasDownloaded: boolean
}

export function DownloadButton({ 
  resourceId, 
  fileUrl, 
  fileName, 
  hasDownloaded 
}: DownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloaded, setDownloaded] = useState(hasDownloaded)

  async function handleDownload() {
    setIsDownloading(true)

    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        throw new Error("Not authenticated")
      }

      // Record the download if not already recorded
      if (!downloaded) {
        await supabase.from('downloads').insert({
          user_id: user.id,
          resource_id: resourceId,
        })
        setDownloaded(true)
      }

      // Trigger the download
      const response = await fetch(fileUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = fileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Download failed:', error)
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
            Downloading...
          </>
        ) : (
          <>
            <Download className="mr-2 h-4 w-4" />
            Download
          </>
        )}
      </Button>
      {downloaded && (
        <p className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
          <CheckCircle2 className="h-3 w-3 text-primary" />
          Previously downloaded
        </p>
      )}
    </div>
  )
}
