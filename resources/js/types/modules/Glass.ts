type TGlass = {
  url_name: 'glass'
  fields: {
    id: string
    locus_id: string
    code: string
    basket_no: number
    artifact_no: number
    date_retrieved: Date | string | null
    field_description: string
    square: string
    level_top: string
    level_bottom: string
    //
    specialist_description: string

    rim_diameter: number
    base_diameter: number
    bangle_diameter: number
    bead_diameter: number
    pontil_diameter: number

    primary_classification_id: number
  }
  apiTabularPageFields: 'id' | 'specialist_description'
}

export { TGlass }
