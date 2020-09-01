<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFloraTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('flora', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('base_type_id')->nullable();            
            $table->string('quantity', 60)->nullable();
            $table->string('description', 100)->nullable();
            $table->string('notes', 100)->nullable();
            
            $table->foreign('base_type_id')
            ->references('id')->on('partitions')
            ->onDelete('set null')
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
        Schema::dropIfExists('flora');
    }
}
