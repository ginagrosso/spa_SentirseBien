import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export async function GET() {
  try {
    console.log('Intentando conectar a la base de datos...');
    
    // Verificar la URL de la base de datos
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
      throw new Error('DATABASE_URL no está definida en las variables de entorno');
    }
    console.log('DATABASE_URL está definida');
    
    // Intentar conectar a la base de datos
    await prisma.$connect();
    console.log('Conexión exitosa a la base de datos');
    
    // Intentar una consulta simple
    const count = await prisma.Servicio.count();
    console.log('Consulta exitosa, número de servicios:', count);
    
    return NextResponse.json({ 
      status: 'success',
      message: 'Conexión a la base de datos exitosa',
      serviceCount: count
    });
  } catch (error) {
    console.error('Error en la prueba de conexión:', error);
    return NextResponse.json(
      { 
        status: 'error',
        message: 'Error en la conexión a la base de datos',
        details: error instanceof Error ? error.message : 'Error desconocido',
        stack: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 