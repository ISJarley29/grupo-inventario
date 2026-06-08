<?php

namespace App\Repositories\Eloquent;

use App\Models\Producto;
use App\Repositories\Contracts\ProductoRepositoryInterface;

class ProductoRepository implements ProductoRepositoryInterface
{
    public function obtenerTodos(array $filtros = []): mixed
{
    $query = Producto::query(); // O si usas relaciones: Producto::with(['categoria', 'almacen'])

    // Filtro por Nombre
    $query->when(data_get($filtros, 'Nombre'), function ($q, $nombre) {
        $q->where('Nombre', 'like', '%' . $nombre . '%');
    });

    // Filtro por Categoría
    $query->when(data_get($filtros, 'IdCategoria'), function ($q, $idCategoria) {
        $q->where('IdCategoria', $idCategoria);
    });

    // Filtro por Almacén
    $query->when(data_get($filtros, 'IdAlmacen'), function ($q, $idAlmacen) {
        $q->where('IdAlmacen', $idAlmacen);
    });

    return $query->get();
}

    public function obtenerPorId($id)
    {
        return Producto::with(['almacen', 'categoria', 'unidadMedida'])->findOrFail($id);
    }

    public function crear(array $data)
    {
        return Producto::create($data);
    }

    public function actualizar($id, array $data)
    {
        $producto = Producto::findOrFail($id);
        $producto->update($data);
        return $producto;
    }

    public function eliminar($id)
    {
        $producto = Producto::findOrFail($id);
        $producto->delete();
        return $producto;
    }
}