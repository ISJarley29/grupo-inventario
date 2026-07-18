<?php

namespace App\Repositories\Eloquent;

use App\Models\Movimiento;
use App\Models\Producto;
use App\Repositories\Contracts\MovimientoRepositoryInterface;
use App\Repositories\Contracts\TurnoRepositoryInterface;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Exception;

class MovimientoRepository implements MovimientoRepositoryInterface
{
    protected $turnoRepo;

    // Inyectamos tu TurnoRepository para usar tu método mágico
    public function __construct(TurnoRepositoryInterface $turnoRepo)
    {
        $this->turnoRepo = $turnoRepo;
    }

    public function obtenerTodos(array $filtros = []): mixed
    {
        $query = Movimiento::with(['producto', 'usuario', 'turno'])->orderBy('created_at', 'desc');

        // Filtro por tipo de movimiento
        $query->when(data_get($filtros, 'tipo_movimiento'), function ($q, $tipo) {
            $q->where('tipo_movimiento', $tipo);
        });

        // Filtro por producto
        $query->when(data_get($filtros, 'id_producto'), function ($q, $idProducto) {
            $q->where('id_producto', $idProducto);
        });

        return $query->get();
    }

    public function registrar(array $data)
    {
        // Usamos DB::transaction para asegurar que o se guarda TODO o no se guarda NADA
        return DB::transaction(function () use ($data) {
            
            // 1. Obtenemos el Turno Automáticamente
            $turno = $this->turnoRepo->obtenerTurnoPorHoraActual();
            if (!$turno) {
                throw new Exception("No se puede registrar: No hay un turno activo configurado para esta hora.");
            }

            // 2. Buscamos el producto y bloqueamos la fila temporalmente para evitar que 
            // otro usuario lo modifique al mismo tiempo (Concurrencia)
            $producto = Producto::where('id', $data['id_producto'])->lockForUpdate()->firstOrFail();

            // 3. Cálculos matemáticos
            $stockAnterior = $producto->StockActual;
            $cantidad = (int) $data['cantidad'];
            
            if ($data['tipo_movimiento'] === 'ingreso') {
                $stockSaldo = $stockAnterior + $cantidad;
            } else { // salida
                if ($stockAnterior < $cantidad) {
                    throw new Exception("Stock insuficiente. Tienes {$stockAnterior} unidades y quieres sacar {$cantidad}.");
                }
                $stockSaldo = $stockAnterior - $cantidad;
            }

            // 4. Capturamos los datos automáticos
            $ahora = Carbon::now();

            // 5. Creamos el Movimiento
            $movimiento = Movimiento::create([
                'id_producto'     => $producto->id,
                'fecha'           => $ahora->toDateString(), // YYYY-MM-DD
                'hora'            => $ahora->toTimeString(), // HH:MM:SS
                'id_usuario'      => Auth::id(),             // Usuario logueado
                'id_turno'        => $turno->IdTurno,        // Tu llave primaria personalizada
                'tipo_movimiento' => $data['tipo_movimiento'],
                'cantidad'        => $cantidad,
                'stock_anterior'  => $stockAnterior,
                'stock_saldo'     => $stockSaldo,
                'motivo'          => $data['motivo'],
            ]);

            // 6. Actualizamos el Stock en la tabla Productos
            $producto->update([
                'StockActual' => $stockSaldo
            ]);

            return $movimiento;
        });
    }
}