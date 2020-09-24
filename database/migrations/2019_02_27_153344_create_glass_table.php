<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGlassTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('glass', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('base_type_id')->default(1);
            $table->string('description', 400)->nullable();
            $table->unsignedInteger('rim_diameter')->nullable();
            $table->unsignedInteger('base_diameter')->nullable();
            $table->unsignedInteger('bangle_diameter')->nullable();
            $table->unsignedInteger('bead_diameter')->nullable();
            $table->unsignedInteger('pontil_diameter')->nullable();

            $table->foreign('base_type_id')
                ->references('id')->on('glass_base_types')
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
        Schema::dropIfExists('glass');
    }
}
