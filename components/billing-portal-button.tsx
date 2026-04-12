"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ExternalLink, Loader2, ReceiptText } from "lucide-react"
import { createBillingPortalSession } from "@/app/actions/stripe"
import { toast } from "sonner"

export function BillingPortalButton() {
    const [isPending, setIsPending] = useState(false)

    async function handleOpenPortal() {
        setIsPending(true)
        try {
            const { url } = await createBillingPortalSession()
            if (url) {
                window.location.href = url
            } else {
                throw new Error("Could not generate billing portal link.")
            }
        } catch (error) {
            console.error("Billing Portal Error:", error)
            toast.error(error instanceof Error ? error.message : "Something went wrong.")
        } finally {
            setIsPending(false)
        }
    }

    return (
        <Button
            variant="outline"
            className="w-full justify-between bg-card/50 hover:bg-card hover:border-primary/50 transition-all font-medium py-6"
            onClick={handleOpenPortal}
            disabled={isPending}
        >
            <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                    <ReceiptText className="h-4 w-4 text-primary" />
                </div>
                <div className="text-left">
                    <p className="text-sm font-semibold">View Billing History</p>
                    <p className="text-[10px] text-muted-foreground font-normal">Download receipts and manage cards</p>
                </div>
            </div>
            {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            ) : (
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
            )}
        </Button>
    )
}
