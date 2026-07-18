<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('movimientos', function (Blueprint $table) {
            $table->id();
            
            // Llaves foráneas
            $table->foreignId('id_producto')->constrained('productos')->onDelete('cascade');
            $table->foreignId('id_usuario')->constrained('users')->onDelete('cascade');
            
            // Relación con Turnos (Como tu PK es 'IdTurno', se define así)
            $table->unsignedBigInteger('id_turno');
            $table->foreign('id_turno')->references('IdTurno')->on('turnos')->onDelete('cascade');

            // Campos de auditoría automática
            $table->date('fecha');
            $table->time('hora');

            // Datos del movimiento
            $table->enum('tipo_movimiento', ['ingreso', 'salida']); // Usamos 'ingreso' como indicaste
            $table->integer('cantidad');
            $table->integer('stock_anterior');
            $table->integer('stock_saldo');
            $table->string('motivo', 255);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('movimientos');
    }
};