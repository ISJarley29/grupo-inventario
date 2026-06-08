<?php

namespace App\Repositories\Eloquent;

use App\Models\Turno;
use App\Repositories\Contracts\TurnoRepositoryInterface;
use Carbon\Carbon;

class TurnoRepository implements TurnoRepositoryInterface
{
    public function obtenerTodos()
    {
        return Turno::all();
    }

    public function obtenerActivos()
    {
        return Turno::where('Estado', 'Activo')->get();
    }

    public function obtenerPorId($id)
    {
        return Turno::findOrFail($id);
    }

    public function crear(array $data)
    {
        return Turno::create($data);
    }

    public function actualizar($id, array $data)
    {
        $turno = $this->obtenerPorId($id);
        $turno->update($data);
        return $turno;
    }

    public function eliminar($id)
    {
        $turno = $this->obtenerPorId($id);
        // Soft delete lógico cambiando estado, para no romper reportes
        $turno->update(['Estado' => 'Inactivo']); 
        return $turno;
    }

    // Aquí está la lógica automática para que el docente no elija el turno
    public function obtenerTurnoPorHoraActual()
    {
        $horaActual = Carbon::now()->format('H:i:s');
        
        return Turno::where('Estado', 'Activo')
                    ->whereTime('Hora_inicio', '<=', $horaActual)
                    ->whereTime('Hora_fin', '>=', $horaActual)
                    ->first();
    }
}