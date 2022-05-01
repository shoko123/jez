<?php

namespace App\JezStatic;

class ModuleGroupOrder
{
    private static $modules = [
        "Pottery" => [
            "Periods/Groups" => [
                ["Periods (Top-Level)", "Tag-Global", "Periods:Top-Level"],
                ["Neolithic Subperiods", "Tag-Global", "Periods:Neolithic"],
                ["Neolithic-Bronze Groups", "Tag-Global", "Pottery:Named-Groups-I"],
                ["Bronze Subperiods", "Tag-Global", "Periods:Bronze"],
                ["Iron Subperiods", "Tag-Global", "Periods:Iron"],
                ["Hellenistic Subperiods", "Tag-Global", "Periods:Hellenistic"],
                ["Roman Subperiods", "Tag-Global", "Periods:Roman"],
                ["Early-Islamic Subperiods", "Tag-Global", "Periods:Early-Islamic"],
                ["Medieval Subperiods", "Tag-Global", "Periods:Medieval"],
                ["Modern Subperiods", "Tag-Global", "Periods:Modern"],

            ],
            /*
            "Group(s)" => [
                
                //["Group(s)", "Named Groups II", "Tag-Global", "Pottery:Named-Groups-I"],
                //["Group(s)", "Named Groups III", "Tag-Global", "Pottery:Named-Groups-I"],
            ],
            */

            "Ware" => [
                ["Ware Coarseness", "Tag-Global", "Pottery:Ware-Coarseness"],
                ["Ware Color", "Tag-Global", "Pottery:Ware-Color"],
                ["Ware Temper", "Tag-Global", "Pottery:Ware-Temper"],
                ["Grit Color", "Tag-Global", "Pottery:Ware-Grit-Color"],
            ],
            "Basic Characteristics" => [
                ["Preservation", "Lookup", "preservations", "preservation_id"],
                ["Life Stage", "Tag-Global", "Pottery:Life-Stage"],
                ["Production", "Tag-Global", "Pottery:Production"],
            ],
            "Typology" => [
                ["Base Partition", "Lookup", "pottery_base_types", "base_type_id"],
                ["Vessel/Lid Part", "Tag-Global", "Pottery:Vessel-Part"],
                ["Base", "Tag-Global", "Pottery:Vessel-Base-Type"],
                ["Foot", "Tag-Global", "Pottery:Foot-Type"],
                ["Rim", "Tag-Global", "Pottery:Rim-Type"],
                ["Handle", "Tag-Global", "Pottery:Handle"],
                ["Vessel Shape Typology", "Tag-Global", "Pottery:Vessel-Shape-Types"],
                ["Ceramic Artifact Typology", "Tag-Global", "Pottery:Ceramic-Artifact"],
                ["Architectural/Installation Typology", "Tag-Global", "Pottery:Architectural"],
            ],
            "Surface-Treatment" => [
                ["Surface", "Tag-Global", "Pottery:STF"],
                ["Slip Color", "Tag-Global", "Pottery:STF-Slip-Color"],
                ["Paint Color", "Tag-Global", "Pottery:STF-Paint-Color"],
                ["Paint/Slip Pattern", "Tag-Global", "Pottery:STF-Paint-Slip-Pattern"],
                ["Reductive/Additive", "Tag-Global", "Pottery:STRA"],
            ],
        ],

        "Stone" => [
            "Periods" => [
                ["Periods (Top-Level)", "Tag-Global", "Periods:Top-Level"],
                ["Neolithic Subperiods", "Tag-Global", "Periods:Neolithic"],
                ["Bronze Subperiods", "Tag-Global", "Periods:Bronze"],
                ["Iron Subperiods", "Tag-Global", "Periods:Iron"],
                ["Hellenistic Subperiods", "Tag-Global", "Periods:Hellenistic"],
                ["Roman Subperiods", "Tag-Global", "Periods:Roman"],
                ["Early-Islamic Subperiods", "Tag-Global", "Periods:Early-Islamic"],
                ["Medieval Subperiods", "Tag-Global", "Periods:Medieval"],
                ["Modern Subperiods", "Tag-Global", "Periods:Modern"],

            ],
            "Basic Characteristics" => [
                ["Preservation", "Lookup", "preservations", "preservation_id"],
                ["Material", "Lookup", "stone_materials", "material_id"],
                ["Life Stage", "Tag-Global", "Stone:Life-Stage"],
                ["Morphology", "Tag-Global", "Stone:Morphology"],
                ["Profile", "Tag-Global", "Stone:Profile"],
                ["Production", "Tag-Global", "Stone:Production"],
                ["Use Wear", "Tag-Global", "Stone:Use-Wear"],
                ["Base Typology", "Lookup", "stone_base_types", "base_type_id"],
            ],
            "Typology" => [
                ["Passive Subtype", "Tag-Global", "Stone:Type-Passive"],
                ["Active Subtype", "Tag-Global", "Stone:Type-Active"],
                ["Vessel Part", "Tag-Global", "Stone:Vessel-Part"],
                ["Vessel Base", "Tag-Global", "Stone:Vessel-Base"],
                ["Vessel Wall", "Tag-Global", "Stone:Vessel-Wall"],
                ["Vessel Rim", "Tag-Global", "Stone:Vessel-Rim"],
                ["Non-Processor Subtype", "Tag-Global", "Stone:Type-Non-Processor"]
            ],
        ],

        "Lithic" => [
            "Basic Characteristics" => [
                ["Preservation", "Lookup", "preservations", "preservation_id"],
                ["Base Typology", "Lookup", "lithic_base_types", "base_type_id"],
            ],
        ],

        "Metal" => [
            "Periods" => [
                ["Periods (Top-Level)", "Tag-Global", "Periods:Top-Level"],
                ["Neolithic Subperiods", "Tag-Global", "Periods:Neolithic"],
                ["Bronze Subperiods", "Tag-Global", "Periods:Bronze"],
                ["Iron Subperiods", "Tag-Global", "Periods:Iron"],
                ["Hellenistic Subperiods", "Tag-Global", "Periods:Hellenistic"],
                ["Roman Subperiods", "Tag-Global", "Periods:Roman"],
                ["Early-Islamic Subperiods", "Tag-Global", "Periods:Early-Islamic"],
                ["Medieval Subperiods", "Tag-Global", "Periods:Medieval"],
                ["Modern Subperiods", "Tag-Global", "Periods:Modern"],

            ],
            "Basic Characteristics" => [
                ["Preservation", "Lookup", "preservations", "preservation_id"],
                ["Base Typology", "Lookup", "metal_base_types", "base_type_id"],
                ["Material", "Lookup", "metal_materials", "material_id"],
            ],
            "Modern Weaponry Partition" => [
                ["Modern-weaponry", "Tag-Global", "Metal:Modern-Weaponry"]
            ]
        ],

        "Fauna" => [
            "Basic Characteristics" => [
                ["Preservation", "Lookup", "preservations", "preservation_id"],
                ["Life Stage", "Tag-Module", "Life-Stage"],
            ],
            "Taxon" => [
                ["Base Taxon", "Lookup", "fauna_taxon_L1", "taxon_L1_id"],
                ["Bird", "Tag-Module", "Bird"],
                ["Mammal", "Tag-Module", "Mammal"],
            ],
            "Element" => [
                ["Element", "Lookup", "fauna_elements_L1", "element_L1_id"],
            ],
            "Bone" => [
                ["Symmetry", "Tag-Module", "Bone-Symmetry"],
                ["Fusion", "Tag-Module", "Bone-Fusion"],
                ["Bone Type", "Tag-Module", "Bone-partition"],
                ["Long Bone", "Tag-Module", "Bone-Long"],
                ["Short Bone", "Tag-Module", "Bone-Short"],
                ["Flat Bone", "Tag-Module", "Bone-Flat"],
                ["Irregular Bone", "Tag-Module", "Bone-Irregular"],
            ],
            "Tooth" => [
                ["Tooth Name", "Tag-Module", "Tooth-Name"],
                ["Tooth Age", "Tag-Module", "Tooth-Age"],
                ["Tooth Wear", "Tag-Module", "Tooth-Wear"],
            ]
        ],

        "Glass" => [
            "Periods" => [
                ["Periods (Top-Level)", "Tag-Global", "Periods:Top-Level"],
                ["Neolithic Subperiods", "Tag-Global", "Periods:Neolithic"],
                ["Bronze Subperiods", "Tag-Global", "Periods:Bronze"],
                ["Iron Subperiods", "Tag-Global", "Periods:Iron"],
                ["Hellenistic Subperiods", "Tag-Global", "Periods:Hellenistic"],
                ["Roman Subperiods", "Tag-Global", "Periods:Roman"],
                ["Early-Islamic Subperiods", "Tag-Global", "Periods:Early-Islamic"],
                ["Medieval Subperiods", "Tag-Global", "Periods:Medieval"],
                ["Modern Subperiods", "Tag-Global", "Periods:Modern"],

            ],
            "Basic Characteristics" => [
                ["Preservation", "Lookup", "preservations", "preservation_id"],
                ["Color", "Tag-Global", "Glass:Color"],
                ["Weathering", "Tag-Global", "Glass:Weathering"],
                ["Weathering-Type", "Tag-Global", "Glass:Weathering-Type"],
                ["Base Typology", "Lookup", "glass_base_types", "base_type_id"],
            ],
            "Typology" => [
                ["Vessel/Lamp Subtype", "Tag-Global", "Glass:Vessel-Subtype"],
            ],
            "Production" => [
                ["Production", "Production", "Tag-Global", "Glass:Production"],
            ],
        ],
    ];

    public static function getCategories(String $name)
    {
        return self::$modules[$name];
    }
}
