import { extendTheme } from "@chakra-ui/react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const menuItemStyle = {
  borderRadius: "4px",
  backgroundColor: "#E6F0FF",
};

export const menuListStyle: React.CSSProperties = {
  minWidth: "8rem",
  padding: "5px",
  fontSize: "12px",
  color: "black",
  maxHeight: "20vh",
  overflowY: "auto",
};

const breakpoints = {
  sm: "320px",
  md: "768px",
  lg: "960px",
  xl: "1200px",
  "2xl": "1536px",
};

export const popoverContentFocusStyle = {
  border: "1px solid #E9E9E9",
  outline: "0px",
};

const theme = extendTheme({
  breakpoints,
  styles: {
    global: {
      body: {
        ...inter.style,
        color: "#171717",
        fontSize: "12px",
      },
    },
  },
  fontSizes: {
    xs: "11px",
    sm: "12px",
    reg: "14px",
    md: "16px",
    lg: "18px",
    icon: "20px",
    xl: "24px",
  },
  components: {
    FormLabel: {
      baseStyle: {
        fontSize: "12px",
      },
    },
    Text: {
      baseStyle: {
        fontSize: "12px",
      },
    },
    Menu: {
      baseStyle: {
        list: {
          minWidth: "8rem",
          padding: "5px",
          fontSize: "12px",
          color: "black",
          maxHeight: "20vh",
          overflowY: "auto",
        },
      },
    },
    Select: {
      variants: {
        outline: {
          field: {
            bg: "white",
          },
        },
      },
      defaultProps: {
        size: "sm",
      },
    },
    Switch: {
      defaultProps: {
        size: "md",
      },
    },
    Input: {
      variants: {
        outline: {
          field: {
            bg: "white",
            _disabled: {
              opacity: 1,
              bg: "hsl(0, 0%, 95%)",
            },
          },
        },
      },
      sizes: {
        sm: {
          borderRadius: "4px",
          px: "13px",
        },
      },
      defaultProps: {
        size: "sm",
      },
    },
    Button: {
      baseStyle: {
        lineHeight: "0px",
      },
      variants: {
        outline: {
          bg: "white",
          borderRadius: "4px",
          padding: "8px 12px",
        },
        solid: {
          borderRadius: "4px",
          padding: "8px 12px",
        },
      },
      defaultProps: {
        variant: "solid",
        size: "md",
      },
    },
    Popover: {
      baseStyle: {
        content: {
          boxShadow:
            "0px 0px 6px -2px rgba(0, 0, 0, 0.12), 0px 8px 24px -4px rgba(0, 0, 0, 0.08)",
          border: "1px solid #E9E9E9",
        },
        _focus: {
          boxShadow: "0px",
        },
      },
    },
  },
});

export default theme;
