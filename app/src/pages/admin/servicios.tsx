'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '../../components/AdminLayout'
import { IService } from '../../models/Service'

export default function AdminServiciosPage() {
  const [services, setServices] = useState<IService[]>([])
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: '',
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch('/api/admin/servicios')
      .then(res => res.json())
      .then((data: IService[]) => setServices(data))
      .catch(() => alert('Error al cargar servicios'))
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/admin/servicios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          description: form.description,
          price: Number(form.price),
          image: form.image,
          category: form.category,
        }),
      })

      if (!res.ok) throw new Error('Error en la creación')

      const newService: IService = await res.json()
      setServices(prev => [...prev, newService])

      setForm({ name: '', description: '', price: '', image: '', category: '' })

    } catch {
      alert('Error al crear servicio')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar este servicio?')) return
    const res = await fetch(`/api/admin/servicios/${id}`, { method: 'DELETE' })
    if (res.status === 204) {
      setServices(prev => prev.filter(s => (s as any)._id !== id))
    } else {
      alert('Error al eliminar')
    }
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto p-6 space-y-8">

        <form onSubmit={handleCreate} className="bg-white p-6 rounded shadow space-y-4">
          <h2 className="text-xl font-semibold text-[#436E6C]">Nuevo Servicio</h2>

          <input
            name="name" value={form.name} onChange={handleChange}
            placeholder="Nombre" required className="w-full border p-2 rounded"
          />
          <textarea
            name="description" value={form.description} onChange={handleChange}
            placeholder="Descripción" required className="w-full border p-2 rounded"
          />
          <input
            name="price" type="number" value={form.price} onChange={handleChange}
            placeholder="Precio" required className="w-full border p-2 rounded"
          />
          <input
            name="image" value={form.image} onChange={handleChange}
            placeholder="URL de imagen" required className="w-full border p-2 rounded"
          />

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          >
            <option value="">Seleccionar categoría</option>
            <option value="Masajes">Masajes</option>
            <option value="Belleza">Belleza</option>
            <option value="Tratamientos Faciales">Tratamientos Faciales</option>
            <option value="Tratamientos Corporales">Tratamientos Corporales</option>
            <option value="Servicios Grupales">Servicios Grupales</option>
          </select>

          <button
            disabled={loading}
            className="bg-[#436E6C] text-white px-4 py-2 rounded hover:bg-[#365854]"
          >
            {loading ? 'Creando…' : 'Crear Servicio'}
          </button>
        </form>


        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold text-[#436E6C] mb-4">Servicios Existentes</h2>
          <ul className="space-y-3">
            {services.map(s => (
              <li key={(s as any)._id} className="flex justify-between items-center">
                <div>
                  <strong>{s.name}</strong> — ${s.price}
                </div>
                <button
                  onClick={() => handleDelete((s as any)._id)}
                  className="text-red-500 hover:underline"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AdminLayout>
  )
}
