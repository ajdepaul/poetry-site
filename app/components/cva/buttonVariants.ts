/* separate from button file so that buttonVariants can be used either on the server or the client */

import { cva } from "class-variance-authority";

const buttonVariants = cva(
  'p-2 rounded active:scale-95 shadow-md text-center border-2',
  {
    variants: {
      bgColor: {
        green: 'bg-theme-green border-theme-green',
        'dark-green': 'bg-theme-dark-green border-theme-dark-green',
        brown: 'bg-theme-brown border-theme-brown',
        'dark-brown': 'bg-theme-dark-brown border-theme-dark-brown',
        red: 'bg-theme-red border-theme-red'
      },
      pending: {
        false: '',
        true: 'opacity-50',
      }
    },
    compoundVariants: [
      {
        bgColor: 'green',
        pending: false,
        class: 'hover:bg-theme-light-green hover:border-theme-light-green'
      },
      {
        bgColor: 'dark-green',
        pending: false,
        class: 'hover:bg-theme-green hover:border-theme-green'
      },
      {
        bgColor: 'brown',
        pending: false,
        class: 'hover:bg-theme-light-brown hover:border-theme-light-brown'
      },
      {
        bgColor: 'dark-brown',
        pending: false,
        class: 'hover:bg-theme-brown hover:border-theme-brown'
      },
      {
        bgColor: 'red',
        pending: false,
        class: 'hover:bg-theme-light-red hover:border-theme-light-red'
      },
    ],
    defaultVariants: {
      bgColor: 'dark-green',
      pending: false
    }
  }
);

export default buttonVariants;
