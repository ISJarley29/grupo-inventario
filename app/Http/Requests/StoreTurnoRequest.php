<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTurnoRequest extends FormRequest
{
    /**
     * Determina si el usuario está autorizado para hacer esta petición.
     */
    public function authorize(): bool
    {
        return true; // Por ahora lo dejamos en true para permitir la creación
    }

    /**
     * Reglas de validación.
     */
    public function rules(): array
    {
        return [
            'Nombre'      => 'required|string|max:50',
            'Hora_inicio' => 'required|date_format:H:i',
            'Hora_fin'    => 'required|date_format:H:i|after:Hora_inicio', // Debe ser después de la hora de inicio
            'Descripcion' => 'nullable|string|max:255',
            'Estado'      => 'nullable|string|in:Activo,Inactivo'
        ];
    }

    /**
     * Mensajes personalizados (Opcional, para que los errores sean más amigables).
     */
    public function messages(): array
    {
        return [
            'Hora_fin.after' => 'La hora de fin debe ser posterior a la hora de inicio.'
        ];
    }
}