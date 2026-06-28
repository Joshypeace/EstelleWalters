'use client'

import { motion } from 'framer-motion'
import { Edit2, Trash2, ExternalLink } from 'lucide-react'
import { useState } from 'react'

interface Business {
  id: number
  name: string
  type: string
  status: string
  revenue: string
  employees: number
}

export default function BusinessesPage() {
  const [businesses] = useState<Business[]>([
    {
      id: 1,
      name: 'Bilas Studio',
      type: 'Beauty Services',
      status: 'Active',
      revenue: '$45K/month',
      employees: 12,
    },
    {
      id: 2,
      name: 'Bilas Beauty',
      type: 'E-commerce',
      status: 'Active',
      revenue: '$32K/month',
      employees: 8,
    },
    {
      id: 3,
      name: 'ConnetSuppliers',
      type: 'B2B Network',
      status: 'Active',
      revenue: '$28K/month',
      employees: 5,
    },
  ])

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-3xl font-serif font-bold text-foreground mb-2">Businesses</h2>
        <p className="text-muted-foreground">Manage your business portfolios and operations</p>
      </motion.div>

      {/* Businesses Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {businesses.map((business, i) => (
          <motion.div
            key={business.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-card border border-border rounded-lg p-6 hover:border-accent/50 transition group"
          >
            {/* Header */}
            <div className="mb-4">
              <h3 className="text-lg font-bold text-foreground mb-1">{business.name}</h3>
              <p className="text-sm text-muted-foreground">{business.type}</p>
            </div>

            {/* Stats */}
            <div className="space-y-3 mb-6 pb-6 border-b border-border">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Status:</span>
                <span className="text-sm font-semibold text-green-400">{business.status}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Monthly Revenue:</span>
                <span className="text-sm font-semibold text-accent">{business.revenue}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Team Size:</span>
                <span className="text-sm font-semibold text-foreground">{business.employees}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 text-accent hover:text-accent/80 transition text-sm font-medium"
              >
                <ExternalLink size={16} />
                View
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-accent hover:text-accent/80 transition ml-auto"
              >
                <Edit2 size={18} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-muted-foreground hover:text-destructive transition"
              >
                <Trash2 size={18} />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
