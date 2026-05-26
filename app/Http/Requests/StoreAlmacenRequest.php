<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAlmacenRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Cambia esto a true para permitir que cualquier usuario haga la petición
        // (Más adelante puedes poner lógica de roles aquí si lo necesitas)
        return true;
    }

    public function rules(): array
    {
        return [
            'nombre' => 'required|string|max:100|unique:almacenes,nombre',
            'descripcion' => 'nullable|string|max:255',
        ];
    }

    public function messages(): array
    {
        return [
            'nombre.required' => 'El nombre del almacén es obligatorio.',
            'nombre.unique' => 'Ya existe un almacén con este nombre.',
            'nombre.max' => 'El nombre no puede tener más de 100 caracteres.',
        ];
    }
}
