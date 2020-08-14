<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTagTables extends Migration
{
    public function up()
    { 
        Schema::create('tag_types', function (Blueprint $table) {
            $table->increments('id');
            $table->string('category', 15);
            $table->string('name', 25);
            $table->boolean('required')->default(0);
            $table->boolean('multiple')->default(0);
            $table->integer('depends_on')->nullable();
            $table->integer('order_column')->nullable();
        });

        //original Spatie
        Schema::create('tags', function (Blueprint $table) {
            $table->increments('id');
            $table->json('name');
            $table->json('slug');
            $table->string('type')->nullable();
            $table->unsignedInteger('tag_type_id');
            $table->integer('order_column')->nullable();
            $table->timestamps();
            $table->foreign('tag_type_id')->references('id')->on('tag_types')->onDelete('cascade')->onUpdate('cascade');
        });

        Schema::create('taggables', function (Blueprint $table) {
            $table->integer('tag_id')->unsigned();
            $table->morphs('taggable');

            $table->unique(['tag_id', 'taggable_id', 'taggable_type']);

            $table->foreign('tag_id')->references('id')->on('tags')
            ->onDelete('cascade')
            ->onUpdate('cascade');
        });
    }

    public function down()
    {
        Schema::drop('taggables');
        Schema::drop('tags');
        Schema::drop('tag_types');
    }
}
