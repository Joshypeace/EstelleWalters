'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Save } from 'lucide-react'
import { cn } from '@/lib/utils'
import { trpc } from '@/trpc/react'

type Settings = {
  siteName: string
  siteUrl: string
  email: string
  phone: string
  description: string
}

const EMPTY: Settings = { siteName: '', siteUrl: '', email: '', phone: '', description: '' }

export default function SettingsPage() {
  const utils = trpc.useUtils()
  const { data, isLoading } = trpc.setting.get.useQuery()
  const saveMutation = trpc.setting.set.useMutation({ onSuccess: () => utils.setting.get.invalidate() })

  const [settings, setSettings] = useState<Settings>(EMPTY)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (data && !loaded) {
      setSettings({ ...EMPTY, ...data })
      setLoaded(true)
    }
  }, [data, loaded])

  const handleChange = (field: keyof Settings, value: string) => {
    setSettings((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = async () => {
    try {
      await saveMutation.mutateAsync(settings)
    } catch (e) {
      alert((e as Error)?.message ?? 'Could not save settings.')
    }
  }

  const inputClass =
    'w-full px-4 py-2.5 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition'

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h2 className="text-3xl font-serif font-bold text-foreground mb-2">Settings</h2>
        <p className="text-muted-foreground">Manage your site configuration and preferences</p>
      </motion.div>

      {isLoading ? (
        <p className="text-muted-foreground py-16 text-center text-sm">Loading…</p>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-bold text-foreground mb-6">General</h3>
            <div className="space-y-5">
              <div>
                <label htmlFor="siteName" className="block text-sm font-medium text-foreground mb-2">Site Name</label>
                <input id="siteName" type="text" value={settings.siteName} onChange={(e) => handleChange('siteName', e.target.value)} className={inputClass} />
              </div>
              <div>
                <label htmlFor="siteUrl" className="block text-sm font-medium text-foreground mb-2">Site URL</label>
                <input id="siteUrl" type="url" value={settings.siteUrl} onChange={(e) => handleChange('siteUrl', e.target.value)} className={inputClass} />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-foreground mb-2">Site Description</label>
                <textarea id="description" value={settings.description} onChange={(e) => handleChange('description', e.target.value)} rows={4} className={cn(inputClass, 'resize-none')} />
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-bold text-foreground mb-6">Contact Information</h3>
            <div className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">Email</label>
                <input id="email" type="email" value={settings.email} onChange={(e) => handleChange('email', e.target.value)} className={inputClass} />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">Phone</label>
                <input id="phone" type="tel" value={settings.phone} onChange={(e) => handleChange('phone', e.target.value)} className={inputClass} />
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            disabled={saveMutation.isPending}
            className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-3 rounded-lg font-medium transition disabled:opacity-60"
          >
            <Save size={20} />
            {saveMutation.isPending ? 'Saving…' : 'Save Changes'}
          </motion.button>
        </motion.div>
      )}
    </div>
  )
}
