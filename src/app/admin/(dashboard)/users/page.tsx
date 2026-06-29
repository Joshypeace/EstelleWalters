'use client'

import { motion } from 'framer-motion'
import { Check, X, ShieldCheck, Shield, Trash2, Clock } from 'lucide-react'
import { PageHeader } from '@/components/admin/ui'
import { cn } from '@/lib/utils'
import { trpc } from '@/trpc/react'

function StatusPill({ status }: { status: string }) {
  const tone =
    status === 'APPROVED'
      ? 'bg-green-500/20 text-green-400'
      : status === 'REJECTED'
        ? 'bg-destructive/20 text-destructive'
        : 'bg-yellow-500/20 text-yellow-400'
  return <span className={cn('px-2.5 py-0.5 rounded-full text-xs font-semibold', tone)}>{status}</span>
}

export default function AdminUsersPage() {
  const utils = trpc.useUtils()
  const { data: users = [], isLoading } = trpc.user.list.useQuery()
  const invalidate = () => utils.user.list.invalidate()
  const setApproval = trpc.user.setApproval.useMutation({ onSuccess: invalidate, onError: (e) => alert(e.message) })
  const setRole = trpc.user.setRole.useMutation({ onSuccess: invalidate, onError: (e) => alert(e.message) })
  const remove = trpc.user.remove.useMutation({ onSuccess: invalidate, onError: (e) => alert(e.message) })

  const pending = users.filter((u) => u.approvalStatus === 'PENDING')

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <PageHeader
        title="Users & Access"
        description="Approve accounts and manage who can sign in to the dashboard."
      />

      {pending.length > 0 && (
        <div className="mb-6 flex items-center gap-2 text-sm text-yellow-400">
          <Clock size={16} />
          {pending.length} account{pending.length === 1 ? '' : 's'} awaiting approval
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border rounded-lg overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="text-left px-6 py-4 text-sm font-semibold text-muted-foreground">User</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-muted-foreground">Role</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-muted-foreground">Status</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b border-border last:border-b-0 hover:bg-accent/5 transition">
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-foreground">{u.name ?? '—'}</p>
                    <p className="text-xs text-muted-foreground">{u.email}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 text-sm text-foreground">
                      {u.role === 'ADMIN' ? <ShieldCheck size={15} className="text-accent" /> : <Shield size={15} className="text-muted-foreground" />}
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <StatusPill status={u.approvalStatus} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      {u.approvalStatus !== 'APPROVED' && (
                        <button
                          onClick={() => setApproval.mutate({ id: u.id, status: 'APPROVED' })}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-green-500/15 text-green-400 hover:bg-green-500/25 transition text-xs font-medium"
                        >
                          <Check size={14} /> Approve
                        </button>
                      )}
                      {u.approvalStatus !== 'REJECTED' && (
                        <button
                          onClick={() => setApproval.mutate({ id: u.id, status: 'REJECTED' })}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-secondary text-muted-foreground hover:text-destructive transition text-xs font-medium"
                        >
                          <X size={14} /> Reject
                        </button>
                      )}
                      <button
                        onClick={() => setRole.mutate({ id: u.id, role: u.role === 'ADMIN' ? 'EDITOR' : 'ADMIN' })}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-secondary text-foreground hover:bg-secondary/70 transition text-xs font-medium"
                      >
                        {u.role === 'ADMIN' ? 'Make editor' : 'Make admin'}
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete ${u.email}? This cannot be undone.`)) remove.mutate({ id: u.id })
                        }}
                        className="text-muted-foreground hover:text-destructive transition"
                        aria-label="Delete user"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {users.length === 0 && (
            <p className="py-16 text-center text-muted-foreground text-sm">
              {isLoading ? 'Loading…' : 'No users yet.'}
            </p>
          )}
        </div>
      </motion.div>
    </div>
  )
}
