<?php

namespace App\JezStatic;

class ModuleGroupOrder
{
    private static $modules = [
        "Locus" => [
            "Square and Type" => [
                ["Squares", "Tag-Module", "Square"],
                ["Locus Type", "Tag-Module", "Locus Type"],
            ],
        ],

        "Pottery" => [
            "Periods/Groups" => [
                ["Periods (Top-Level)", "Tag-Global", "Periods:Top-Level"],
                ["Neolithic Subperiods", "Tag-Global", "Periods:Neolithic"],
                ["Neolithic-Bronze Groups", "Tag-Module", "Named-Groups-I"],
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
                ["Ware Coarseness", "Tag-Module", "Ware-Coarseness"],
                ["Ware Color", "Tag-Module", "Ware-Color"],
                ["Ware Temper", "Tag-Module", "Ware-Temper"],
                ["Grit Color", "Tag-Module", "Ware-Grit-Color"],
            ],
            "Basic Characteristics" => [
                ["Preservation", "Lookup", "preservations", "preservation_id"],
                ["Life Stage", "Tag-Module", "Life-Stage"],
                ["Production", "Tag-Module", "Production"],
            ],
            "Typology" => [
                ["Base Partition", "Lookup", "pottery_base_types", "base_type_id"],
                ["Vessel/Lid Part", "Tag-Module", "Vessel-Part"],
                ["Base", "Tag-Module", "Vessel-Base-Type"],
                ["Foot", "Tag-Module", "Foot-Type"],
                ["Rim", "Tag-Module", "Rim-Type"],
                ["Handle", "Tag-Module", "Handle"],
                ["Vessel Shape Typology", "Tag-Module", "Vessel-Shape-Types"],
                ["Ceramic Artifact Typology", "Tag-Module", "Ceramic-Artifact"],
                ["Architectural/Installation Typology", "Tag-Module", "Architectural"],
            ],
            "Surface-Treatment" => [
                ["Surface", "Tag-Module", "STF"],
                ["Slip Color", "Tag-Module", "STF-Slip-Color"],
                ["Paint Color", "Tag-Module", "STF-Paint-Color"],
                ["Paint/Slip Pattern", "Tag-Module", "STF-Paint-Slip-Pattern"],
                ["Reductive/Additive", "Tag-Module", "STRA"],
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
                ["Life Stage", "Tag-Module", "Life-Stage"],
                ["Morphology", "Tag-Module", "Morphology"],
                ["Profile", "Tag-Module", "Profile"],
                ["Production", "Tag-Module", "Production"],
                ["Use Wear", "Tag-Module", "Use-Wear"],
                ["Base Typology", "Lookup", "stone_base_types", "base_type_id"],
            ],
            "Typology" => [
                ["Passive Subtype", "Tag-Module", "Type-Passive"],
                ["Active Subtype", "Tag-Module", "Type-Active"],
                ["Vessel Part", "Tag-Module", "Vessel-Part"],
                ["Vessel Base", "Tag-Module", "Vessel-Base"],
                ["Vessel Wall", "Tag-Module", "Vessel-Wall"],
                ["Vessel Rim", "Tag-Module", "Vessel-Rim"],
                ["Non-Processor Subtype", "Tag-Module", "Type-Non-Processor"]
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
                ["Modern-weaponry", "Tag-Module", "Modern-Weaponry"]
            ]
        ],


        "Fauna" => [       
            "Basic Characteristics" => [
                ["Preservation", "Lookup", "preservations", "preservation_id"],
                ["Life Stage", "Tag-Module", "Life-Stage"],
                ["Symmetry", "Tag-Module", "Symmetry"],
                ["Weathering (Behrensmeyer 1978)", "Tag-Module", "Weathering"],                
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
                ["Fusion", "Tag-Module", "Fusion"],
                ["Breakage", "Tag-Module", "Breakage"],
                ["D&R (Grant 1982)", "Tag-Module", "D&R"],
                ["Bone Name", "Tag-Module", "Bone-Name"],
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
                ["Color", "Tag-Module", "Color"],
                ["Weathering", "Tag-Module", "Weathering"],
                ["Weathering-Type", "Tag-Module", "Weathering-Type"],
                ["Base Typology", "Lookup", "glass_base_types", "base_type_id"],
            ],
            "Typology" => [
                ["Vessel/Lamp Subtype", "Tag-Module", "Vessel-Subtype"],
            ],
            "Production" => [
                ["Production", "Tag-Module", "Production"],
            ],
        ],
    ];

    public static function getCategories(String $name)
    {
        return self::$modules[$name];
    }
}
