export interface Product {
  id: string
  name: string
  description: string
  priceInCents: number
  interval: 'month' | 'year'
  features: string[]
}

export const PRODUCTS: Product[] = [
  {
    id: 'monthly-membership',
    name: 'Monthly Membership',
    description: 'Full access to all resources, teachings, and community',
    priceInCents: 5500, // £55.00
    interval: 'month',
    features: [
      'Unlimited access to resource library',
      'PDF guides and worksheets',
      'Audio meditations and practices',
      'Video teachings and workshops',
      'New content added weekly',
      'Cancel anytime'
    ]
  },
  {
    id: 'yearly-membership',
    name: 'Annual Membership',
    description: 'Save 15% with annual billing - best value',
    priceInCents: 56100, // £561.00 (£46.75/month)
    interval: 'year',
    features: [
      'Everything in monthly membership',
      'Save 15% compared to monthly',
      'Priority access to new content',
      'Exclusive annual member resources',
      'One payment, full year access'
    ]
  }
]

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find(p => p.id === id)
}
