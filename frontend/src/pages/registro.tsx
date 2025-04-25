'use client';

import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Registro() {
    const [form, setForm] = useState({ nombre: '', email: '', telefono: '', password: '' });
    const [mensaje, setMensaje] = useState<string | null>(null);
    const [tipoMensaje, setTipoMensaje] = useState<'exito' | 'error' | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (form.email && form.password) {
            try {
                const res = await fetch('/api/registro', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(form),
                });
                const data = await res.json();
                if (res.ok) {
                    setMensaje(data.mensaje);
                    setTipoMensaje('exito');
                    setForm({ nombre: '', email: '', telefono: '', password: '' });
                } else {
                    setMensaje(data.error || 'Error al registrarse');
                    setTipoMensaje('error');
                }
            } catch {
                setMensaje('Error de conexión. Intente nuevamente.');
                setTipoMensaje('error');
            }
        } else {
            setMensaje('Email y contraseña son obligatorios');
            setTipoMensaje('error');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <>
            <Header />
            <section className="py-12 px-4 bg-white font-roboto flex justify-center">
                <div className="bg-[#B6D5C8] p-6 rounded-xl space-y-4 shadow-md w-full max-w-lg text-[#436E6C]">
                    <h2 className="text-3xl font-semibold text-center mb-6">Crear cuenta</h2>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <input type="text" name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre completo" className="input" />
                        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Correo electrónico" className="input" />
                        <input type="tel" name="telefono" value={form.telefono} onChange={handleChange} placeholder="Teléfono" className="input" />
                        <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Contraseña" className="input" />
                        <button type="submit" className="btn">Registrarse</button>
                        {mensaje && <div className={`alert ${tipoMensaje}`}>{mensaje}</div>}
                    </form>
                </div>
            </section>
            <Footer />
        </>
    );
}