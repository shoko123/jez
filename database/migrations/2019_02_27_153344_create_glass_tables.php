<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGlassTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('glass_base_types', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 50);
        });

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

        Schema::create('glass_tag_types', function (Blueprint $table) {
            $table->tinyIncrements('id');
            $table->string('name', 40);
            $table->string('category', 40);
            $table->unsignedTinyInteger('category_order');
            $table->unsignedTinyInteger('group_order');
            $table->string('display_name', 40);
            $table->boolean('multiple')->default(0);
            $table->json('dependency')->nullable();
        });

        Schema::create('glass_tags', function (Blueprint $table) {
            $table->smallIncrements('id');
            $table->unsignedTinyInteger('type_id');
            $table->foreign('type_id')
                ->references('id')
                ->on('glass_tag_types')
                ->onUpdate('cascade');
            $table->unsignedSmallInteger('order_column');
            $table->string('name', 50);
        });

        Schema::create('glass-glass_tags', function (Blueprint $table) {
            $table->unsignedInteger('item_id');
            $table->foreign('item_id')->references('id')->on('glass')->onUpdate('cascade');

            $table->unsignedSmallInteger('tag_id')->unsigned();
            $table->foreign('tag_id')->references('id')->on('glass_tags')->onUpdate('cascade');

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
        Schema::dropIfExists('glass_base_types');
        Schema::dropIfExists('glass');
    }
}
