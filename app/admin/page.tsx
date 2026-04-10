'use client'

import React, { useState, useEffect, useCallback } from 'react'

// ── Types ────────────────────────────────────────────────────────────────────

type DbProduct = {
  id: number
  category: 'tees' | 'caps' | 'hoodies' | 'bags' | 'gifts'
  name_en: string; name_fr: string; name_de: string
  desc_en: string; desc_fr: string; desc_de: string
  price: number
  badge: 'hot' | 'new' | 'fave' | null
  badge_en: string | null; badge_fr: string | null; badge_de: string | null
  img: string
  alt_en: string; alt_fr: string; alt_de: string
  colours: { key: string; label: string; swatch: string }[] | null
  sizes: string[] | null
  active: boolean
  sort_order: number
}

const EMPTY: Omit<DbProduct, 'id'> = {
  category: 'tees',
  name_en: '', name_fr: '', name_de: '',
  desc_en: '', desc_fr: '', desc_de: '',
  price: 0,
  badge: null,
  badge_en: null, badge_fr: null, badge_de: null,
  img: '',
  alt_en: '', alt_fr: '', alt_de: '',
  colours: null,
  sizes: null,
  active: true,
  sort_order: 0,
}

const CATEGORIES = ['tees', 'caps', 'hoodies', 'bags', 'gifts'] as const
const BADGES = ['', 'hot', 'new', 'fave'] as const

// ── Order types ───────────────────────────────────────────────────────────────

type OrderStatus = 'pending' | 'confirmed' | 'payment received' | 'packing' | 'dispatched' | 'ready for collection' | 'cancelled' | 'complete'

type OrderItem = { name: string; quantity: number; price: number; colour?: string; size?: string }

type Order = {
  id: number
  name: string
  email: string
  phone: string
  address: string
  items: OrderItem[]
  total: number
  payment_method: string
  notes: string | null
  status: OrderStatus
  created_at: string
}

const STATUSES: OrderStatus[] = ['pending', 'confirmed', 'payment received', 'packing', 'dispatched', 'ready for collection', 'cancelled', 'complete']

const STATUS_EMAIL: Partial<Record<OrderStatus, string>> = {
  confirmed:            'Your order has been confirmed — thank you!',
  'payment received':   'We\'ve received your payment. Thank you!',
  'ready for collection': 'Great news — your order is ready to collect!',
  dispatched:           'Your order is on its way!',
  cancelled:            'Your order has been cancelled. Please get in touch if you have any questions.',
}

const STATUS_COLOUR: Record<OrderStatus, string> = {
  pending:                '#F2C230',
  confirmed:              '#3A86D4',
  'payment received':     '#4EAF7C',
  packing:                '#9B6DCA',
  dispatched:             '#1C2B4A',
  'ready for collection': '#4EAF7C',
  cancelled:              '#E8505B',
  complete:               '#4EAF7C',
}

// ── API helpers ───────────────────────────────────────────────────────────────

function api(path: string, token: string, opts: RequestInit = {}) {
  return fetch(path, {
    ...opts,
    headers: { 'Content-Type': 'application/json', 'x-admin-token': token, ...opts.headers },
  })
}

// ── Main component ────────────────────────────────────────────────────────────

