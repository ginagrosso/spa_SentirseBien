import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import ProtectedLayout from '@/components/ProtectedLayout';
import PageHero from '@/components/PageHero';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { format, parse, isBefore, isAfter } from 'date-fns';
import { es } from 'date-fns/locale';
import { validations } from '@/lib/validations';
import { HORARIO_INICIO, HORARIO_FIN } from '@/types/constants';
import servicios from '@/data/servicios';

export default function ReservarTurnoPage() {
    const router = useRouter();
    const { data: session } = useSession();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        servicio: '',
        fecha: '',
        hora: '',
        notas: '',
        profesional: '',
    });
    const [horariosDisponibles, setHorariosDisponibles] = useState<string[]>([]);
    const [turnosExistentes, setTurnosExistentes] = useState<any[]>([]);
    const [profesionales, setProfesionales] = useState<any[]>([]);

    // Obtener todos los servicios de todas las categorías
    const todosLosServicios = servicios.reduce((acc, categoria) => {
        return [...acc, ...categoria.services];
    }, [] as any[]);

    useEffect(() => {
        // Obtener profesionales al cargar la página
        const fetchProfesionales = async () => {
            try {
                const res = await fetch('/api/profesionales');
                const data = await res.json();
                setProfesionales(data);
            } catch (error) {
                toast.error('Error al cargar profesionales');
            }
        };
        fetchProfesionales();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Si cambia la fecha o el profesional, actualizar horarios disponibles
        if (name === 'fecha' || name === 'profesional') {
            actualizarHorariosDisponibles(name === 'fecha' ? value : formData.fecha, name === 'profesional' ? value : formData.profesional);
        }
    };

    const actualizarHorariosDisponibles = async (fecha: string, profesional: string) => {
        if (!fecha || !profesional) return;
        try {
            // Validar la fecha
            const fechaResult = validations.validarFecha(fecha);
            if (!fechaResult.isValid) {
                toast.error(fechaResult.error);
                return;
            }

            // Obtener turnos existentes para la fecha y profesional
            const response = await fetch(`/api/turnos/disponibles?date=${fecha}&professionalId=${profesional}`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            setTurnosExistentes(data);
            setHorariosDisponibles(data.map((slot: any) => slot.startTime));
        } catch (error) {
            console.error('Error al obtener horarios disponibles:', error);
            toast.error('Error al cargar los horarios disponibles');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Validar fecha y hora
            const fechaResult = validations.validarFecha(formData.fecha);
            if (!fechaResult.isValid) {
                throw new Error(fechaResult.error);
            }

            const horarioResult = validations.validarHorario(formData.hora);
            if (!horarioResult.isValid) {
                throw new Error(horarioResult.error);
            }

            const response = await fetch('/api/turnos/reservar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error al reservar el turno');
            }

            toast.success('Turno reservado exitosamente');
            router.push('/turnos');
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Error al reservar el turno');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ProtectedLayout>
            <PageHero 
                title="Reservar Turno"
                description="Selecciona el servicio, profesional y la fecha que mejor te convenga."
            />

            <main className="bg-white font-roboto py-16">
                <div className="max-w-4xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white rounded-lg shadow-lg p-6"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Servicio */}
                            <div>
                                <label htmlFor="servicio" className="block text-sm font-medium text-gray-700 mb-2">
                                    Servicio
                                </label>
                                <select
                                    id="servicio"
                                    name="servicio"
                                    value={formData.servicio}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                    required
                                >
                                    <option value="">Selecciona un servicio</option>
                                    {todosLosServicios.map((servicio) => (
                                        <option key={servicio.name} value={servicio.name}>
                                            {servicio.name} - {servicio.price}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Profesional */}
                            <div>
                                <label htmlFor="profesional" className="block text-sm font-medium text-gray-700 mb-2">
                                    Profesional
                                </label>
                                <select
                                    id="profesional"
                                    name="profesional"
                                    value={formData.profesional}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                    required
                                >
                                    <option value="">Selecciona un profesional</option>
                                    {profesionales.map((prof: any) => (
                                        <option key={prof._id} value={prof._id}>{prof.name}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Fecha */}
                            <div>
                                <label htmlFor="fecha" className="block text-sm font-medium text-gray-700 mb-2">
                                    Fecha
                                </label>
                                <input
                                    type="date"
                                    id="fecha"
                                    name="fecha"
                                    value={formData.fecha}
                                    onChange={handleChange}
                                    min={new Date().toISOString().split('T')[0]}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                    required
                                />
                            </div>

                            {/* Hora */}
                            <div>
                                <label htmlFor="hora" className="block text-sm font-medium text-gray-700 mb-2">
                                    Hora
                                </label>
                                <select
                                    id="hora"
                                    name="hora"
                                    value={formData.hora}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                    required
                                    disabled={!formData.fecha || !formData.profesional}
                                >
                                    <option value="">Selecciona una hora</option>
                                    {formData.fecha && formData.profesional ? (
                                        horariosDisponibles.length > 0 ? (
                                            horariosDisponibles.map((hora) => (
                                                <option key={hora} value={hora}>
                                                    {hora}
                                                </option>
                                            ))
                                        ) : (
                                            <option value="" disabled>No hay horarios disponibles</option>
                                        )
                                    ) : (
                                        <option value="" disabled>Selecciona fecha y profesional</option>
                                    )}
                                </select>
                            </div>

                            {/* Notas */}
                            <div>
                                <label htmlFor="notas" className="block text-sm font-medium text-gray-700 mb-2">
                                    Notas adicionales (opcional)
                                </label>
                                <textarea
                                    id="notas"
                                    name="notas"
                                    value={formData.notas}
                                    onChange={handleChange}
                                    rows={4}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                    placeholder="Escribe aquí cualquier información adicional que quieras compartir..."
                                />
                            </div>

                            {/* Botones */}
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={() => router.back()}
                                    disabled={isLoading}
                                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="px-6 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors duration-200 disabled:opacity-50"
                                >
                                    {isLoading ? 'Reservando...' : 'Confirmar Reserva'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </main>
        </ProtectedLayout>
    );
} 