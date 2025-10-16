import clickSound from '../../assets/Sound Effects - Single keyboard type [FREE].mp3';
import upgradeSound from '../../assets/upgrade.mp3';

export const SFX_CONFIG = {
  click: {
    src: [clickSound],
    volume: 0.3,
    preload: true,
  },

  upgrade: {
    src: [upgradeSound],
    volume: 0.4,
    preload: true,
  },
};
