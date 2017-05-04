const DEFAULTS = {
  modes: {
    pomodoro: {
      id: 'pomodoro',
      name: 'Pomodoro',
      initial: 1500000,
    },
    breakShort: {
      id: 'breakShort',
      name: 'Short',
      initial: 300000,
    },
    breakLong: {
      id: 'breakLong',
      name: 'Long',
      initial: 900000,
    },
  },
  sequence: [
    'pomodoro',
    'breakShort',
    'pomodoro',
    'breakShort',
    'pomodoro',
    'breakShort',
    'pomodoro',
    'breakLong',
  ],
};

export default DEFAULTS;
