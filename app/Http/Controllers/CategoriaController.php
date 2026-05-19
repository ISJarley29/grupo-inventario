<?php

namespace App\Http\Controllers;

use App\Repositories\Contracts\CategoriaRepositoryInterface;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoriaController extends Controller
{
    protected $categoriaRepo;

    // Inyectamos el repositorio
    public function __construct(CategoriaRepositoryInterface $categoriaRepo)
    {
        $this->categoriaRepo = $categoriaRepo;
    }

    // 1. Listar categorías
    public function index()
    {
        $categorias = $this->categoriaRepo->obtenerTodas();
        return Inertia::render('Categorias/Index', [
            'categorias' => $categorias
        ]);
    }

    // 2. Mostrar formulario de creación
    public function create()
    {
        return Inertia::render('Categorias/Crear');
    }

    // 3. Procesar el guardado
    public function store(Request $request)
    {
        $validados = $request->validate([
        'nombre' => 'required|string|max:100',
        'descripcion' => 'nullable|string',
    ]);

    $this->categoriaRepo->crear($validados);

    // Al usar Inertia, esto recarga los datos sin refrescar la página
    return redirect()->back();
    }

    // 4. Mostrar formulario de edición
    public function edit($id)
    {
        $categoria = $this->categoriaRepo->buscarPorId($id);
        return Inertia::render('Categorias/Editar', [
            'categoria' => $categoria
        ]);
    }

    // 5. Procesar la actualización
    public function update(Request $request, $id)
    {
        $validados = $request->validate([
        'nombre' => 'required|string|max:100|unique:categorias,Nombre,' . $id . ',IdCategoria',
        'descripcion' => 'nullable|string',
    ]);

    // Llama al patrón repositorio
    $this->categoriaRepo->actualizar($id, $validados);

    return redirect()->back();
    }

    // 6. Eliminar registro
    public function destroy($id)
    {
        $this->categoriaRepo->eliminar($id);
        return redirect()->back();
    }
}
