<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGlassesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('glasses', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('rim_diameter')->nullable();
            $table->unsignedInteger('base_diameter')->nullable();
            $table->unsignedInteger('bangle_diameter')->nullable();
            $table->unsignedInteger('bead_diameter')->nullable();
            $table->unsignedInteger('pontil_diameter')->nullable();
            $table->string('description', 100)->nullable();
            $table->string('notes', 100)->nullable();
            $table->unsignedTinyInteger('filler_image_id')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('glasses');
    }
}
