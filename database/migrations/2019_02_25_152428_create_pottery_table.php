<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

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
            $table->unsignedInteger('base_type_id')->default(1);
            $table->string('periods', 100)->nullable();
            $table->string('description', 400)->nullable();
            
            $table->foreign('base_type_id')
                ->references('id')->on('pottery_base_types')
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
        Schema::dropIfExists('pottery');
    }
}
