<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreMovimientoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; 
    }

    public function rules(): array
    {
        return [
            'id_producto'     => 'required|exists:productos,id',
            'tipo_movimiento' => 'required|string|in:ingreso,salida',
            'cantidad'        => 'required|integer|min:1',
            'motivo'          => 'required|string|max:255',
        ];
    }

    public function messages(): array
    {
        return [
            'id_producto.required'     => 'Debes seleccionar un producto.',
            'id_producto.exists'       => 'El producto seleccionado no es válido.',
            'tipo_movimiento.in'       => 'El tipo de movimiento debe ser ingreso o salida.',
            'cantidad.min'             => 'La cantidad a mover debe ser al menos 1.',
            'motivo.required'          => 'Debes justificar el motivo del movimiento.',
        ];
    }
}