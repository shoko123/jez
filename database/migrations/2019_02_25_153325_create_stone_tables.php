<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStoneTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('stone_base_types', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 50);
        });

        Schema::create('stone_materials', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 50);
        });

        Schema::create('stones', function (Blueprint $table) {
            $table->increments('id');

            $table->unsignedInteger('base_type_id')->default(1);
            $table->unsignedInteger('material_id')->default(1);

            $table->string('description', 400)->nullable();
            $table->string('notes', 400)->nullable();
            $table->unsignedSmallInteger('weight')->nullable();
            $table->unsignedSmallInteger('length')->nullable();
            $table->unsignedSmallInteger('width')->nullable();
            $table->unsignedSmallInteger('depth')->nullable();
            $table->unsignedSmallInteger('thickness_min')->nullable();
            $table->unsignedSmallInteger('thickness_max')->nullable();
            $table->unsignedSmallInteger('perforation_diameter_max')->nullable();
            $table->unsignedSmallInteger('perforation_diameter_min')->nullable();
            $table->unsignedSmallInteger('perforation_depth')->nullable();
            $table->unsignedSmallInteger('diameter')->nullable();
            $table->unsignedSmallInteger('rim_diameter')->nullable();
            $table->unsignedSmallInteger('rim_thickness')->nullable();
            $table->unsignedSmallInteger('base_diameter')->nullable();
            $table->unsignedSmallInteger('base_thickness')->nullable();


            //by default delete of row in parent table is rejected if any refernece exists.
            $table->foreign('base_type_id')
                ->references('id')->on('stone_base_types')
                ->onUpdate('cascade');

            $table->foreign('material_id')
                ->references('id')->on('stone_materials')
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
        //drop dependant tables first to avoid fk violations.
        Schema::dropIfExists('stone_materials');
        Schema::dropIfExists('stone_base_types');
        Schema::dropIfExists('stones');
    }
}
