import type { TModuleConfigs } from '../types/moduleTypes'
import { CommonConfigs } from './common/CommonConfigs'

export abstract class MetalConfigs {
  private static categorizerFuncs() {
    return {}
  }

  private static mayDelete() {
    return { mayDelete: true }
  }

  public static getConfigs(): TModuleConfigs {
    const configs = CommonConfigs.getCommonConfigs()
    configs['categorizerFuncs'] = MetalConfigs.categorizerFuncs
    configs['mayDelete'] = MetalConfigs.mayDelete
    return configs as Readonly<TModuleConfigs>
  }
}
