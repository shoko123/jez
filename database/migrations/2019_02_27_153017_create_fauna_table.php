<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFaunaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('fauna', function (Blueprint $table) {
            $table->increments('id');
            $table->string('quantity', 60)->nullable();
            $table->string('description', 100)->nullable();
            $table->string('notes', 100)->nullable();
            $table->unsignedTinyInteger('filler_image_id')->nullable(); 
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('fauna');
    }
}
