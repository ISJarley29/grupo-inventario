<?php

namespace App\Repositories\Contracts;

interface CategoriaRepositoryInterface
{
    public function obtenerTodas();
    public function buscarPorId($id);
    public function crear(array $datos);
    public function actualizar($id, array $datos);
    public function eliminar($id);
}