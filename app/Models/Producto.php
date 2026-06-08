<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
   use HasFactory;

    // Indicamos explícitamente el nombre de la tabla por si acaso
    protected $table = 'productos';

    // Habilitamos los campos que se pueden llenar desde los formularios
    protected $fillable = [
        'IdAlmacen',
        'IdCategoria',
        'UnidadDeMedida',
        'Nombre',
        'StockActual',
        'StockMinimo',
        'FechaDeVencimiento',
    ];

    /**
     * Relación: Un producto pertenece a un Almacén
     */
    public function almacen()
    {
        return $this->belongsTo(Almacen::class, 'IdAlmacen');
    }

    /**
     * Relación: Un producto pertenece a una Categoría
     */
    public function categoria()
    {
        return $this->belongsTo(Categoria::class, 'IdCategoria');
    }

    /**
     * Relación: Un producto pertenece a una Unidad de Medida
     */
    public function unidadMedida()
    {
        return $this->belongsTo(UnidadMedida::class, 'UnidadDeMedida');
    }
}
