import type { TModuleConfigs, TModule } from '../types/moduleTypes'

import { SurveyConfigs } from './modules/SurveyConfigs'
import { AreaConfigs } from './modules/AreaConfigs'
import { SeasonConfigs } from './modules/SeasonConfigs'
import { LocusConfigs } from './modules/LocusConfigs'
import { CeramicConfigs } from './modules/CeramicConfigs'
import { FaunaConfigs } from './modules/FaunaConfigs'
import { GlassConfigs } from './modules/GlassConfigs'
import { LithicConfigs } from './modules/LithicConfigs'
import { MetalConfigs } from './modules/MetalConfigs'
import { StoneConfigs } from './modules/StoneConfigs'

export class ModuleConfigs {
  static getConfigs(module: TModule): TModuleConfigs {
    switch (module) {
      case 'Survey':
        return SurveyConfigs

      case 'Season':
        return SeasonConfigs

      case 'Area':
        return AreaConfigs

      case 'Locus':
        return LocusConfigs

      case 'Ceramic':
        return CeramicConfigs

      case 'Fauna':
        return FaunaConfigs

      case 'Glass':
        return GlassConfigs

      case 'Lithic':
        return LithicConfigs

      case 'Metal':
        return MetalConfigs

      case 'Stone':
      default:
        return StoneConfigs
    }
  }
}
