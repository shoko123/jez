<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSceneablesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sceneables', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('scene_id');
            $table->string('sceneable_type');
            $table->unsignedInteger('sceneable_id');
            $table->index(['sceneable_type', 'sceneable_id']);
            $table->foreign('scene_id')->references('id')->on('scenes')
                ->onDelete('cascade')
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
        Schema::dropIfExists('sceneables');
    }
}
