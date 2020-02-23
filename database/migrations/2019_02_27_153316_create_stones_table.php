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
        Schema::create('stone_types', function (Blueprint $table) {
            $table->unsignedInteger('id');
            $table->primary('id');
            $table->string('name', 25);
        });

        Schema::create('materials', function (Blueprint $table) {
            $table->unsignedInteger('id');
            $table->primary('id');
            $table->string('name', 25);
        });

        Schema::create('stones', function (Blueprint $table) {          
            $table->increments('id');
            $table->unsignedInteger('stone_type_id')->nullable();
            $table->unsignedInteger('material_id')->nullable();
            $table->unsignedInteger('weight')->nullable();
            $table->string('notes', 500)->nullable();
            $table->string('measurements', 500)->nullable();
            
            //add fk tostones table
            $table->foreign('material_id')->references('id')->on('materials');
            $table->foreign('stone_type_id')->references('id')->on('stone_types');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //drop dependant tables to avoid fk violations.
        Schema::dropIfExists('stones');
        Schema::dropIfExists('stone_types');
        Schema::dropIfExists('materials');
    }
}
