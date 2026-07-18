<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMovimientoRequest;
use App\Repositories\Contracts\MovimientoRepositoryInterface;
use App\Repositories\Contracts\ProductoRepositoryInterface;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Exception;

class MovimientoController extends Controller
{
    protected $movimientoRepo;
    protected $productoRepo;

    public function __construct(
        MovimientoRepositoryInterface $movimientoRepo,
        ProductoRepositoryInterface $productoRepo
    ) {
        $this->movimientoRepo = $movimientoRepo;
        $this->productoRepo = $productoRepo;
    }

    public function index(Request $request)
    {
        $filtros = $request->only(['tipo_movimiento', 'id_producto']);
        
        return Inertia::render('Movimientos/Index', [
            'movimientos' => $this->movimientoRepo->obtenerTodos($filtros),
            'productos'   => $this->productoRepo->obtenerTodos(), // Para llenar el <select> en el modal de crear
            'filtros'     => $filtros
        ]);
    }

    public function store(StoreMovimientoRequest $request)
    {
        try {
            $this->movimientoRepo->registrar($request->validated());
            
            return redirect()->route('movimientos.index')
                ->with('success', 'Movimiento registrado correctamente y stock actualizado.');
                
        } catch (Exception $e) {
            // Si el stock es insuficiente o no hay turno activo, capturamos el error
            // y lo devolvemos al frontend sin que la aplicación colapse.
            return back()->withErrors(['error_general' => $e->getMessage()]);
        }
    }
}