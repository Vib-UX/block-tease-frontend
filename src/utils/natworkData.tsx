import {
  avalancheIcon,
  ethereumIcon,
  meticIcon,
  moonbeamIcon,
  morphIcon,
  polygonIcon,
  zksyncIcon,
  cardonaIcon,
} from '~/NetworkIcon';

export const coinData = [
  {
    name: 'avalanche',
    icon: avalancheIcon,
    isSupported: false,
  },
  {
    name: 'Ethereum',
    icon: ethereumIcon,
    isSupported: true,
  },
  {
    name: 'Moonbeam',
    icon: moonbeamIcon,
    isSupported: true,
  },
  {
    name: 'Cardona',
    icon: cardonaIcon,
    isSupported: true,
  },

  {
    name: 'metis',
    icon: meticIcon,
    isSupported: true,
  },
  {
    name: 'ZkSync',
    icon: zksyncIcon,
    isSupported: true,
  },
  {
    name: 'Morph',
    icon: morphIcon,
    isSupported: false,
  },
  {
    name: 'Amoy',
    icon: polygonIcon,
    isSupported: false,
  },
];
