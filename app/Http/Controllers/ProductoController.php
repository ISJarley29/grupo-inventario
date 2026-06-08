<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request; // <-- Asegúrate de importar Request
use App\Http\Requests\StoreProductoRequest;
use App\Http\Requests\UpdateProductoRequest;
use App\Repositories\Contracts\ProductoRepositoryInterface;
use App\Repositories\Contracts\AlmacenRepositoryInterface;
use App\Repositories\Contracts\CategoriaRepositoryInterface;
use App\Repositories\Contracts\UnidadMedidaRepositoryInterface;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ProductoController extends Controller
{
    protected ProductoRepositoryInterface $productoRepo;

    public function __construct(ProductoRepositoryInterface $productoRepo)
    {
        $this->productoRepo = $productoRepo;
    }

    /**
     * Vista principal: Listado de Productos Filtrados + Catálogos.
     */
    public function index(
        Request $request, // <-- Inyectamos el Request para capturar los filtros
        AlmacenRepositoryInterface $almacenRepo,
        CategoriaRepositoryInterface $categoriaRepo,
        UnidadMedidaRepositoryInterface $unidadRepo
    ): Response {
        
        // Capturamos los filtros del Request
        $filtros = $request->only(['Nombre', 'IdCategoria', 'IdAlmacen']);

        return Inertia::render('Productos/Index', [
            // Le pasamos los filtros al repositorio
            'productos'  => $this->productoRepo->obtenerTodos($filtros), 
            'almacenes'  => $almacenRepo->all(),
            'categorias' => $categoriaRepo->obtenerTodas(),
            'unidades'   => $unidadRepo->obtenerTodas(),
            'filtros'    => $filtros // Se devuelven a React para mantener el estado de los inputs
        ]);
    }

    public function store(StoreProductoRequest $request): RedirectResponse
    {
        $this->productoRepo->crear($request->validated());

        return redirect()->route('productos.index')
            ->with('success', 'Producto creado exitosamente.');
    }

    public function update(UpdateProductoRequest $request, $id): RedirectResponse
    {
        $this->productoRepo->actualizar($id, $request->validated());

        return redirect()->route('productos.index')
            ->with('success', 'Producto modificado exitosamente.');
    }

    public function destroy($id): RedirectResponse
    {
        $this->productoRepo->eliminar($id);

        return redirect()->route('productos.index')
            ->with('success', 'Producto eliminado exitosamente.');
    }
}