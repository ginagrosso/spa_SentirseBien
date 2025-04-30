import { NextResponse } from 'next/server';

// Credenciales por defecto (en producción esto debería estar en una base de datos)
const ADMIN_CREDENTIALS = {
  email: 'admin@sentirsebien.com',
  password: 'admin123',
  user: {
    id: '1',
    nombre: 'Administrador',
    email: 'admin@sentirsebien.com',
    rol: 'admin'
  }
};

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Verificar credenciales
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      return NextResponse.json({
        user: ADMIN_CREDENTIALS.user
      });
    }

    return NextResponse.json(
      { message: 'Credenciales inválidas' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Error en el servidor' },
      { status: 500 }
    );
  }
} 