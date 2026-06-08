<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'Nombre'             => 'required|string|max:255',
            'IdAlmacen'          => 'required|exists:almacenes,id',
            'IdCategoria'        => 'required|exists:categorias,id',
            'UnidadDeMedida'     => 'required|exists:unidad_medidas,id',
            'StockActual'        => 'required|integer|min:0',
            'StockMinimo'        => 'required|integer|min:0',
            'FechaDeVencimiento' => 'nullable|date',
        ];
    }

    public function messages(): array
    {
        return [
            'Nombre.required'         => 'El nombre del producto es obligatorio.',
            'IdAlmacen.required'      => 'Debes seleccionar un almacén.',
            'IdCategoria.required'    => 'Debes seleccionar una categoría.',
            'UnidadDeMedida.required' => 'Debes seleccionar una unidad de medida.',
            'StockActual.min'         => 'El stock no puede ser un número negativo.',
        ];
    }
}