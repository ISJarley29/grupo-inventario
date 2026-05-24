<?php

namespace App\Repositories\Eloquent;

use App\Models\Almacen;
use App\Repositories\Contracts\AlmacenRepositoryInterface;

class AlmacenRepository implements AlmacenRepositoryInterface
{
    public function all()
    {
        // Traemos todos, ordenados por los más recientes
        return Almacen::orderBy('id', 'desc')->get();
    }

    public function find($id)
    {
        return Almacen::findOrFail($id);
    }

    public function create(array $data)
    {
        return Almacen::create($data);
    }

    public function update($id, array $data)
    {
        $almacen = $this->find($id);
        $almacen->update($data);
        return $almacen;
    }

    public function delete($id)
    {
        $almacen = $this->find($id);
        
        // ELIMINADO LÓGICO: Solo cambiamos el estado a false (0 en DB)
        $almacen->estado = false; 
        $almacen->save();

        return $almacen;
    }
}