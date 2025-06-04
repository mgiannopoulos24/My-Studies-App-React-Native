module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel"
    ],

    plugins: [
      [
        '@tamagui/babel-plugin',
        {
          components: ['tamagui'],
          config: './tamagui.config.ts',
        },
      ],
      ["module-resolver", {
        root: ["./"],
        alias: {
          "@": "./src", // Changed from "./" to "./src"
          "tailwind.config": "./tailwind.config.ts"
        }
      }]
    ]
  };
};