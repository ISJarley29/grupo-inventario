<?php

namespace App\Repositories\Eloquent;

use App\Models\User;
use App\Repositories\Contracts\UserRepositoryInterface;
use Illuminate\Support\Facades\Hash;

class UserRepository implements UserRepositoryInterface
{
    public function obtenerTodos()
    {
        return User::select('id', 'name', 'email', 'role', 'status')->get();
    }

    public function buscarPorId($id)
    {
        return User::findOrFail($id);
    }

    public function guardar(array $datos)
    {
        // Encriptamos el password automáticamente antes de guardar
        if (isset($datos['password'])) {
            $datos['password'] = Hash::make($datos['password']);
        }
        return User::create($datos);
    }

    public function actualizar($id, array $datos)
    {
        $usuario = User::findOrFail($id);
        
        // Si mandan un password vacío, lo quitamos para no borrar el actual
        if (empty($datos['password'])) {
            unset($datos['password']);
        } else {
            $datos['password'] = Hash::make($datos['password']);
        }

        $usuario->update($datos);
        return $usuario;
    }

    public function eliminar($id)
    {
        $usuario = User::findOrFail($id);
        return $usuario->delete();
    }
}