<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMetalTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('metal_base_types', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 50);
        });


        Schema::create('metal_materials', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 50);
        });

        Schema::create('metals', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('material_id')->default(1);
            $table->unsignedInteger('base_type_id')->default(1);
            $table->string('description', 400)->nullable();
            $table->string('measurements', 200)->nullable();
            $table->string('notes')->nullable();
            $table->foreign('base_type_id')
                ->references('id')->on('metal_base_types')
                ->onUpdate('cascade');

            $table->foreign('material_id')
                ->references('id')->on('metal_materials')
                ->onUpdate('cascade');
        });

        Schema::create('metal_tag_types', function (Blueprint $table) {
            $table->tinyIncrements('id');
            $table->string('name', 40);
            $table->string('category', 40);
            $table->unsignedTinyInteger('category_order');
            $table->unsignedTinyInteger('group_order');
            $table->string('display_name', 40);
            $table->boolean('multiple')->default(0);
            $table->json('dependency')->nullable();
        });

        Schema::create('metal_tags', function (Blueprint $table) {
            $table->smallIncrements('id');
            $table->unsignedTinyInteger('type_id');
            $table->foreign('type_id')
                ->references('id')
                ->on('metal_tag_types')
                ->onUpdate('cascade');
            $table->unsignedSmallInteger('order_column');
            $table->string('name', 50);
        });

        Schema::create('metal-metal_tags', function (Blueprint $table) {
            $table->unsignedInteger('item_id');
            $table->foreign('item_id')->references('id')->on('metals')->onUpdate('cascade');

            $table->unsignedSmallInteger('tag_id')->unsigned();
            $table->foreign('tag_id')->references('id')->on('metal_tags')->onUpdate('cascade');

            $table->primary(['item_id', 'tag_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('metal_materials');
        Schema::dropIfExists('metal_base_types');
        Schema::dropIfExists('metals');
    }
}
