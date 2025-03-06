import type { TModuleConfigs, TFields } from '../types/moduleTypes'
import { CommonConfigs } from './common/CommonConfigs'

export abstract class LithicConfigs {
  private static categorizerFuncs(fields?: TFields) {
    const d = fields as TFields<'Ceramic'>
    return {
      'Registration Scope': d.artifact_no === 0 ? 0 : 1,
    }
  }

  private static mayDelete() {
    return { mayDelete: true }
  }

  public static getConfigs(): TModuleConfigs {
    const configs = CommonConfigs.getCommonConfigs()
    configs['categorizerFuncs'] = LithicConfigs.categorizerFuncs
    configs['mayDelete'] = LithicConfigs.mayDelete
    return configs as Readonly<TModuleConfigs>
  }
}
