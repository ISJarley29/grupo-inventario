<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        // Verificamos si el rol del usuario actual está en la lista de permitidos
        if (! $request->user() || ! in_array($request->user()->role, $roles)) {
            abort(403, 'Acceso denegado. No tienes los permisos necesarios.');
        }

        return $next($request);
    }
}
