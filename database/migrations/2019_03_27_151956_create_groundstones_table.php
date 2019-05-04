<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGroundstonesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('groundstones', function (Blueprint $table) {
            $table->increments('id');
            $table->string('material', 50)->nullable();
            $table->unsignedInteger('width')->nullable();
            $table->unsignedInteger('length')->nullable();
            $table->unsignedInteger('height')->nullable();
            $table->unsignedInteger('type')->nullable();
            $table->string('quantity', 50)->nullable();
            $table->string('description', 255)->nullable();
            $table->string('notes', 255)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('groundstones');
    }
}
