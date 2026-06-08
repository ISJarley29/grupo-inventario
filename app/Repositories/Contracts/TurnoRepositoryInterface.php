<?php

namespace App\Repositories\Contracts;

interface TurnoRepositoryInterface
{
    public function obtenerTodos();
    public function obtenerActivos();
    public function obtenerPorId($id);
    public function crear(array $data);
    public function actualizar($id, array $data);
    public function eliminar($id);
    
    // 🔥 Este es el método mágico para el Kardex
    public function obtenerTurnoPorHoraActual(); 
}