// src/middleware/auth.ts
import { NextApiRequest, NextApiResponse } from 'next';
// import jwt from 'jsonwebtoken'; // Ya no es necesario
import { getSession } from 'next-auth/react'; // O getServerSession según corresponda

// Extended request interface with user property (puede que ya no sea necesaria si usamos getSession directamente)
interface ExtendedNextApiRequest extends NextApiRequest {
  user?: any; // Consider using a more specific type from next-auth
}

/* // Eliminar función authenticate manual
export function authenticate(
  req: ExtendedNextApiRequest,
  res: NextApiResponse,
  next: () => void
) {
  // ... lógica antigua con JWT ...
}
*/

export async function isAdmin( // Hacerla async para poder usar await getSession
  req: ExtendedNextApiRequest, 
  res: NextApiResponse,
  next: () => void // 'next' se pasa al handler final si la verificación es exitosa
) {
  const session = await getSession({ req }); // Obtener sesión de next-auth

  // Verificar si hay sesión y si el rol es 'admin' (usando 'role')
  if (session?.user?.role === 'admin') {
    // Opcional: adjuntar usuario al request si otros handlers lo necesitan
    // req.user = session.user; 
    next(); // Continuar al siguiente handler (el de la API route)
  } else {
    // Si no hay sesión o no es admin, devolver error 403
    return res.status(403).json({ error: 'Acceso denegado. Se requieren permisos de administrador.' });
  }
}