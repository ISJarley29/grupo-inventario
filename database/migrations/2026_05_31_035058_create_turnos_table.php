<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('turnos', function (Blueprint $table) {
            $table->id('IdTurno'); // Llave primaria personalizada
            $table->string('Nombre', 50); // Ej: Mañana, Tarde, Noche
            $table->time('Hora_inicio');
            $table->time('Hora_fin');
            $table->string('Descripcion', 255)->nullable();
            $table->string('Estado', 20)->default('Activo');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('turnos');
    }
};