type TMetal = {
  url_name: 'metals'
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
    measurements: string
    material_id: number
    primary_classification_id: number
    specialist: string
  }
}

export { TMetal }
