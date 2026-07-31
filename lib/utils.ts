import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function safeDate(dateStr: any): Date {
  if (!dateStr) return new Date()
  const normalized = typeof dateStr === 'string' ? dateStr.replace(' ', 'T') : dateStr
  const date = new Date(normalized)
  return isNaN(date.getTime()) ? new Date() : date
}
