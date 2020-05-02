<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStonesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    { 
        Schema::create('stones', function (Blueprint $table) {          
            $table->increments('id');
            $table->unsignedInteger('weight')->nullable();
            $table->string('notes', 500)->nullable();
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
        //drop dependant tables to avoid fk violations.
        Schema::dropIfExists('stones');
    }
}
