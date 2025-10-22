import {
  upgradeCatalog,
  EFFECT_STAT,
  EFFECT_OP,
  UNLOCK_TYPE,
} from './upgradesCatalog';

// Map of upgrade id's to upgrade object.
export const byId = new Map(upgradeCatalog.map((u) => [u.id, u]));

// Defensive getter that throws a clear error when the id is unknown.
function requireUpgrade(id) {
  const upgrade = byId.get(id);
  if (!upgrade) {
    throw new Error(`Unknown upgrade id: "${id}"`);
  }
  return upgrade;
}

// Check whether an upgrade is unlocked, given current upgrade levels.
export function isUnlocked(id, levels) {
  const upgrade = requireUpgrade(id);
  const rule = upgrade.unlock;

  switch (rule.type) {
    // Always visible/unlocked
    case UNLOCK_TYPE.ALWAYS:
      return true;

    // Check if the prerequisite upgrade's level meets the requirement
    case UNLOCK_TYPE.UPGRADE_LEVEL: {
      const current = levels[rule.upgradeId] || 0;
      return current >= rule.level;
    }

    // Any unknown unlock rule type defaults to locked
    default:
      return false;
  }
}

// Compute the cost of purchasing the next level of an upgrade.
export function getCost(id) {
  const upgrade = requireUpgrade(id);
  return upgrade.baseCost;
}

export function deriveStats(levels) {
  let perClick = 1;
  let passivePointGain = 0;
  for (const [id, lvl] of Object.entries(levels)) {
    if (!lvl) continue;
    const upgrade = byId.get(id);
    const { stat, op, value } = upgrade.effect;
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
