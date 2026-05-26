<?php

namespace App\Repositories\Eloquent;

use App\Models\Almacen;
use App\Repositories\Contracts\AlmacenRepositoryInterface;

class AlmacenRepository implements AlmacenRepositoryInterface
{
    public function all()
    {
        return Almacen::orderBy('id', 'asc')->get();
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

        $almacen->estado = false;
        $almacen->save();

        return $almacen;
    }
}
