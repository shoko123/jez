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
            $table->unsignedInteger('base_type_id')->nullable();
            $table->string('description', 100)->nullable();
            $table->string('notes', 100)->nullable();
            $table->unsignedInteger('rim_diameter')->nullable();
            $table->unsignedInteger('base_diameter')->nullable();
            $table->unsignedInteger('bangle_diameter')->nullable();
            $table->unsignedInteger('bead_diameter')->nullable();
            $table->unsignedInteger('pontil_diameter')->nullable();
                      
            $table->foreign('base_type_id')
            ->references('id')->on('partitions')
            ->onDelete('set null')
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
        Schema::dropIfExists('glasses');
    }
}
