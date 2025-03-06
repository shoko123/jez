import type { TModuleConfigs } from '../types/moduleTypes'
import { CommonConfigs } from './common/CommonConfigs'

export abstract class GlassConfigs {
  private static categorizerFuncs() {
    return {}
  }

  private static mayDelete() {
    return { mayDelete: true }
  }

  public static getConfigs(): TModuleConfigs {
    const configs = CommonConfigs.getCommonConfigs()
    configs['categorizerFuncs'] = GlassConfigs.categorizerFuncs
    configs['mayDelete'] = GlassConfigs.mayDelete
    return configs as Readonly<TModuleConfigs>
  }
}
