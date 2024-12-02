// middleware.js
import { NextResponse } from 'next/server';

/*
  en esta seccion lo que se hace es que mediante una cookie manejamos la seguridad de las rutas
  protegiendo quien puede acceder a ellas, en este caso si algun usuario quiere entrar a alguna ruta en
  su localstorage debe tener la coockie que se especifica, en caso que quieran acceder a alguna
  ruta y no cuenten con la cookie por default los llevara a la ruta inicial 
*/

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
