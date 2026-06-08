<?php

namespace App\Http\Controllers;

// Importamos los Form Requests que acabas de crear
use App\Http\Requests\StoreTurnoRequest;
use App\Http\Requests\UpdateTurnoRequest;
use App\Repositories\Contracts\TurnoRepositoryInterface;
use Inertia\Inertia;

class TurnoController extends Controller
{
    protected $turnoRepository;

    public function __construct(TurnoRepositoryInterface $turnoRepository)
    {
        $this->turnoRepository = $turnoRepository;
    }

    public function index()
    {
        $turnos = $this->turnoRepository->obtenerTodos();

        return Inertia::render('Turnos/Index', [
            'turnos' => $turnos
        ]);
    }

    // Aquí usamos el StoreTurnoRequest
    public function store(StoreTurnoRequest $request)
    {
        // $request->validated() devuelve solo los datos que pasaron las reglas
        $this->turnoRepository->crear($request->validated());

        return redirect()->route('turnos.index')->with('success', 'Turno creado exitosamente.');
    }

    // Aquí usamos el UpdateTurnoRequest
    public function update(UpdateTurnoRequest $request, $id)
    {
        $this->turnoRepository->actualizar($id, $request->validated());

        return redirect()->route('turnos.index')->with('success', 'Turno actualizado exitosamente.');
    }

    public function destroy($id)
    {
        $this->turnoRepository->eliminar($id);

        return redirect()->route('turnos.index')->with('success', 'Turno dado de baja exitosamente.');
    }
}