<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Creamos un usuario de prueba para el equipo de desarrollo
        User::create([
            'name' => 'Admin Developer',
            'email' => 'admin@proyecto.com', // El correo para loguearse
            'password' => Hash::make('pass123'), // La contraseña encriptada
            'role' => 'admin', // Tu campo personalizado del diagrama
            'status' => true,  // Tu campo personalizado del diagrama
        ]);
    }
}