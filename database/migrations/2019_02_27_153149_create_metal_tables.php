<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMetalTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('metal_base_types', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 50);
        });

        Schema::create('metals', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('base_type_id')->default(1);
            $table->string('description', 400)->nullable();
            $table->string('measurements', 200)->nullable();
            $table->foreign('base_type_id')
                ->references('id')->on('metal_base_types')
                ->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('metal_base_types');
        Schema::dropIfExists('metals');
    }
}
