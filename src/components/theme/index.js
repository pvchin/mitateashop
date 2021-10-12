import { extendTheme, withDefaultColorScheme, withDefaultVariant } from "@chakra-ui/react";

// const config = {
//   initialColorMode: "light",
//   useSystemColorMode: false,
// };

//export const theme = extendTheme({ config });

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        color: "olive.800",
        backgroundColor: "olive.100",
        lightbackgroundColor: "olive.50",
      },
    },
  },
  fonts: {
    body: "Lato, sans-serif",
    heading: "Forum, sans-serif",
    mono: "Menlo, monospace",
  },
  colors: {
    olive: {
      50: "#eff5e9",
      100: "#d5ddd3",
      200: "#bbc5b9",
      300: "#a1ad9e",
      400: "#879684",
      500: "#6e7c6a",
      600: "#556152",
      700: "#3c4539",
      800: "#222a21",
      900: "#051005",
    },
  },
  // withDefaultColorScheme({ colorScheme: "olive", components: ['Checkbox'] }),
  // withDefaultVariant({ variant: "filled", components:['Input', 'Select']})
});
