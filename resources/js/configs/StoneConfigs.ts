import type { TModuleConfigs, TCategorizerFuncs } from '../types/moduleTypes'
import { CommonConfigs } from './common/CommonConfigs'

export abstract class StoneConfigs {
  private static categorizerFuncs: TCategorizerFuncs = () => {
    return {}
  }

  public static getConfigs(): TModuleConfigs {
    return { ...CommonConfigs.getConfigs(), ...StoneConfigs.categorizerFuncs } as const
  }
}
