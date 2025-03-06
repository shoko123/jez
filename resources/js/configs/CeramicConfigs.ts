import type { TModuleConfigs, TFields } from '../types/moduleTypes'
import { CommonConfigs } from './common/CommonConfigs'

export abstract class CeramicConfigs {
  private static categorizerFuncs(fields?: TFields) {
    const d = fields as TFields<'Ceramic'>
    return {
      'Registration Scope': d.artifact_no === 0 ? 0 : 1,
      'Includes Date': d.date_retrieved === null ? 1 : 0,
    }
  }

  private static mayDelete() {
    return { mayDelete: true }
  }

  public static getConfigs(): TModuleConfigs {
    const configs = CommonConfigs.getCommonConfigs()
    configs['categorizerFuncs'] = CeramicConfigs.categorizerFuncs
    configs['mayDelete'] = CeramicConfigs.mayDelete
    return configs as Readonly<TModuleConfigs>
  }
}
