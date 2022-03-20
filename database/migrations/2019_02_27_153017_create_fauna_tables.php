<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFaunaTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {


        Schema::create('fauna_taxa_L1', function (Blueprint $table) {
            $table->tinyIncrements('id');
            $table->string('name', 50);
        });

        Schema::create('fauna_elements_L1', function (Blueprint $table) {
            $table->tinyincrements('id');
            $table->string('name', 50);
        });

        Schema::create('fauna', function (Blueprint $table) {
            $table->increments('id');
            $table->string('quantity', 60)->nullable();
            $table->string('description', 400)->nullable();
            $table->string('notes', 100)->nullable();
            $table->unsignedTinyInteger('taxa_L1_id')->dafault(1);
            $table->unsignedTinyInteger('element_L1_id')->dafault(1);
            $table->string('symmetry', 1)->nullable();
            $table->unsignedTinyInteger('fused')->nullable();
            $table->unsignedTinyInteger('butchery')->nullable();
            $table->unsignedTinyInteger('burnning')->nullable();
            $table->unsignedTinyInteger('weathering')->nullable();

            $table->foreign('taxa_L1_id')
                ->references('id')->on('fauna_taxa_L1')
                ->onUpdate('cascade');

            $table->foreign('element_L1_id')
                ->references('id')->on('fauna_elements_L1')
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
        Schema::dropIfExists('fauna_base_types');
        Schema::dropIfExists('fauna');
    }
}
