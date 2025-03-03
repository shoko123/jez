import type { TModuleConfigs, TFields } from '../types/moduleTypes'
import { CommonConfigs } from './common/CommonConfigs'

export abstract class CeramicConfigs {
  public static getConfigs(): TModuleConfigs {
    const common = CommonConfigs.getConfigs()

    common.categorizerFuncs = (fields) => {
      const d = fields as TFields<'Ceramic'>
      return {
        'Registration Scope': d.artifact_no === 0 ? 0 : 1,
        'Includes Date': d.date_retrieved === null ? 1 : 0,
      }
    }
    return common
  }
}
