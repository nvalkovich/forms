module.exports = {
  overrides: [
    {
      files: [
        "client/src/**/*.{js,mjs,cjs,ts,jsx,tsx}",
        "server/src/**/*.{js,mjs,cjs,ts,jsx,tsx}",
      ],
      options: {
        singleQuote: true,
        trailingComma: "all",
        tabWidth: 4,
        semi: true,
        printWidth: 80,
      },
    },
  ],
};
