<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 1. MODIFICAMOS LA TABLA USERS NATIVA PARA ADAPTARLA A TU DIAGRAMA
        Schema::create('users', function (Blueprint $table) {
            $table->id(); // Equivale a tu IdUsuarios (Dejarlo como id() mantiene la compatibilidad de Laravel)
            $table->string('name'); // Tu campo 'Nombre'
            $table->string('email')->unique(); // Tu campo 'email'
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password'); // Requerido por el sistema de Auth
            
            // 👇 CAMPOS AGREGADOS PARA TU MÓDULO DE USUARIOS Y ROLES
            $table->string('role')->default('usuario'); // Tu campo 'Rol' (admin, almacenero, usuario)
            $table->boolean('status')->default(true);   // Tu campo 'Estado' (true = Activo, false = Inactivo)
            
            $table->rememberToken();
            $table->timestamps();
        });

        // ⚠️ DEJAMOS ESTO EXACTAMENTE IGUAL (Si lo borras, el sistema se cae)
        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        // ⚠️ DEJAMOS ESTO EXACTAMENTE IGUAL (Requerido para guardar las sesiones en BD)
        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};