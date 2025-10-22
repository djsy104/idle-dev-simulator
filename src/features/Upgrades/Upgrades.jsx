import { useMemo } from 'react';
import { upgradeCatalog, UNLOCK_TYPE } from './upgradesCatalog';
import { getCost } from './upgradesUtility';
import UpgradeCard from './UpgradeCard';
import styles from './Upgrades.module.css';

function Upgrades({ codePoints, levels, onUpgrade }) {
  // Group upgrades by chain and sort each chain once
  const groupedChains = useMemo(() => {
    const byChain = new Map();

    // Group upgrades by chain and sort each chain by order
    for (const upgrade of upgradeCatalog) {
      if (!byChain.has(upgrade.chain)) byChain.set(upgrade.chain, []);
      byChain.get(upgrade.chain).push(upgrade);
    }

    // Ensure deterministic upgrade order inside each chain.
    for (const list of byChain.values()) {
      list.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    }
    return byChain;
  }, []);

  // Find the next upgrade in each chain that can be unlocked
  const nextUpgrades = useMemo(() => {
    const results = [];
    for (const [chain, list] of groupedChains.entries()) {
      // Find first upgrade that is both unlocked and below max level.
      const next = list.find((upgrade) => {
        const level = levels[upgrade.id] ?? 0;
        const unlocked =
          upgrade.unlock?.type === UNLOCK_TYPE.ALWAYS ||
          (upgrade.unlock &&
            (levels[upgrade.unlock.upgradeId] ?? 0) >= upgrade.unlock.level);
        const underCap = level < (upgrade.maxLevel ?? 1);
        return unlocked && underCap;
      });
      if (next) results.push({ chain, next });
    }
    return results;
  }, [groupedChains, levels]);

  return (
    <div className={styles.upgradesContainer}>
      {nextUpgrades.map(({ chain, next }) => {
        const cost = getCost(next.id, levels);
        const canAfford = codePoints >= cost;

        return (
          <UpgradeCard
            key={chain}
            title={next.name}
            description={next.description}
            icon={next.icon}
            cost={cost}
            canAfford={canAfford}
            onBuy={() => onUpgrade(next)}
          />
        );
      })}
    </div>
  );
}

export default Upgrades;
