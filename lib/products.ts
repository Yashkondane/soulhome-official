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
  {
    id: 'yearly-membership',
    name: 'Annual Membership',
    description: 'Save 15% with annual billing - best value',
    priceInCents: 56100, // £561.00 (£46.75/month)
    interval: 'year',
    type: 'subscription',
    features: [
      'Everything in monthly membership',
      'Save 15% compared to monthly',
      'Priority access to new content',
      'Exclusive annual member resources',
      'One payment, full year access'
    ]
  },
  // PLACEHOLDER EVENTS - REPLACE IDs WITH REAL STRIPE PRICE IDs
  {
    id: 'event-1-id', // TODO: User to replace this
    name: 'Event 1 Title',
    description: 'Description for Event 1',
    priceInCents: 2000, // £20.00
    interval: 'month', // Not used for one_time but kept for type compatibility if needed, or better to make optional
    type: 'one_time',
    features: [
      'Live access to the event',
      'Q&A session',
      'Recording included'
    ]
  },
  {
    id: 'event-2-id', // TODO: User to replace this
    name: 'Event 2 Title',
    description: 'Description for Event 2',
    priceInCents: 3500, // £35.00
    interval: 'month',
    type: 'one_time',
    features: [
      'Workshop access',
      'Materials included',
      'Community access'
    ]
  }
]

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find(p => p.id === id)
}
