import styles from './ClickerButton.module.css';

function ClickerButton({ onClick, icon: Icon, codePoints }) {
  return (
    <section className={styles.clickerContainer}>
      <Icon className={styles.clickerIcon} onClick={onClick} alt="Click icon" />
      <h3 className={styles.codePointsText}>{codePoints}</h3>
    </section>
  );
}

export default ClickerButton;
