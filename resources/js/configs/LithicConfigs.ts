import type { TModuleConfigs, TFields, TCategorizerFuncs } from '../types/moduleTypes'
import { CommonConfigs } from './common/CommonConfigs'

export abstract class LithicConfigs {
  private static categorizerFuncs: TCategorizerFuncs = (fields?: TFields) => {
    const d = fields as TFields<'Ceramic'>
    return {
      'Registration Scope': d.artifact_no === 0 ? 0 : 1,
    }
  }

  public static getConfigs(): TModuleConfigs {
    return { ...CommonConfigs.getConfigs(), ...LithicConfigs.categorizerFuncs } as const
  }
}
