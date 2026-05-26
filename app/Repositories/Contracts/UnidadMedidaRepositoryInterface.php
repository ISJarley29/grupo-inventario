<?php

namespace App\Repositories\Contracts;

interface UnidadMedidaRepositoryInterface
{
    public function obtenerTodas();
    public function buscarPorId($id);
    public function crear(array $data);
    public function actualizar($id, array $data);
    public function eliminar($id);
}
