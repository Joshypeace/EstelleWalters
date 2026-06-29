'use client'

import { Testimonials } from '@/components/sections/testimonials'
import { trpc } from '@/trpc/react'

interface VentureTestimonialsProps {
  ventureSlug: string
  title?: string
}

export function VentureTestimonials({
  ventureSlug,
  title = 'What Our Clients Say',
}: VentureTestimonialsProps) {
  const { data: testimonials = [] } = trpc.testimonial.byVenture.useQuery({ ventureSlug })

  if (testimonials.length === 0) return null

  return <Testimonials title={title} testimonials={testimonials} />
}
