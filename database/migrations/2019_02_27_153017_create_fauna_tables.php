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
        Schema::create('fauna_base_types', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 50);
        });

        Schema::create('fauna', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('base_type_id')->dafault(1);
            $table->string('quantity', 60)->nullable();
            $table->string('description', 400)->nullable();
            $table->string('notes', 100)->nullable();
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
