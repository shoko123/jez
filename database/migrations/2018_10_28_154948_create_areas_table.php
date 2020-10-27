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
            $table->string('description', 2000)->nullable();
            $table->string('notes', 2000)->nullable();
        });

        Schema::create('seasons', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedTinyInteger('season');
            $table->string('description', 2000)->nullable();
            $table->string('staff', 2000)->nullable();
        });

        Schema::create('areas_seasons', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('area_id');
            $table->unsignedInteger('season_id');
            $table->unsignedTinyInteger('season')->nullable();
            $table->string('area', 1);
            $table->string('tag', 4)->nullable();
            $table->string('summary', 1000)->nullable();
            $table->string('description', 2000)->nullable();

            $table->foreign('area_id')
                ->references('id')->on('areas')
                ->onUpdate('cascade');

            $table->foreign('season_id')
                ->references('id')->on('seasons')
                ->onUpdate('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('areas');
        Schema::dropIfExists('areas_seasons');
    }
}
