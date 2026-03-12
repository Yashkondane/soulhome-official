"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { AlertTriangle, Loader2 } from "lucide-react"
import { cancelSubscription } from "@/app/actions/stripe"

interface CancelSubscriptionDialogProps {
    username: string
    periodEnd: string
}

export function CancelSubscriptionDialog({ username, periodEnd }: CancelSubscriptionDialogProps) {
    const [open, setOpen] = useState(false)
    const [inputValue, setInputValue] = useState("")
    const [error, setError] = useState("")
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    const isConfirmed = inputValue.trim() === username.trim()

    function handleOpenChange(val: boolean) {
        if (!isPending) {
            setOpen(val)
            setInputValue("")
            setError("")
        }
    }

    function handleCancel() {
        if (!isConfirmed) {
            setError("Username does not match. Please try again.")
            return
        }

        startTransition(async () => {
            try {
                await cancelSubscription()
                setOpen(false)
                router.refresh()
            } catch (err) {
                setError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
            }
        })
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="w-full border-destructive/50 text-destructive hover:bg-destructive/10 hover:text-destructive bg-transparent"
                >
                    Cancel Subscription
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
                            <AlertTriangle className="h-5 w-5 text-destructive" />
                        </div>
                        <div>
                            <DialogTitle className="text-destructive">Cancel Subscription</DialogTitle>
                            <DialogDescription className="mt-1 text-sm">
                                This action cannot be undone.
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <div className="space-y-4 py-2">
                    {/* Warning box */}
                    <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4 space-y-2">
                        <p className="text-sm font-medium text-destructive">
                            ⚠️ Your subscription will be cancelled immediately.
                        </p>
                        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                            <li>No refunds will be provided.</li>
                            <li>Your access to all resources will be revoked immediately.</li>
                            <li>Any downloaded resources will no longer be available.</li>
                        </ul>
                    </div>

                    {/* GitHub-style confirmation */}
                    <div className="space-y-2">
                        <Label htmlFor="confirm-username" className="text-sm">
                            Please type{" "}
                            <span className="font-mono font-semibold text-foreground bg-secondary px-1.5 py-0.5 rounded">
                                {username}
                            </span>{" "}
                            to confirm.
                        </Label>
                        <Input
                            id="confirm-username"
                            value={inputValue}
                            onChange={(e) => {
                                setInputValue(e.target.value)
                                setError("")
                            }}
                            placeholder={username}
                            disabled={isPending}
                            className={error ? "border-destructive focus-visible:ring-destructive" : ""}
                            autoComplete="off"
                        />
                        {error && (
                            <p className="text-xs text-destructive">{error}</p>
                        )}
                    </div>
                </div>

                <DialogFooter className="gap-2 sm:gap-2">
                    <Button
                        variant="outline"
                        onClick={() => handleOpenChange(false)}
                        disabled={isPending}
                        className="bg-transparent"
                    >
                        Keep Subscription
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={handleCancel}
                        disabled={!isConfirmed || isPending}
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Cancelling...
                            </>
                        ) : (
                            "Cancel Subscription"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
