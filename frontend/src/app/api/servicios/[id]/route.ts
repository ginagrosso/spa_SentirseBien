import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    console.log('Received data for update:', data); // Debug log
    
    const servicio = await prisma.Servicio.update({
      where: { id: params.id },
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
    console.error('Error al actualizar servicio:', error);
    return NextResponse.json(
      { 
        error: 'Error al actualizar servicio',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.Servicio.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: 'Servicio eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar servicio:', error);
    return NextResponse.json(
      { 
        error: 'Error al eliminar servicio',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 