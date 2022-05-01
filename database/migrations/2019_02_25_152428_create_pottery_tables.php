<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePotteryTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pottery_base_types', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 50);
        });

        Schema::create('pottery', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('base_type_id')->default(1);
            $table->string('periods', 250)->nullable();
            $table->string('description', 400)->nullable();
            
            $table->foreign('base_type_id')
                ->references('id')->on('pottery_base_types')
                ->onUpdate('cascade');
        });

        Schema::create('pottery_tag_types', function (Blueprint $table) {
            $table->tinyIncrements('id');
            $table->string('name', 40);
            $table->string('category', 40);
            $table->unsignedTinyInteger('category_order');
            $table->unsignedTinyInteger('group_order');
            $table->string('display_name', 40);
            $table->boolean('multiple')->default(0);
            $table->json('dependency')->nullable();
        });

        Schema::create('pottery_tags', function (Blueprint $table) {
            $table->smallIncrements('id');
            $table->unsignedTinyInteger('type_id');
            $table->foreign('type_id')
                ->references('id')
                ->on('pottery_tag_types')
                ->onUpdate('cascade');
            $table->unsignedSmallInteger('order_column');
            $table->string('name', 50);
        });

        Schema::create('pottery-pottery_tags', function (Blueprint $table) {
            $table->unsignedInteger('item_id');
            $table->foreign('item_id')->references('id')->on('pottery')->onUpdate('cascade');

            $table->unsignedSmallInteger('tag_id')->unsigned();
            $table->foreign('tag_id')->references('id')->on('pottery_tags')->onUpdate('cascade');

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
        Schema::dropIfExists('pottery_base_types');
        Schema::dropIfExists('pottery');
    }
}
