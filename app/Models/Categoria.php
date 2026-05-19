<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categoria extends Model
{
    use HasFactory;

    // Indicamos el nombre exacto de la tabla en tu base de datos
    protected $table = 'categorias';

    protected $primaryKey = 'IdCategoria';

    /**
     * Los atributos que se pueden asignar masivamente.
     */
    protected $fillable = [
        'nombre',
        'descripcion',
    ];
}
