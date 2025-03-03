import type { TModuleConfigs, TFields, TCategorizerFuncs } from '../types/moduleTypes'
import { CommonConfigs } from './common/CommonConfigs'

export abstract class FaunaConfigs {
  private static categorizerFuncs: TCategorizerFuncs = (fields?: TFields) => {
    const d = fields as TFields<'Ceramic'>
    return {
      'Registration Scope': d.artifact_no === 0 ? 0 : 1,
    }
  }

  public static getConfigs(): TModuleConfigs {
    return { ...CommonConfigs.getConfigs(), ...FaunaConfigs.categorizerFuncs } as const
  }
}
