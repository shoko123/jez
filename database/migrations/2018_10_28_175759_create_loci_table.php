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
            $table->unsignedInteger('area_season_id');
            $table->unsignedInteger('locus_no');
            $table->string('square', 20)->nullable();
            $table->timestamp('date_opened')->nullable();
            $table->timestamp('date_closed')->nullable();
            $table->string('level_opened', 20)->nullable();
            $table->string('level_closed', 20)->nullable();
            $table->string('locus_above', 50)->nullable();
            $table->string('locus_below', 50)->nullable();
            $table->string('locus_co_existing', 50)->nullable();
            $table->string('description', 1000)->nullable();
            $table->string('deposit', 500)->nullable();
            $table->string('registration_notes', 500)->nullable();
            $table->string('clean', 1)->nullable();
            
            $table->unique(['area_season_id', 'locus_no']);
            
            $table->foreign('area_season_id')
                  ->references('id')->on('areas_seasons')
                  ->onDelete('cascade')
                  ->onUpdate('cascade');
        });

        Schema::create('locus_tag_types', function (Blueprint $table) {
            $table->tinyIncrements('id');
            $table->string('name', 40);
            $table->boolean('multiple')->default(0);
            $table->json('dependency')->nullable();
        });

        Schema::create('locus_tags', function (Blueprint $table) {
            $table->smallIncrements('id');
            $table->string('name', 50);
            $table->unsignedTinyInteger('type_id');
            $table->unsignedSmallInteger('order_column');
                
            $table->foreign('type_id')
                ->references('id')
                ->on('locus_tag_types')
                ->onUpdate('cascade');
        });

        Schema::create('locus-locus_tags', function (Blueprint $table) {
            $table->unsignedInteger('item_id');
            $table->foreign('item_id')->references('id')->on('loci')->onUpdate('cascade');

            $table->unsignedSmallInteger('tag_id')->unsigned();
            $table->foreign('tag_id')->references('id')->on('locus_tags')->onUpdate('cascade');

            $table->primary(['item_id', 'tag_id']);
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
