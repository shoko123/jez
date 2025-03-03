import type { TModuleConfigs, TFields } from '../types/moduleTypes'
import { CommonConfigs } from './common/CommonConfigs'

export abstract class LithicConfigs {
  public static getConfigs(): TModuleConfigs {
    const common = CommonConfigs.getConfigs()

    common.categorizerFuncs = (fields) => {
      const d = fields as TFields<'Lithic'>
      return {
        'Registration Scope': d.artifact_no === 0 ? 0 : 1,
      }
    }
    return common
  }
}
