<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTurnoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'Nombre'      => 'required|string|max:50',
            'Hora_inicio' => 'required|date_format:H:i',
            'Hora_fin'    => 'required|date_format:H:i|after:Hora_inicio',
            'Descripcion' => 'nullable|string|max:255',
            'Estado'      => 'required|string|in:Activo,Inactivo'
        ];
    }

    public function messages(): array
    {
        return [
            'Hora_fin.after' => 'La hora de fin debe ser posterior a la hora de inicio.'
        ];
    }
}