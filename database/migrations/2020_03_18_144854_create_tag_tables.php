<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTagTables extends Migration
{
    public function up()
    {
        Schema::create('tag_types', function (Blueprint $table) {
            $table->string('str_id', 40)->primary();
            
            $table->string('subject', 40);
            $table->string('category', 40);
            $table->unsignedInteger('category_order')->nullable();
            $table->unsignedInteger('group_order')->nullable();
            $table->string('display_name', 40);
            $table->boolean('multiple')->default(0);
            $table->json('dependency')->nullable();
        });

        //original Spatie (following 2)
        Schema::create('tags', function (Blueprint $table) {
            $table->unsignedInteger('id')->primary();
            $table->string('type');
            $table->unsignedInteger('order_column')->nullable();
            $table->json('name');
            $table->timestamps();
            $table->json('slug');

            $table->foreign('type')->references('str_id')->on('tag_types')->onUpdate('cascade');
        });

        Schema::create('taggables', function (Blueprint $table) {
            $table->unsignedInteger('tag_id');
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
