import { useEffect, useState } from 'react';

interface Turno {
  id: string | number;
  dia: string;
  horario: string;
  servicio: string;
  estado: string;
}

export default function MisTurnosPage() {
    const [turnos, setTurnos] = useState<Turno[]>([]);

    useEffect(() => {
        fetch('/api/misturnos')
            .then(res => res.json())
            .then(setTurnos);
    }, []);

    return (
        <div className="max-w-lg mx-auto p-4">
            <h1 className="text-xl mb-4">Mis Turnos</h1>
            <ul>
                {turnos.map(t => (
                    <li key={t.id} className="mb-2 border-b pb-2">
                        <strong>{t.dia} {t.horario}</strong> – {t.servicio} [{t.estado}]
                    </li>
                ))}
            </ul>
        </div>
    );
}