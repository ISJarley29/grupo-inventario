<?php

namespace App\Repositories\Contracts;

interface MovimientoRepositoryInterface
{
    /**
     * Obtiene el historial de movimientos, opcionalmente filtrado.
     */
    public function obtenerTodos(array $filtros = []): mixed;

    /**
     * Registra un nuevo movimiento y actualiza el stock del producto automáticamente.
     */
    public function registrar(array $data);
}