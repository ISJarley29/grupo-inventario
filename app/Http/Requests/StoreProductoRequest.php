<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductoRequest extends FormRequest
{
    /**
     * Determina si el usuario está autorizado para hacer esta petición.
     */
    public function authorize(): bool
    {
        return true; // Cambiamos a true para permitir la validación
    }

    /**
     * Reglas de validación.
     */
    public function rules(): array
    {
        return [
            'Nombre'             => 'required|string|max:255',
            // Validamos que el ID enviado realmente exista en sus respectivas tablas
            'IdAlmacen'          => 'required|exists:almacenes,id',
            'IdCategoria'        => 'required|exists:categorias,id',
            'UnidadDeMedida'     => 'required|exists:unidad_medidas,id',
            // El stock debe ser un número entero y no puede ser negativo
            'StockActual'        => 'required|integer|min:0',
            'StockMinimo'        => 'required|integer|min:0',
            // La fecha es opcional, pero si se envía, debe tener formato de fecha válido
            'FechaDeVencimiento' => 'nullable|date',
        ];
    }

    /**
     * Mensajes de error personalizados (Opcional pero muy recomendado para tu frontend)
     */
    public function messages(): array
    {
        return [
            'Nombre.required'             => 'El nombre del producto es obligatorio.',
            'IdAlmacen.required'          => 'Debes seleccionar un almacén.',
            'IdAlmacen.exists'            => 'El almacén seleccionado no es válido.',
            'IdCategoria.required'        => 'Debes seleccionar una categoría.',
            'UnidadDeMedida.required'     => 'Debes seleccionar una unidad de medida.',
            'StockActual.min'             => 'El stock no puede ser un número negativo.',
            'FechaDeVencimiento.date'     => 'La fecha de vencimiento no tiene un formato válido.',
        ];
    }
}