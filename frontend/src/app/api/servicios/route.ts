import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export async function GET() {
  try {
    const servicios = await prisma.Servicio.findMany({
      orderBy: {
        categoria: 'asc',
      },
    });
    return NextResponse.json(servicios);
  } catch (error) {
    console.error('Error al obtener servicios:', error);
    return NextResponse.json(
      { 
        error: 'Error al obtener servicios',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log('Received data:', data); // Debug log
    
    const servicio = await prisma.Servicio.create({
      data: {
        nombre: data.nombre,
        descripcion: data.descripcion,
        precio: parseFloat(data.precio),
        duracion: parseInt(data.duracion),
        categoria: data.categoria,
        imagen: data.imagen,
      },
    });
    return NextResponse.json(servicio);
  } catch (error) {
    console.error('Error al crear servicio:', error);
    return NextResponse.json(
      { 
        error: 'Error al crear servicio',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 