import type { TModuleConfigs, TFields } from '../types/moduleTypes'
import { CommonConfigs } from './common/CommonConfigs'

export abstract class FaunaConfigs {
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
    configs['categorizerFuncs'] = FaunaConfigs.categorizerFuncs
    configs['mayDelete'] = FaunaConfigs.mayDelete
    return configs as Readonly<TModuleConfigs>
  }
}
