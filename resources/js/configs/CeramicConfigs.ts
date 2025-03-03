import type { TModuleConfigs, TFields, TCategorizerFuncs } from '../types/moduleTypes'
import { CommonConfigs } from './common/CommonConfigs'

export abstract class CeramicConfigs {
  private static categorizerFuncs: TCategorizerFuncs = (fields?: TFields) => {
    const d = fields as TFields<'Ceramic'>
    return {
      'Registration Scope': d.artifact_no === 0 ? 0 : 1,
      'Includes Date': d.date_retrieved === null ? 1 : 0,
    }
  }

  public static getConfigs(): TModuleConfigs {
    return { ...CommonConfigs.getConfigs(), ...CeramicConfigs.categorizerFuncs } as const
  }
}
