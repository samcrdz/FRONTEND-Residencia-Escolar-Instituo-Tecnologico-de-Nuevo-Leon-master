// middleware.js
import { NextResponse } from 'next/server';

export function middleware(req) {
  const cookieSesion = req.cookies.get('cookie-sesion');
  console.log("Cookie sesión:", cookieSesion); // Verificar si la cookie está llegando

  // Verificar si la cookie 'cookie-sesion' está presente
  if (!cookieSesion) {
    // Si la cookie no existe, redirigir a la página de login
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Si la cookie existe, permitir el acceso
  return NextResponse.next();
}

// Aplicar el middleware a rutas específicas
export const config = {
  matcher: ['/usuarios/:path*', '/dashboard/:path*', '/instalaciones/:path*', '/clientes/:path*', '/productos/:path*'], 
};
