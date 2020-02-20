<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLociTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('loci', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('area_id');
            $table->unsignedInteger('locus_no');
            $table->string('square', 20)->nullable();
            $table->timestamp('date_opened')->nullable();
            $table->timestamp('date_closed')->nullable();
            $table->string('level_opened', 20)->nullable();
            $table->string('level_closed', 20)->nullable();
            $table->string('locus_above', 50)->nullable();
            $table->string('locus_below', 50)->nullable();
            $table->string('locus_co_existing', 50)->nullable();
            $table->string('description', 500)->nullable();
            $table->string('deposit', 500)->nullable();
            $table->string('registration_notes', 500)->nullable();
            $table->string('clean', 1)->nullable();
            $table->unique(['area_id', 'locus_no']);
            
            $table->foreign('area_id')
                  ->references('id')->on('areas')
                  ->onDelete('cascade')
                  ->onUpdate('cascade');


            //$table->unique('area_id', 'locus');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('loci');
    }
}
