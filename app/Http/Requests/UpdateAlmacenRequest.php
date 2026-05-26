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
        $idAlmacen = $this->route('almacene') ?? $this->route('almacen');

        return [
            'nombre' => 'required|string|max:100|unique:almacenes,nombre,' . $idAlmacen,
            'descripcion' => 'nullable|string',
            'estado' => 'required|boolean',
        ];
    }
}
