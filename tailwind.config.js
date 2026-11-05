tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      colors: {
        body: "var(--bg-body)",
        surface: "var(--bg-surface)",
        main: "var(--text-main)",
        muted: "var(--text-muted)",
        subtle: "var(--border-subtle)",
        accent: "var(--accent)",
        "accent-contrast": "var(--accent-contrast)",
        badge: "var(--badge-bg)",
      },
    },
  },
};
