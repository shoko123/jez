<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAreasTable extends Migration
{
    public function up()
    {
        Schema::create('areas', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 1);
            $table->string('description', 1000)->nullable();
            $table->string('dig_notes', 1000)->nullable();
        });

        Schema::create('areas_seasons', function (Blueprint $table) {
            $table->increments('id');          
            $table->unsignedInteger('area_id'); 
            $table->unsignedTinyInteger('season')->nullable(); 
            $table->string('area', 1);
            $table->string('tag', 4)->nullable();
            $table->string('description', 2000)->nullable();
            $table->string('staff', 500)->nullable();
            
            $table->foreign('area_id')
            ->references('id')->on('areas')
            ->onUpdate('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('areas');
        Schema::dropIfExists('areas_seasons');
    }
}
