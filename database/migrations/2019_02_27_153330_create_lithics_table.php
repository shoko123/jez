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
        Schema::create('lithic_types', function (Blueprint $table) {
            $table->unsignedInteger('id');
            $table->primary('id');
            $table->string('name', 50);
        });

        Schema::create('lithics', function (Blueprint $table) {
            $table->increments('id'); 
            $table->string('notes', 100)->nullable();
            $table->string('description', 200)->nullable();
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
        Schema::dropIfExists('lithic_types');
        Schema::dropIfExists('lithics');
    }
}

