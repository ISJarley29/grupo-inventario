<?php

namespace App\Repositories\Contracts;

interface ProductoRepositoryInterface
{
    public function obtenerTodos(array $filtros = []): mixed;
    public function obtenerPorId($id);
    
    public function crear(array $data);
    public function actualizar($id, array $data);
    public function eliminar($id);
}