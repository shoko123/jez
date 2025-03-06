import type { TModuleConfigs } from '../types/moduleTypes'
import { CommonConfigs } from './common/CommonConfigs'

export abstract class StoneConfigs {
  private static categorizerFuncs() {
    return {}
  }

  private static mayDelete() {
    return { mayDelete: true }
  }

  public static getConfigs(): TModuleConfigs {
    const configs = CommonConfigs.getCommonConfigs()
    configs['categorizerFuncs'] = StoneConfigs.categorizerFuncs
    configs['mayDelete'] = StoneConfigs.mayDelete
    return configs as Readonly<TModuleConfigs>
  }
}
