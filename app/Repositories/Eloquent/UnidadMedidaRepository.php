<?php

namespace App\Repositories\Eloquent;

use App\Models\UnidadMedida;
use App\Repositories\Contracts\UnidadMedidaRepositoryInterface;

class UnidadMedidaRepository implements UnidadMedidaRepositoryInterface
{
    public function obtenerTodas()
    {
        return UnidadMedida::orderBy('id', 'asc')->get();
    }

    public function buscarPorId($id)
    {
        return UnidadMedida::findOrFail($id);
    }

    public function crear(array $data)
    {
        return UnidadMedida::create($data);
    }

    public function actualizar($id, array $data)
    {
        $unidad = UnidadMedida::findOrFail($id);
        $unidad->update($data);
        return $unidad;
    }

    public function eliminar($id)
    {
        $unidad = UnidadMedida::findOrFail($id);
        return $unidad->delete();
    }
}
