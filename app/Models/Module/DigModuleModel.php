<?php

namespace App\Models\Module;

use DateTimeInterface;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

abstract class DigModuleModel extends Model implements HasMedia
{
    use InteractsWithMedia;

    public $incrementing = false;

    protected $keyType = 'string';

    public $timestamps = false;

    protected $guarded = [];

    abstract public static function restrictedValues(): array;

    abstract protected function short(): Attribute;

    abstract protected function derivedId(): Attribute;

    abstract public static function enumFields(): array;

    abstract public static function dateFields(): array;

    public function tableName(): string
    {
        return $this->table;
    }

    public function tagTableName(): ?string
    {
        return property_exists($this, 'moduleTagTable') ? $this->moduleTagTable : null;
    }

    public function onpTableName(): ?string
    {
        return property_exists($this, 'onpTable') ? $this->onpTable : null;
    }

    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion('tn')
            ->width(250)
            ->height(250)
            ->sharpen(10)
            ->nonQueued();
    }

    protected function serializeDate(DateTimeInterface $date): string
    {
        return $date->format('Y-m-d');
    }
}
