<?php

namespace App\Exports;

use App\Models\User;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class UsersExport implements FromCollection, WithHeadings, WithMapping
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return User::all();
    }

    /**
     * Define los encabezados de la primera fila del Excel
     */
    public function headings(): array
    {
        return [
            'ID',
            'Nombre',
            'Correo Electrónico',
            'Rol',
            'Estado',
            'Fecha de Registro',
        ];
    }

    /**
     * Mapea cómo se verá cada fila, para no mandar contraseñas
     * y para que el estado se lea bonito ('Activo' en vez de un 1)
     */
    public function map($user): array
    {
        return [
            $user->id,
            $user->name,
            $user->email,
            $user->role,
            $user->status ? 'Activo' : 'Inactivo',
            $user->created_at ? $user->created_at->format('d/m/Y') : 'N/A',
        ];
    }
}
