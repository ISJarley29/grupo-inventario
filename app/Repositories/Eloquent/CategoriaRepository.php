<?php

namespace App\Repositories\Eloquent;

use App\Models\Categoria;
use App\Repositories\Contracts\CategoriaRepositoryInterface;

class CategoriaRepository implements CategoriaRepositoryInterface
{
    public function obtenerTodas()
    {
        return Categoria::all();
    }

    public function buscarPorId($id)
    {
        // Usamos findOrFail para que lance error 404 automáticamente si no existe
        return Categoria::findOrFail($id);
    }

    public function crear(array $datos)
    {
        return Categoria::create($datos);
    }

    public function actualizar($id, array $datos)
    {
        $categoria = $this->buscarPorId($id);
        $categoria->update($datos);
        return $categoria;
    }

    public function eliminar($id)
    {
        $categoria = $this->buscarPorId($id);
        return $categoria->delete();
    }
}