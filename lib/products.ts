export interface Product {
  id: string
  name: string
  description: string
  priceInCents: number
  interval?: 'month' | 'year'
  features: string[]
  type: 'subscription' | 'one_time'
}

export const PRODUCTS: Product[] = [
  {
    id: 'price_1SyfmhReyyxGYZLxa7nSjsqF',
    name: 'Monthly Membership',
    description: 'Full access to all resources, teachings, and community',
    priceInCents: 5500, // £55.00
    interval: 'month',
    type: 'subscription',
    features: [
      'Unlimited access to resource library',
      'PDF guides and worksheets',
      'Audio meditations and practices',
      'Video teachings and workshops',
      'New content added weekly',
      'Cancel anytime'
    ]
  },
]

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find(p => p.id === id)
}
