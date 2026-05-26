<?php

namespace App\Http\Controllers;

use App\Repositories\Contracts\UnidadMedidaRepositoryInterface;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UnidadMedidaController extends Controller
{
    protected $unidadMedidaRepo;

    public function __construct(UnidadMedidaRepositoryInterface $unidadMedidaRepo)
    {
        $this->unidadMedidaRepo = $unidadMedidaRepo;
    }

    public function index()
    {
        $unidades = $this->unidadMedidaRepo->obtenerTodas();
        return Inertia::render('UnidadesMedida/Index', [
            'unidades' => $unidades
        ]);
    }

    public function store(Request $request)
    {
        $validados = $request->validate([
            'nombre' => 'required|string|max:100',
            'abreviatura' => 'required|string|max:20',
        ]);

        $this->unidadMedidaRepo->crear($validados);
        return redirect()->back();
    }

    public function update(Request $request, $id)
    {
        $validados = $request->validate([
            'nombre' => 'required|string|max:100',
            'abreviatura' => 'required|string|max:20',
        ]);

        $this->unidadMedidaRepo->actualizar($id, $validados);
        return redirect()->back();
    }

    public function destroy($id)
    {
        $this->unidadMedidaRepo->eliminar($id);
        return redirect()->back();
    }
}
