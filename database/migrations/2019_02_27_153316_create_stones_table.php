<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStonesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('stones', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('stone_type_id')->nullable();
            $table->unsignedInteger('material_id')->nullable();
            $table->unsignedInteger('weight')->nullable();
            $table->string('notes', 500)->nullable();
            $table->string('measurements', 500)->nullable();
            //$table->foreign('stone_type_id')
            //     ->references('id')->on('stone_types');
            //$table->foreign('material_id')
            //      ->references('id')->on('materials');
            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('stones');
    }
}
