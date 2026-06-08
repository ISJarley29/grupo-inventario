<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Turno extends Model
{
    use HasFactory;

    protected $table = 'turnos';
    
    // Indicamos la llave primaria personalizada
    protected $primaryKey = 'IdTurno';

    protected $fillable = [
        'Nombre',
        'Hora_inicio',
        'Hora_fin',
        'Descripcion',
        'Estado'
    ];
}