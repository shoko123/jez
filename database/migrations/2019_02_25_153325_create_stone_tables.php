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

        Schema::create('stone_tag_types', function (Blueprint $table) {
            $table->tinyIncrements('id');
            $table->string('name', 40);
            $table->string('category', 40);
            $table->unsignedTinyInteger('category_order');
            $table->unsignedTinyInteger('group_order');
            $table->string('display_name', 40);
            $table->boolean('multiple')->default(0);
            $table->json('dependency')->nullable();
        });

        Schema::create('stone_tags', function (Blueprint $table) {
            $table->smallIncrements('id');
            $table->unsignedTinyInteger('type_id');
            $table->foreign('type_id')
                ->references('id')
                ->on('stone_tag_types')
                ->onUpdate('cascade');
            $table->unsignedSmallInteger('order_column');
            $table->string('name', 50);
        });

        Schema::create('stone-stone_tags', function (Blueprint $table) {
            $table->unsignedInteger('item_id');
            $table->foreign('item_id')->references('id')->on('stones')->onUpdate('cascade');

            $table->unsignedSmallInteger('tag_id')->unsigned();
            $table->foreign('tag_id')->references('id')->on('stone_tags')->onUpdate('cascade');

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
        //drop dependant tables first to avoid fk violations.
        Schema::dropIfExists('stone_materials');
        Schema::dropIfExists('stone_base_types');
        Schema::dropIfExists('stones');
    }
}
