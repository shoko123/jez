import type { TModuleInfo } from '@/types/moduleTypes'

type TMetal<T extends TModuleInfo = TModuleInfo> = {
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
  apiTabularPageFields: Pick<
    TMetal<T>['fields'],
    | 'id'
    | 'date_retrieved'
    | 'field_description'
    | 'specialist_description'
    | 'primary_classification_id'
    | 'material_id'
  >
}

export { TMetal }
