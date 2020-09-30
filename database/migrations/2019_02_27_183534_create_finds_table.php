<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFindsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('finds', function (Blueprint $table) {
                      
            //composite primary key and polymorphic relation to the different find tables
            $table->string('findable_type', 20);
            $table->unsignedInteger('findable_id');
            
            //registration data of all small finds
            $table->unsignedInteger('locus_id');//foreign key
            $table->string('registration_category', 2);
            $table->unsignedInteger('basket_no');
            $table->unsignedInteger('artifact_no');
            $table->unsignedInteger('piece_no');
            //common fields to all small finds
            $table->unsignedInteger('related_pottery_basket')->nullable();
            $table->date('date')->nullable();
            $table->string('description', 400)->nullable();
            $table->string('notes', 400)->nullable();
            $table->string('square', 20)->nullable();
            $table->boolean('keep')->nullable();
            $table->string('level_top', 20)->nullable();
            $table->string('level_bottom', 20)->nullable();

            $table->primary(['findable_type', 'findable_id']);

            $table->foreign('locus_id')
                ->references('id')->on('loci')
                ->onDelete('cascade')
                ->onUpdate('cascade');
        });

        DB::statement('ALTER TABLE finds ADD CONSTRAINT finds_chk_registration_category CHECK (registration_category in ("AR","FL","GS", "LB", "PT"));');
        DB::statement('ALTER TABLE finds ADD CONSTRAINT finds_unique_registration UNIQUE(findable_type, locus_id, registration_category, basket_no, artifact_no, piece_no);');    
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('finds');
    }
}
