<?php
namespace App\Repositories\Contracts;

interface UserRepositoryInterface
{
    public function obtenerTodos();
    public function buscarPorId($id);
    public function guardar(array $datos);
    public function actualizar($id, array $datos);
    public function eliminar($id);
}