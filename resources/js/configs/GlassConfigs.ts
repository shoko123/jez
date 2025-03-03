import type { TModuleConfigs, TCategorizerFuncs } from '../types/moduleTypes'
import { CommonConfigs } from './common/CommonConfigs'

export abstract class GlassConfigs {
  private static categorizerFuncs: TCategorizerFuncs = () => {
    return {}
  }

  public static getConfigs(): TModuleConfigs {
    return { ...CommonConfigs.getConfigs(), ...GlassConfigs.categorizerFuncs } as const
  }
}
