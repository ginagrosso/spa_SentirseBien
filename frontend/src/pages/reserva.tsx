import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';

export default function ReservarPage() {
    const { token } = useAuth();
    const router = useRouter();
    const [form, setForm] = useState({ nombre:'', email:'', servicio:'', fecha:'', horario:'' });

    if (!token && typeof window !== 'undefined') {
        router.push('/login');
        return null;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const res = await fetch('/api/reservas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(form),
        });
        const data = await res.json();
        if (res.ok) {
            alert(data.mensaje);
            router.push('/misturnos');
        } else {
            alert(data.error || 'Error en reserva');
        }
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
            <h1 className="text-xl mb-4">Nueva Reserva</h1>
            {['nombre','email','servicio','fecha','horario'].map(field => (
                <input
                    key={field}
                    type={field==='fecha'? 'date' : 'text'}
                    placeholder={field.charAt(0).toUpperCase()+field.slice(1)}
                    className="block w-full p-2 mb-3 border"
                    value={form[field]}
                    onChange={e => setForm({...form, [field]: e.target.value})}
                    required
                />
            ))}
            <button type="submit" className="px-4 py-2 bg-green-500 text-white">
                Reservar
            </button>
        </form>
    );
}