export default function AdminPage() {
  const [token, setToken]       = useState('')
  const [input, setInput]       = useState('')
  const [authed, setAuthed]     = useState(false)
  const [authErr, setAuthErr]   = useState(false)

  const [products, setProducts] = useState<DbProduct[]>([])
  const [loading, setLoading]   = useState(false)
  const [editing, setEditing]   = useState<DbProduct | null>(null)
  const [isNew, setIsNew]       = useState(false)
  const [saving, setSaving]     = useState(false)
  const [error, setError]       = useState('')
  const [filter, setFilter]     = useState<string>('all')
  const [sortKey, setSortKey]   = useState<keyof DbProduct>('sort_order')
  const [sortDir, setSortDir]   = useState<'asc' | 'desc'>('asc')

  // ── Orders state ──────────────────────────────────────────────────────────
  const [tab, setTab]                   = useState<'products' | 'orders'>('products')
  const [orders, setOrders]             = useState<Order[]>([])
  const [ordersLoading, setOrdersLoading] = useState(false)
  const [orderFilter, setOrderFilter]   = useState<OrderStatus | 'all'>('all')
  const [orderSortKey, setOrderSortKey] = useState<keyof Order>('created_at')
  const [orderSortDir, setOrderSortDir] = useState<'asc' | 'desc'>('desc')
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null)
  const [statusChange, setStatusChange] = useState<{ id: number; status: OrderStatus; sendEmail: boolean } | null>(null)
  const [updatingOrder, setUpdatingOrder] = useState(false)

  const fetchProducts = useCallback(async (tok: string) => {
    setLoading(true)
    const res = await api('/api/admin/products', tok)
    if (res.ok) setProducts(await res.json())
    setLoading(false)
  }, [])

  const fetchOrders = useCallback(async (tok: string) => {
    setOrdersLoading(true)
    const res = await api('/api/admin/orders', tok)
    if (res.ok) setOrders(await res.json())
    setOrdersLoading(false)
  }, [])

  async function updateOrderStatus() {
    if (!statusChange) return
    setUpdatingOrder(true)
    await api('/api/admin/orders', token, {
      method: 'PUT',
      body: JSON.stringify(statusChange),
    })
    await fetchOrders(token)
    setStatusChange(null)
    setUpdatingOrder(false)
  }

  async function login() {
    const res = await api('/api/admin/products', input)
    if (res.ok) {
      setToken(input)
      setAuthed(true)
      setAuthErr(false)
      fetchProducts(input)
      fetchOrders(input)
    } else {
      setAuthErr(true)
    }
  }

  async function save() {
    if (!editing) return
    setSaving(true)
    setError('')
    const method = isNew ? 'POST' : 'PUT'
    const body   = isNew ? (({ id: _id, ...rest }) => rest)(editing as DbProduct) : editing
    const res    = await api('/api/admin/products', token, { method, body: JSON.stringify(body) })
    if (res.ok) {
      await fetchProducts(token)
      setEditing(null)
    } else {
      const j = await res.json()
      setError(j.error ?? 'Save failed')
    }
    setSaving(false)
  }

  async function toggleActive(p: DbProduct) {
    await api('/api/admin/products', token, {
      method: 'PUT',
      body: JSON.stringify({ id: p.id, active: !p.active }),
    })
    fetchProducts(token)
  }

  async function deleteProduct(id: number) {
    if (!confirm('Delete this product? This cannot be undone.')) return
    await api(`/api/admin/products?id=${id}`, token, { method: 'DELETE' })
    fetchProducts(token)
  }

  function startNew() {
    setIsNew(true)
    setEditing({ id: Date.now(), ...EMPTY } as DbProduct)
  }

  function field(key: keyof DbProduct, value: string | number | boolean | null | string[] | ColourRow[]) {
    if (!editing) return
    setEditing({ ...editing, [key]: value })
  }

  const filtered = filter === 'all' ? products : products.filter(p => p.category === filter)
  const visible = [...filtered].sort((a, b) => {
    const av = a[sortKey], bv = b[sortKey]
    if (av === null || av === undefined) return 1
    if (bv === null || bv === undefined) return -1
    const cmp = av < bv ? -1 : av > bv ? 1 : 0
    return sortDir === 'asc' ? cmp : -cmp
  })

  function toggleSort(key: keyof DbProduct) {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setSortDir('asc') }
  }

  function SortIcon({ col }: { col: keyof DbProduct }) {
    if (sortKey !== col) return <span style={{ color: '#ccc', marginLeft: 4 }}>↕</span>
    return <span style={{ color: '#E8505B', marginLeft: 4 }}>{sortDir === 'asc' ? '↑' : '↓'}</span>
  }

  // ── Orders sort ───────────────────────────────────────────────────────────

  const filteredOrders = orderFilter === 'all' ? orders : orders.filter(o => o.status === orderFilter)
  const visibleOrders = [...filteredOrders].sort((a, b) => {
    const av = a[orderSortKey], bv = b[orderSortKey]
    if (av === null || av === undefined) return 1
    if (bv === null || bv === undefined) return -1
    const cmp = av < bv ? -1 : av > bv ? 1 : 0
    return orderSortDir === 'asc' ? cmp : -cmp
  })

  function toggleOrderSort(key: keyof Order) {
    if (orderSortKey === key) setOrderSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setOrderSortKey(key); setOrderSortDir('asc') }
  }

  function OrderSortIcon({ col }: { col: keyof Order }) {
    if (orderSortKey !== col) return <span style={{ color: '#ccc', marginLeft: 4 }}>↕</span>
    return <span style={{ color: '#E8505B', marginLeft: 4 }}>{orderSortDir === 'asc' ? '↑' : '↓'}</span>
  }

  // ── Login screen ─────────────────────────────────────────────────────────

  if (!authed) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FBF7F1' }}>
      <div style={{ background: '#fff', borderRadius: 12, padding: '40px 48px', boxShadow: '0 2px 24px rgba(0,0,0,0.08)', minWidth: 320, textAlign: 'center' }}>
        <div style={{ fontFamily: 'cursive', fontSize: 32, color: '#E8505B', marginBottom: 4 }}>Palms</div>
        <div style={{ fontSize: 11, letterSpacing: '0.3em', color: '#1C2B4A', fontWeight: 700, marginBottom: 28 }}>ADMIN</div>
        <input
          type="password"
          placeholder="Password"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && login()}
          style={{ width: '100%', padding: '10px 14px', border: `1px solid ${authErr ? '#E8505B' : '#ddd'}`, borderRadius: 8, fontSize: 15, marginBottom: 12, outline: 'none', boxSizing: 'border-box' }}
        />
        {authErr && <div style={{ color: '#E8505B', fontSize: 13, marginBottom: 10 }}>Incorrect password</div>}
        <button onClick={login} style={{ width: '100%', padding: '10px 0', background: '#E8505B', color: '#fff', border: 'none', borderRadius: 8, fontSize: 15, cursor: 'pointer', fontWeight: 600 }}>
          Sign in
        </button>
      </div>
    </div>
  )

  // ── Edit form ─────────────────────────────────────────────────────────────

  const EditForm = editing ? (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 100, overflowY: 'auto', padding: '40px 16px' }}>
      <div style={{ background: '#fff', borderRadius: 12, maxWidth: 720, margin: '0 auto', padding: 32 }}>
        <h2 style={{ margin: '0 0 24px', fontSize: 18, color: '#1C2B4A' }}>{isNew ? 'Add product' : `Edit — ${editing.name_en}`}</h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <Label text="ID (integer)">
            <input type="number" value={editing.id} disabled={!isNew} onChange={e => field('id', parseInt(e.target.value))} style={inp} />
          </Label>
          <Label text="Category">
            <select value={editing.category} onChange={e => field('category', e.target.value)} style={inp}>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </Label>
          <Label text="Price (Rs)">
            <input type="number" value={editing.price} onChange={e => field('price', parseInt(e.target.value))} style={inp} />
          </Label>
          <Label text="Badge">
            <select value={editing.badge ?? ''} onChange={e => field('badge', e.target.value || null)} style={inp}>
              {BADGES.map(b => <option key={b} value={b}>{b || '— none —'}</option>)}
            </select>
          </Label>
          <Label text="Sort order">
            <input type="number" value={editing.sort_order} onChange={e => field('sort_order', parseInt(e.target.value))} style={inp} />
          </Label>
          <Label text="Active">
            <select value={editing.active ? 'true' : 'false'} onChange={e => field('active', e.target.value === 'true')} style={inp}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </Label>
        </div>

        <Divider text="Names" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
          <Label text="English"><input value={editing.name_en} onChange={e => field('name_en', e.target.value)} style={inp} /></Label>
          <Label text="French"><input value={editing.name_fr} onChange={e => field('name_fr', e.target.value)} style={inp} /></Label>
          <Label text="German"><input value={editing.name_de} onChange={e => field('name_de', e.target.value)} style={inp} /></Label>
        </div>

        <Divider text="Descriptions" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
          <Label text="English"><textarea value={editing.desc_en} onChange={e => field('desc_en', e.target.value)} style={{ ...inp, height: 72, resize: 'vertical' }} /></Label>
          <Label text="French"><textarea value={editing.desc_fr} onChange={e => field('desc_fr', e.target.value)} style={{ ...inp, height: 72, resize: 'vertical' }} /></Label>
          <Label text="German"><textarea value={editing.desc_de} onChange={e => field('desc_de', e.target.value)} style={{ ...inp, height: 72, resize: 'vertical' }} /></Label>
        </div>

        <Divider text="Badge labels (only if badge set)" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
          <Label text="English"><input value={editing.badge_en ?? ''} onChange={e => field('badge_en', e.target.value || null)} style={inp} /></Label>
          <Label text="French"><input value={editing.badge_fr ?? ''} onChange={e => field('badge_fr', e.target.value || null)} style={inp} /></Label>
          <Label text="German"><input value={editing.badge_de ?? ''} onChange={e => field('badge_de', e.target.value || null)} style={inp} /></Label>
        </div>

        <Divider text="Image" />
        <Label text="Image path (e.g. /images/products/filename.webp)">
          <input value={editing.img} onChange={e => field('img', e.target.value)} style={{ ...inp, width: '100%' }} />
        </Label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginTop: 12 }}>
          <Label text="Alt EN"><input value={editing.alt_en} onChange={e => field('alt_en', e.target.value)} style={inp} /></Label>
          <Label text="Alt FR"><input value={editing.alt_fr} onChange={e => field('alt_fr', e.target.value)} style={inp} /></Label>
          <Label text="Alt DE"><input value={editing.alt_de} onChange={e => field('alt_de', e.target.value)} style={inp} /></Label>
        </div>

        <Divider text="Sizes (comma-separated, leave blank if none)" />
        <input
          value={editing.sizes ? editing.sizes.join(', ') : ''}
          onChange={e => field('sizes', e.target.value ? e.target.value.split(',').map(s => s.trim()) : null)}
          placeholder="e.g. S, M, L, XL, 2XL"
          style={{ ...inp, width: '100%' }}
        />

        <Divider text="Colours (leave empty if product has no colour options)" />
        <ColourEditor
          colours={editing.colours ?? []}
          onChange={c => field('colours', c.length ? c : null)}
        />

        {error && <div style={{ color: '#E8505B', fontSize: 13, marginTop: 12 }}>{error}</div>}

        <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
          <button onClick={save} disabled={saving} style={{ ...btn, background: '#E8505B', color: '#fff' }}>
            {saving ? 'Saving…' : 'Save'}
          </button>
          <button onClick={() => { setEditing(null); setError('') }} style={{ ...btn, background: '#f0f0f0', color: '#1C2B4A' }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  ) : null

  // ── Main layout ───────────────────────────────────────────────────────────

  return (
    <div style={{ minHeight: '100vh', background: '#FBF7F1', fontFamily: 'sans-serif' }}>
      {EditForm}

      {/* Status change confirmation modal */}
      {statusChange && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
          <div style={{ background: '#fff', borderRadius: 12, padding: 32, maxWidth: 420, width: '100%' }}>
            <h3 style={{ margin: '0 0 8px', fontSize: 16, color: '#1C2B4A' }}>Update order status</h3>
            <p style={{ margin: '0 0 20px', fontSize: 14, color: '#5C6E8A' }}>
              Change to <strong style={{ color: STATUS_COLOUR[statusChange.status] }}>{statusChange.status}</strong>?
            </p>
            {STATUS_EMAIL[statusChange.status] && (
              <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: '#1C2B4A', marginBottom: 24, cursor: 'pointer' }}>
                <input type="checkbox" checked={statusChange.sendEmail}
                  onChange={e => setStatusChange({ ...statusChange, sendEmail: e.target.checked })}
                  style={{ width: 16, height: 16, cursor: 'pointer' }} />
                Send notification email to customer
                <span style={{ fontSize: 12, color: '#5C6E8A', display: 'block' }}></span>
              </label>
            )}
            {!STATUS_EMAIL[statusChange.status] && (
              <p style={{ fontSize: 13, color: '#5C6E8A', marginBottom: 24 }}>No customer email for this status.</p>
            )}
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={updateOrderStatus} disabled={updatingOrder}
                style={{ ...btn, background: '#1C2B4A', color: '#fff' }}>
                {updatingOrder ? 'Updating…' : 'Confirm'}
              </button>
              <button onClick={() => setStatusChange(null)} style={{ ...btn, background: '#f0f0f0', color: '#1C2B4A' }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 16px' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <div>
            <span style={{ fontFamily: 'cursive', fontSize: 24, color: '#E8505B' }}>Palms</span>
            <span style={{ fontSize: 11, letterSpacing: '0.3em', color: '#1C2B4A', fontWeight: 700, marginLeft: 10 }}>ADMIN</span>
          </div>
          {tab === 'products' && (
            <button onClick={startNew} style={{ ...btn, background: '#E8505B', color: '#fff' }}>+ Add product</button>
          )}
          {tab === 'orders' && (
            <button onClick={() => fetchOrders(token)} style={{ ...btn, background: '#f0f0f0', color: '#1C2B4A' }}>↺ Refresh</button>
          )}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 24, borderBottom: '1px solid #eee', paddingBottom: 0 }}>
          {(['products', 'orders'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              style={{ padding: '8px 20px', border: 'none', background: 'none', cursor: 'pointer', fontSize: 14,
                fontWeight: tab === t ? 700 : 400, color: tab === t ? '#E8505B' : '#5C6E8A',
                borderBottom: tab === t ? '2px solid #E8505B' : '2px solid transparent',
                marginBottom: -1, textTransform: 'capitalize' }}>
              {t}
              {t === 'orders' && orders.filter(o => o.status === 'pending').length > 0 && (
                <span style={{ marginLeft: 6, background: '#E8505B', color: '#fff', borderRadius: 10, fontSize: 11, padding: '1px 7px', fontWeight: 700 }}>
                  {orders.filter(o => o.status === 'pending').length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ── Products tab ── */}
        {tab === 'products' && (<>
          <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
            {['all', ...CATEGORIES].map(c => (
              <button key={c} onClick={() => setFilter(c)}
                style={{ padding: '5px 14px', borderRadius: 20, border: '1px solid #ddd', cursor: 'pointer', fontSize: 13,
                  background: filter === c ? '#1C2B4A' : '#fff', color: filter === c ? '#fff' : '#1C2B4A', fontWeight: filter === c ? 600 : 400 }}>
                {c}
              </button>
            ))}
            <span style={{ marginLeft: 'auto', fontSize: 13, color: '#5C6E8A', lineHeight: '30px' }}>{visible.length} products</span>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: 60, color: '#5C6E8A' }}>Loading…</div>
          ) : (
            <div style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', border: '1px solid #eee' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ background: '#f7f5f0' }}>
                    {([
                      ['ID',       'id'],
                      ['Name',     'name_en'],
                      ['Category', 'category'],
                      ['Price',    'price'],
                      ['Badge',    'badge'],
                      ['Active',   'active'],
                      ['Order',    'sort_order'],
                    ] as [string, keyof DbProduct][]).map(([label, key]) => (
                      <th key={key} onClick={() => toggleSort(key)}
                        style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, color: '#1C2B4A',
                          whiteSpace: 'nowrap', cursor: 'pointer', userSelect: 'none' }}>
                        {label}<SortIcon col={key} />
                      </th>
                    ))}
                    <th style={{ padding: '10px 14px' }} />
                  </tr>
                </thead>
                <tbody>
                  {visible.map((p, i) => (
                    <tr key={p.id} style={{ borderTop: '1px solid #f0f0f0', background: i % 2 === 0 ? '#fff' : '#fdfcfa' }}>
                      <td style={{ padding: '10px 14px', color: '#5C6E8A' }}>{p.id}</td>
                      <td style={{ padding: '10px 14px', fontWeight: 500, color: '#1C2B4A', maxWidth: 220 }}>
                        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name_en}</div>
                      </td>
                      <td style={{ padding: '10px 14px' }}>
                        <span style={{ background: '#F0EDE8', padding: '2px 8px', borderRadius: 10, fontSize: 12 }}>{p.category}</span>
                      </td>
                      <td style={{ padding: '10px 14px', whiteSpace: 'nowrap' }}>Rs {p.price.toLocaleString()}</td>
                      <td style={{ padding: '10px 14px' }}>
                        {p.badge ? <span style={{ background: badgeColor(p.badge), color: '#fff', padding: '2px 8px', borderRadius: 10, fontSize: 12 }}>{p.badge}</span> : <span style={{ color: '#ccc' }}>—</span>}
                      </td>
                      <td style={{ padding: '10px 14px' }}>
                        <button onClick={() => toggleActive(p)}
                          style={{ padding: '3px 10px', borderRadius: 10, border: 'none', cursor: 'pointer', fontSize: 12,
                            background: p.active ? '#E3F5EC' : '#fee', color: p.active ? '#4EAF7C' : '#E8505B', fontWeight: 600 }}>
                          {p.active ? 'live' : 'hidden'}
                        </button>
                      </td>
                      <td style={{ padding: '10px 14px', color: '#5C6E8A' }}>{p.sort_order}</td>
                      <td style={{ padding: '10px 14px', whiteSpace: 'nowrap' }}>
                        <button onClick={() => { setIsNew(false); setEditing(p) }}
                          style={{ marginRight: 6, padding: '4px 12px', borderRadius: 6, border: '1px solid #ddd', cursor: 'pointer', background: '#fff', fontSize: 12 }}>
                          Edit
                        </button>
                        <button onClick={() => deleteProduct(p.id)}
                          style={{ padding: '4px 12px', borderRadius: 6, border: '1px solid #fcc', cursor: 'pointer', background: '#fff', color: '#E8505B', fontSize: 12 }}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>)}

        {/* ── Orders tab ── */}
        {tab === 'orders' && (<>
          {/* Status filter pills */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
            {(['all', ...STATUSES] as const).map(s => (
              <button key={s} onClick={() => setOrderFilter(s as OrderStatus | 'all')}
                style={{ padding: '5px 14px', borderRadius: 20, border: '1px solid #ddd', cursor: 'pointer', fontSize: 13,
                  background: orderFilter === s ? '#1C2B4A' : '#fff',
                  color: orderFilter === s ? '#fff' : '#1C2B4A',
                  fontWeight: orderFilter === s ? 600 : 400 }}>
                {s}
              </button>
            ))}
            <span style={{ marginLeft: 'auto', fontSize: 13, color: '#5C6E8A', lineHeight: '30px' }}>{visibleOrders.length} orders</span>
          </div>

          {ordersLoading ? (
            <div style={{ textAlign: 'center', padding: 60, color: '#5C6E8A' }}>Loading…</div>
          ) : visibleOrders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 60, color: '#5C6E8A' }}>No orders found.</div>
          ) : (
            <div style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', border: '1px solid #eee' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ background: '#f7f5f0' }}>
                    {([
                      ['ID',      'id'],
                      ['Date',    'created_at'],
                      ['Customer','name'],
                      ['Total',   'total'],
                      ['Payment', 'payment_method'],
                      ['Status',  'status'],
                    ] as [string, keyof Order][]).map(([label, key]) => (
                      <th key={key} onClick={() => toggleOrderSort(key)}
                        style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, color: '#1C2B4A',
                          whiteSpace: 'nowrap', cursor: 'pointer', userSelect: 'none' }}>
                        {label}<OrderSortIcon col={key} />
                      </th>
                    ))}
                    <th style={{ padding: '10px 14px' }} />
                  </tr>
                </thead>
                <tbody>
                  {visibleOrders.map((o, i) => (
                        <React.Fragment key={o.id}>
                        <tr
                        style={{ borderTop: '1px solid #f0f0f0', background: i % 2 === 0 ? '#fff' : '#fdfcfa', cursor: 'pointer' }}
                        onClick={() => setExpandedOrder(expandedOrder === o.id ? null : o.id)}>
                        <td style={{ padding: '10px 14px', color: '#5C6E8A' }}>#{o.id}</td>
                        <td style={{ padding: '10px 14px', color: '#5C6E8A', whiteSpace: 'nowrap' }}>
                          {new Date(o.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </td>
                        <td style={{ padding: '10px 14px', fontWeight: 500, color: '#1C2B4A' }}>{o.name}</td>
                        <td style={{ padding: '10px 14px', whiteSpace: 'nowrap' }}>Rs {o.total.toLocaleString()}</td>
                        <td style={{ padding: '10px 14px' }}>
                          <span style={{ background: '#F0EDE8', padding: '2px 8px', borderRadius: 10, fontSize: 12 }}>{o.payment_method}</span>
                        </td>
                        <td style={{ padding: '10px 14px' }}>
                          <span style={{ background: STATUS_COLOUR[o.status] + '22', color: STATUS_COLOUR[o.status],
                            padding: '3px 10px', borderRadius: 10, fontSize: 12, fontWeight: 600 }}>
                            {o.status}
                          </span>
                        </td>
                        <td style={{ padding: '10px 14px' }}>
                          <span style={{ color: '#5C6E8A', fontSize: 12 }}>{expandedOrder === o.id ? '▲' : '▼'}</span>
                        </td>
                      </tr>
                      {expandedOrder === o.id && (
                        <tr key={`${o.id}-detail`} style={{ background: '#faf9f7' }}>
                          <td colSpan={7} style={{ padding: '16px 20px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 16 }}>
                              <div>
                                <div style={{ fontSize: 11, fontWeight: 700, color: '#5C6E8A', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Customer</div>
                                <div style={{ fontSize: 13, color: '#1C2B4A', lineHeight: 1.8 }}>
                                  <div>{o.name}</div>
                                  <div><a href={`mailto:${o.email}`} style={{ color: '#3A86D4' }}>{o.email}</a></div>
                                  <div>{o.phone}</div>
                                  <div style={{ color: '#5C6E8A' }}>{o.address}</div>
                                  {o.notes && <div style={{ marginTop: 6, fontStyle: 'italic', color: '#5C6E8A' }}>Note: {o.notes}</div>}
                                </div>
                              </div>
                              <div>
                                <div style={{ fontSize: 11, fontWeight: 700, color: '#5C6E8A', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Items</div>
                                {o.items.map((item, idx) => (
                                  <div key={idx} style={{ fontSize: 13, color: '#1C2B4A', lineHeight: 1.8, display: 'flex', justifyContent: 'space-between' }}>
                                    <span>{item.quantity}× {item.name}{item.colour ? ` (${item.colour})` : ''}{item.size ? ` — ${item.size}` : ''}</span>
                                    <span style={{ color: '#5C6E8A' }}>Rs {(item.price * item.quantity).toLocaleString()}</span>
                                  </div>
                                ))}
                                <div style={{ borderTop: '1px solid #eee', marginTop: 8, paddingTop: 8, fontWeight: 700, fontSize: 13, display: 'flex', justifyContent: 'space-between' }}>
                                  <span>Total</span>
                                  <span>Rs {o.total.toLocaleString()}</span>
                                </div>
                              </div>
                            </div>
                            {/* Status changer */}
                            <div style={{ borderTop: '1px solid #eee', paddingTop: 14 }}>
                              <div style={{ fontSize: 11, fontWeight: 700, color: '#5C6E8A', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Update status</div>
                              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                {STATUSES.map(s => (
                                  <button key={s} onClick={() => setStatusChange({ id: o.id, status: s, sendEmail: !!STATUS_EMAIL[s] })}
                                    disabled={o.status === s}
                                    style={{ padding: '5px 14px', borderRadius: 20, border: `1px solid ${STATUS_COLOUR[s]}`, cursor: o.status === s ? 'default' : 'pointer',
                                      fontSize: 12, background: o.status === s ? STATUS_COLOUR[s] : '#fff',
                                      color: o.status === s ? '#fff' : STATUS_COLOUR[s], fontWeight: 600, opacity: o.status === s ? 1 : 0.85 }}>
                                    {s}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>)}
      </div>
    </div>
  )
}

// ── Colour editor ─────────────────────────────────────────────────────────────

type ColourRow = { key: string; label: string; swatch: string }

function ColourEditor({ colours, onChange }: { colours: ColourRow[]; onChange: (c: ColourRow[]) => void }) {
  function update(i: number, patch: Partial<ColourRow>) {
    const next = colours.map((c, idx) => idx === i ? { ...c, ...patch } : c)
    onChange(next)
  }
  function add() {
    onChange([...colours, { key: '', label: '', swatch: '#000000' }])
  }
  function remove(i: number) {
    onChange(colours.filter((_, idx) => idx !== i))
  }

  return (
    <div>
      {colours.length === 0 && (
        <div style={{ fontSize: 13, color: '#aaa', marginBottom: 10 }}>No colour options — product comes in one colour.</div>
      )}
      {colours.map((c, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <input
            type="color"
            value={c.swatch}
            onChange={e => update(i, { swatch: e.target.value })}
            style={{ width: 38, height: 36, padding: 2, border: '1px solid #ddd', borderRadius: 6, cursor: 'pointer', background: '#fff' }}
            title="Pick swatch colour"
          />
          <input
            value={c.label}
            onChange={e => update(i, { label: e.target.value, key: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
            placeholder="Label (e.g. Navy Blue)"
            style={{ ...inp, flex: 1 }}
          />
          <input
            value={c.key}
            onChange={e => update(i, { key: e.target.value })}
            placeholder="Key (e.g. navy)"
            style={{ ...inp, flex: 1 }}
          />
          <button onClick={() => remove(i)}
            style={{ padding: '6px 12px', borderRadius: 6, border: '1px solid #fcc', background: '#fff', color: '#E8505B', cursor: 'pointer', fontSize: 13, flexShrink: 0 }}>
            Remove
          </button>
        </div>
      ))}
      <button onClick={add}
        style={{ marginTop: 4, padding: '6px 16px', borderRadius: 6, border: '1px solid #ddd', background: '#fff', cursor: 'pointer', fontSize: 13, color: '#1C2B4A' }}>
        + Add colour
      </button>
    </div>
  )
}

// ── Tiny helpers ──────────────────────────────────────────────────────────────

function Label({ text, children }: { text: string; children: React.ReactNode }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <span style={{ fontSize: 11, fontWeight: 600, color: '#5C6E8A', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{text}</span>
      {children}
    </label>
  )
}

function Divider({ text }: { text: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '20px 0 14px' }}>
      <span style={{ fontSize: 11, fontWeight: 700, color: '#5C6E8A', textTransform: 'uppercase', letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>{text}</span>
      <div style={{ flex: 1, height: 1, background: '#eee' }} />
    </div>
  )
}

function badgeColor(badge: string) {
  return badge === 'hot' ? '#E8505B' : badge === 'new' ? '#3A86D4' : '#4EAF7C'
}

const inp: React.CSSProperties = {
  padding: '8px 10px', border: '1px solid #ddd', borderRadius: 6,
  fontSize: 14, width: '100%', boxSizing: 'border-box', background: '#fff',
}

const btn: React.CSSProperties = {
  padding: '9px 20px', borderRadius: 8, border: 'none',
  cursor: 'pointer', fontSize: 14, fontWeight: 600,
}
