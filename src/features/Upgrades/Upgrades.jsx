import { useEffect, useMemo, useState } from 'react';
import { upgradeCatalog, UNLOCK_TYPE } from './upgradesCatalog';
import UpgradeCard from './UpgradeCard';
import styles from './Upgrades.module.css';

function Upgrades({ codePoints, levels, onUpgrade }) {
  const nextUpgrades = useMemo(() => {
    const chains = {};

    for (const upgrade of upgradeCatalog) {
      if (!chains[upgrade.chain]) chains[upgrade.chain] = [];
      chains[upgrade.chain].push(upgrade);
    }

    // Sort and pick next unlockable upgrade in each chain
    return Object.entries(chains).map(([chain, list]) => {
      const sorted = [...list].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
      const next = sorted.find((u) => {
        const level = levels[u.id] ?? 0;
        const unlocked =
          u.unlock.type === UNLOCK_TYPE.ALWAYS ||
          levels[u.unlock.upgradeId] >= u.unlock.level;
        return level < (u.maxLevel ?? 1) && unlocked;
      });
      return { chain, next };
    });
  }, [levels]);

  return (
    <div className={styles.upgradesContainer}>
      {nextUpgrades
        .filter(({ next }) => !!next)
        .map(({ chain, next }) => (
          <UpgradeCard
            key={chain}
            title={next.name}
            description={next.description}
            icon={next.icon}
            cost={next.baseCost}
            canAfford={codePoints >= next.baseCost}
            onBuy={() => onUpgrade(next)}
          />
        ))}
    </div>
  );
}

export default Upgrades;
