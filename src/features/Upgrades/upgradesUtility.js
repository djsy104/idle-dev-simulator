import { upgradeCatalog, UNLOCK_TYPE } from './upgradesCatalog';

export const byId = new Map(upgradeCatalog.map((u) => [u.id, u]));

export function isUnlocked(id, levels) {
  const u = byId.get(id);
  const rule = u.unlock;
  if (rule.type === 'always') return true;
  if (rule.type === 'upgradeLevel') {
    return levels[rule.upgradeId] >= rule.level;
  }
  return false;
}

export function getCost(id) {
  const u = byId.get(id);
  return u.baseCost; // single purchase upgrades
}

export function deriveStats(levels) {
  let perClick = 1;
  let passivePointGain = 0;
  for (const [id, lvl] of Object.entries(levels)) {
    if (!lvl) continue;
    const u = byId.get(id);
    const { stat, op, value } = u.effect;
    const amount = op === 'multiply' ? Math.pow(value, lvl) : value * lvl;
    if (stat === 'perClick') {
      if (op === 'multiply') perClick *= amount;
      else perClick += amount;
    } else if (stat === 'passivePointGain') {
      if (op === 'multiply') passivePointGain *= amount;
      else passivePointGain += amount;
    }
  }
  return { perClick, passivePointGain };
}
