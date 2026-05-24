<?php

namespace App\Http\Controllers;

use App\Repositories\Contracts\AlmacenRepositoryInterface;
// 🌟 Importamos tus nuevas clases de validación
use App\Http\Requests\StoreAlmacenRequest;
use App\Http\Requests\UpdateAlmacenRequest;
use Inertia\Inertia;

class AlmacenController extends Controller
{
    protected $almacenRepository;

    public function __construct(AlmacenRepositoryInterface $almacenRepository)
    {
        $this->almacenRepository = $almacenRepository;
    }

    public function index()
    {
        return Inertia::render('Almacenes/Index', [
            'almacenes' => $this->almacenRepository->all()
        ]);
    }

    // 🌟 Usamos StoreAlmacenRequest en lugar de Request
    public function store(StoreAlmacenRequest $request)
    {
        // Si llega a esta línea, es porque ya pasó las validaciones automáticamente
        $this->almacenRepository->create($request->validated());

        return redirect()->back()->with('success', 'Almacén creado con éxito');
    }

    // 🌟 Usamos UpdateAlmacenRequest en lugar de Request
    public function update(UpdateAlmacenRequest $request, $id)
    {
        // Ya validado automáticamente
        $this->almacenRepository->update($id, $request->validated());

        return redirect()->back()->with('success', 'Almacén actualizado con éxito');
    }

    public function destroy($id)
    {
        $this->almacenRepository->delete($id);
        return redirect()->back()->with('success', 'Almacén dado de baja con éxito');
    }
}