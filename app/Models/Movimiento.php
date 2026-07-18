<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Movimiento extends Model
{
    use HasFactory;

    protected $table = 'movimientos';

    protected $fillable = [
        'id_producto',
        'fecha',
        'hora',
        'id_usuario',
        'id_turno',
        'tipo_movimiento',
        'cantidad',
        'stock_anterior',
        'stock_saldo',
        'motivo'
    ];

    // Relación: Un movimiento pertenece a un Producto
    public function producto()
    {
        return $this->belongsTo(Producto::class, 'id_producto');
    }

    // Relación: Un movimiento fue hecho por un Usuario
    public function usuario()
    {
        return $this->belongsTo(User::class, 'id_usuario');
    }

    // Relación: Un movimiento ocurre en un Turno (apuntamos a tu PK personalizada)
    public function turno()
    {
        return $this->belongsTo(Turno::class, 'id_turno', 'IdTurno');
    }
}