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
            $table->unsignedTinyInteger('season')->nullable(); 
            $table->string('area', 1);
            $table->string('tag', 4)->nullable();
            $table->string('description', 500)->nullable();
            $table->string('staff', 200)->nullable();
            $table->unsignedInteger('year');
        });
    }

    public function down()
    {
        Schema::dropIfExists('areas');
    }
}
