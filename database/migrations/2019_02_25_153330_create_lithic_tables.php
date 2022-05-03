<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLithicTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('lithic_base_types', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 50);
        });

        Schema::create('lithics', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('base_type_id')->default(1);
            $table->string('description', 400)->nullable();
            $table->unsignedInteger('width')->nullable();
            $table->unsignedInteger('length')->nullable();
            $table->unsignedInteger('thickness')->nullable();
            $table->unsignedInteger('weight')->nullable();
            $table->boolean('burnt')->nullable();
            $table->boolean('rolled')->nullable();
            $table->boolean('hinge')->nullable();

            $table->foreign('base_type_id')
                ->references('id')->on('lithic_base_types')
                ->onUpdate('cascade');
        });

        Schema::create('lithic_tag_types', function (Blueprint $table) {
            $table->tinyIncrements('id');
            $table->string('name', 40);
            $table->boolean('multiple')->default(0);
            $table->json('dependency')->nullable();
        });

        Schema::create('lithic_tags', function (Blueprint $table) {
            $table->smallIncrements('id');
            $table->unsignedTinyInteger('type_id');
            $table->foreign('type_id')
                ->references('id')
                ->on('lithic_tag_types')
                ->onUpdate('cascade');
            $table->unsignedSmallInteger('order_column');
            $table->string('name', 50);
        });

        Schema::create('lithic-lithic_tags', function (Blueprint $table) {
            $table->unsignedInteger('item_id');
            $table->foreign('item_id')->references('id')->on('lithics')->onUpdate('cascade');

            $table->unsignedSmallInteger('tag_id')->unsigned();
            $table->foreign('tag_id')->references('id')->on('lithic_tags')->onUpdate('cascade');

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
        Schema::dropIfExists('lithic_base_types');
        Schema::dropIfExists('lithics');
    }
}
