<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLithicsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('lithics', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedTinyInteger('no_of_items')->nullable();
            $table->string('description', 500)->nullable();
            $table->unsignedInteger('width')->nullable();
            $table->unsignedInteger('length')->nullable();
            $table->unsignedInteger('thickness')->nullable();
            $table->unsignedInteger('weight')->nullable();
            $table->boolean('burnt')->nullable();
            $table->boolean('rolled')->nullable();
            $table->boolean('hinge')->nullable();

            $table->unsignedInteger('base_type_id')->default(1);
            $table->foreign('base_type_id')
                ->references('id')->on('lithic_base_types')
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
        Schema::dropIfExists('lithics');
    }
}
