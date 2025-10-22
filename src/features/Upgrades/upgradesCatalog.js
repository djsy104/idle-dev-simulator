import KeyboardIcon from '../../assets/keyboard.svg?react';
import CodeIcon from '../../assets/code.svg?react';
import TabIcon from '../../assets/tab.svg?react';
import MonitorIcon from '../../assets/monitor.svg?react';

export const EFFECT_STAT = {
  PER_CLICK: 'perClick',
  PASSIVE: 'passivePointGain',
  GLOBAL_MULT: 'globalMultiplier',
};

export const EFFECT_OP = {
  ADD: 'add', // Add to the stat directly
  MULTIPLY: 'multiply', // Multiply the stat or a subtotal
};

export const UNLOCK_TYPE = {
  ALWAYS: 'always', // Visible from the start
  UPGRADE_LEVEL: 'upgradeLevel', // Visible after an upgrade reaches a certain level
};

export const upgradeCatalog = [
  // ===== Keyboard chain - improves points per click =====
  {
    id: 'pre_owned_keyboard',
    name: 'Pre-owned Keyboard',
    description: 'Barely functional, but it types.',
    baseCost: 20,
    costGrowth: 1.18,
    maxLevel: 1,
    effect: { stat: EFFECT_STAT.PER_CLICK, op: EFFECT_OP.ADD, value: 1 },
    unlock: { type: UNLOCK_TYPE.ALWAYS },
    icon: KeyboardIcon,
    chain: 'keyboard',
    order: 1,
  },
  {
    id: 'mechanical_keyboard',
    name: 'Mechanical Keyboard',
    description: "Don't let the RGB lights distract you.",
    baseCost: 100,
    costGrowth: 1.2,
    maxLevel: 1,
    effect: { stat: EFFECT_STAT.PER_CLICK, op: EFFECT_OP.ADD, value: 2 },
    unlock: {
      type: UNLOCK_TYPE.UPGRADE_LEVEL,
      upgradeId: 'pre_owned_keyboard',
      level: 1,
    },
    icon: KeyboardIcon,
    chain: 'keyboard',
    order: 2,
  },
  {
    id: 'custom_keyboard',
    name: 'Custom Keyboard',
    description: 'The keyboard sounds fill you with determination!',
    baseCost: 250,
    costGrowth: 1,
    maxLevel: 1,
    effect: { stat: EFFECT_STAT.PER_CLICK, op: EFFECT_OP.ADD, value: 4 },
    unlock: {
      type: UNLOCK_TYPE.UPGRADE_LEVEL,
      upgradeId: 'mechanical_keyboard',
      level: 1,
    },
    icon: KeyboardIcon,
    chain: 'keyboard',
    order: 3,
  },
  {
    id: 'two_keyboards',
    name: 'Two Keyboards',
    description: 'You have two hands for a reason.',
    baseCost: 400,
    costGrowth: 1,
    maxLevel: 1,
    effect: { stat: EFFECT_STAT.PER_CLICK, op: EFFECT_OP.ADD, value: 8 },
    unlock: {
      type: UNLOCK_TYPE.UPGRADE_LEVEL,
      upgradeId: 'custom_keyboard',
      level: 1,
    },
    icon: KeyboardIcon,
    chain: 'keyboard',
    order: 4,
  },

  // ===== Monitors chain - improves points per click =====
  {
    id: 'broken_laptop_screen',
    name: 'Broken Monitor Screen',
    description: 'You make it work somehow.',
    baseCost: 30,
    costGrowth: 1,
    maxLevel: 1,
    effect: { stat: EFFECT_STAT.PER_CLICK, op: EFFECT_OP.ADD, value: 1 },
    unlock: { type: UNLOCK_TYPE.ALWAYS },
    icon: MonitorIcon,
    chain: 'monitors',
    order: 1,
  },
  {
    id: 'monitor_60hz',
    name: '60Hz Monitor',
    description: 'Stable refresh, stable output.',
    baseCost: 120,
    costGrowth: 1,
    maxLevel: 1,
    effect: { stat: EFFECT_STAT.PER_CLICK, op: EFFECT_OP.ADD, value: 2 },
    unlock: {
      type: UNLOCK_TYPE.UPGRADE_LEVEL,
      upgradeId: 'broken_laptop_screen',
      level: 1,
    },
    icon: MonitorIcon,
    chain: 'monitors',
    order: 2,
  },
  {
    id: 'monitor_144hz',
    name: '144Hz Curved  Monitor',
    description: "Smooth visuals, smooth coding. Plus it's ergonomic!",
    baseCost: 320,
    costGrowth: 1.22,
    maxLevel: 1,
    effect: { stat: EFFECT_STAT.PER_CLICK, op: EFFECT_OP.ADD, value: 4 },
    unlock: {
      type: UNLOCK_TYPE.UPGRADE_LEVEL,
      upgradeId: 'monitor_60hz',
      level: 1,
    },
    icon: MonitorIcon,
    chain: 'monitors',
    order: 3,
  },
  {
    id: 'dual_monitor',
    name: 'Dual Monitor',
    description: 'Code left, docs right. Productivity spike.',
    baseCost: 700,
    costGrowth: 1,
    maxLevel: 1,
    effect: { stat: EFFECT_STAT.PER_CLICK, op: EFFECT_OP.ADD, value: 8 },
    unlock: {
      type: UNLOCK_TYPE.UPGRADE_LEVEL,
      upgradeId: 'monitor_144hz',
      level: 1,
    },
    icon: MonitorIcon,
    chain: 'monitors',
    order: 4,
  },

  // ===== Tabs chain - improves passive points =====
  {
    id: 'lofi_music_tab',
    name: 'LoFi Music Tab',
    description: 'Relaxing beats to listen to while coding.',
    baseCost: 55,
    costGrowth: 1,
    maxLevel: 1,
    effect: { stat: EFFECT_STAT.PASSIVE, op: EFFECT_OP.ADD, value: 1 },
    unlock: { type: UNLOCK_TYPE.ALWAYS },
    icon: TabIcon,
    chain: 'tabs',
    order: 1,
  },
  {
    id: 'docs_tab',
    name: 'Documentation Tab',
    description: 'Documentation always helps (when it makes sense).',
    baseCost: 170,
    costGrowth: 1,
    maxLevel: 1,
    effect: { stat: EFFECT_STAT.PASSIVE, op: EFFECT_OP.ADD, value: 2 },
    unlock: {
      type: UNLOCK_TYPE.UPGRADE_LEVEL,
      upgradeId: 'lofi_music_tab',
      level: 1,
    },
    icon: TabIcon,
    chain: 'tabs',
    order: 2,
  },
  {
    id: 'reddit_tab',
    name: 'Reddit Tab',
    description: 'Somehow still productive. Mostly.',
    baseCost: 350,
    costGrowth: 1,
    maxLevel: 1,
    effect: { stat: EFFECT_STAT.PASSIVE, op: EFFECT_OP.ADD, value: 3 },
    unlock: {
      type: UNLOCK_TYPE.UPGRADE_LEVEL,
      upgradeId: 'docs_tab',
      level: 1,
    },
    icon: TabIcon,
    chain: 'tabs',
    order: 3,
  },
  {
    id: 'stack_overflow_tab',
    name: 'Stack Overflow Tab',
    description: 'Unlimited questions and answers!',
    baseCost: 800,
    costGrowth: 1,
    maxLevel: 1,
    effect: { stat: EFFECT_STAT.PASSIVE, op: EFFECT_OP.ADD, value: 4 },
    unlock: {
      type: UNLOCK_TYPE.UPGRADE_LEVEL,
      upgradeId: 'reddit_tab',
      level: 1,
    },
    icon: TabIcon,
    chain: 'tabs',
    order: 4,
  },

  // ===== Tools chain - improves passive points =====
  {
    id: 'auto_formatter',
    name: 'Auto Formatter',
    description: 'Keeps your code looking nice!',
    baseCost: 220,
    costGrowth: 1,
    maxLevel: 1,
    effect: { stat: EFFECT_STAT.PASSIVE, op: EFFECT_OP.ADD, value: 5 },
    unlock: { type: UNLOCK_TYPE.ALWAYS },
    icon: CodeIcon,
    chain: 'tools',
    order: 1,
  },
  {
    id: 'build_script',
    name: 'Build Script',
    description: "This isn't scripted, right?",
    baseCost: 650,
    costGrowth: 1,
    maxLevel: 1,
    effect: { stat: EFFECT_STAT.PASSIVE, op: EFFECT_OP.ADD, value: 10 },
    unlock: {
      type: UNLOCK_TYPE.UPGRADE_LEVEL,
      upgradeId: 'auto_formatter',
      level: 1,
    },
    icon: CodeIcon,
    chain: 'tools',
    order: 2,
  },
  {
    id: 'ai_code_assistant',
    name: 'AI Code Assistant',
    description: 'Writes the boring parts while you code the fun parts.',
    baseCost: 1000,
    costGrowth: 1,
    maxLevel: 1,
    effect: { stat: EFFECT_STAT.PASSIVE, op: EFFECT_OP.ADD, value: 20 },
    unlock: {
      type: UNLOCK_TYPE.UPGRADE_LEVEL,
      upgradeId: 'build_script',
      level: 1,
    },
    icon: CodeIcon,
    chain: 'tools',
    order: 3,
  },
];
