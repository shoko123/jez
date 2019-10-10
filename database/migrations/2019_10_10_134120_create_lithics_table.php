<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

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
            $table->string('notes', 500)->nullable();
            $table->unsignedInteger('weight')->nullable();           
            $table->unsignedInteger('lithic_type_id')->nullable();          
            $table->boolean('burnt')->nullable();
            $table->boolean('rolled')->nullable();
            $table->unsignedInteger('total')->nullable();
            $table->string('measurements', 500)->nullable();
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

