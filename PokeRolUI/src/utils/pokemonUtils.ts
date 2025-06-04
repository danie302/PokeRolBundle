import { useMemo } from 'react'
import { Stats } from '../types/pokemon'

interface UsePokemonStatsProps {
  stats: Stats;
  level: number;
  evs: Stats;
  ivs: Stats;
}

export const usePokemonStats = ({ stats, level, evs, ivs }: UsePokemonStatsProps) => {


  const calculateStat = (baseStat: number, level: number, iv: number, ev: number) => {
    return Math.floor((2 * baseStat + iv + Math.floor(ev / 4)) * level / 100) + 5
  }

  const calculateHpStat = (baseStat: number, level: number, iv: number, ev: number) => {
    return Math.floor((2 * baseStat + iv + Math.floor(ev / 4)) * level / 100) + level + 10
  }

  const customStats = useMemo(() => {
    const hpBase = calculateHpStat(stats.hp, level, ivs.hp, evs.hp)
    const attackBase = calculateStat(stats.attack, level, ivs.attack, evs.attack)
    const specialAttackBase = calculateStat(stats.specialAttack, level, ivs.attack, evs.attack)
    const defenseBase = calculateStat(stats.defense, level, ivs.defense, evs.defense)
    const specialDefenseBase = calculateStat(stats.specialDefense, level, ivs.defense, evs.defense)
    const speedBase = calculateStat(stats.speed, level, ivs.speed, evs.speed)
    
    return {
      hp: Math.round(hpBase / 10),
      attack: Math.round(attackBase / 10),
      defense: Math.round(defenseBase / 10),
      specialAttack: Math.round(specialAttackBase / 10),
      specialDefense: Math.round(specialDefenseBase / 10),
      speed: Math.round(speedBase / 10)
    }
  }, [stats, level, evs, ivs])

  return {
    customStats,
    calculateStat,
    calculateHpStat
  }
} 