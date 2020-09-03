<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePotteryTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pottery', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('base_type_id')->nullable();
            $table->string('periods', 100)->nullable();
            $table->string('description', 100)->nullable();
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
        Schema::dropIfExists('pottery');
    }
}
