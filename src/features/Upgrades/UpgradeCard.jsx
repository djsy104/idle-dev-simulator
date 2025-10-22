import { memo } from 'react';
import styles from './UpgradeCard.module.css';

function UpgradeCard({ title, description, icon, cost, canAfford, onBuy }) {
  const Icon = icon;

  return (
    <div className={styles.upgradeCard}>
      {/* Title */}
      <div className={styles.upgradeCardTitle}>{title}</div>

      {/* Icon */}
      {Icon && (
        <div className={styles.upgradeCardIcon}>
          <Icon />
        </div>
      )}

      {/* Description */}
      <div className={styles.upgradeCardDescription}>
        <p>{description}</p>
      </div>

      <div className={styles.upgradeCardBar}></div>

      {/* Cost and button */}
      <footer className={styles.upgradeCardActions}>
        <div className={styles.upgradeCardMeta}>
          <span className={styles.upgradeCardCost}>Cost: {cost}</span>
        </div>
        <button
          className={styles.upgradeCardButton}
          type="button"
          disabled={!canAfford}
          onClick={onBuy}
        >
          {canAfford ? 'Buy' : 'Locked'}
        </button>
      </footer>
    </div>
  );
}

export default memo(UpgradeCard);
