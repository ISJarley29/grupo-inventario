<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAlmacenRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        // Obtenemos el ID del almacén desde la URL de la ruta
        $almacenId = $this->route('almacen') ?? $this->route('id');

        return [
            // Ignoramos el ID actual para que no choque consigo mismo
            'nombre' => 'required|string|max:100|unique:almacenes,nombre,' . $almacenId . ',id',
            'descripcion' => 'nullable|string|max:255',
            'estado' => 'boolean'
        ];
    }
}