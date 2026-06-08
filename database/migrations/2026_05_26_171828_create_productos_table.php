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
        Schema::create('productos', function (Blueprint $table) {
        // Laravel usa 'id()' por defecto como llave primaria autoincrementable. 
        // Representa a tu 'IdProductos'
        $table->id(); 

        // Llaves foráneas (1:N)
        $table->foreignId('IdAlmacen')->constrained('almacenes')->onDelete('cascade');
        $table->foreignId('IdCategoria')->constrained('categorias')->onDelete('cascade');
        
        // Asumo que tu tabla de unidades se llama 'unidad_medidas' por tu controlador
        $table->foreignId('UnidadDeMedida')->constrained('unidad_medidas')->onDelete('cascade'); 

        // Campos de la tabla
        $table->string('Nombre');
        $table->integer('StockActual')->default(0);
        $table->integer('StockMinimo')->default(0);
        $table->date('FechaDeVencimiento')->nullable(); // Nullable por si hay productos que no vencen

        $table->timestamps();
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('productos');
    }
};
