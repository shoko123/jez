<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGroundstonesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('groundstones', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('groundstone_type_id')->nullable();
            $table->unsignedInteger('material_id')->nullable();
            $table->unsignedInteger('weight')->nullable();
            $table->string('notes', 255)->nullable();
            $table->string('measurements', 255)->nullable();


            $table->unsignedInteger('width')->nullable();
            $table->unsignedInteger('length')->nullable();
            $table->unsignedInteger('height')->nullable();
            $table->unsignedInteger('type')->nullable();
            $table->string('material', 50)->nullable();
            
            
           
            

            $table->string('quantity', 50)->nullable();
            $table->string('description', 255)->nullable();
            //$table->foreign('groundstone_types_id')
            //     ->references('id')->on('groundstone_types');
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
        Schema::dropIfExists('groundstones');
    }
}
