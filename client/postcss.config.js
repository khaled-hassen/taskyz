const purgecss = require("@fullhuman/postcss-purgecss");
const cssnano = require("cssnano");

module.exports = {
  plugins: [
    require("tailwindcss"),
    require("autoprefixer"),
    cssnano({ preset: "default" }),
    purgecss({
      content: ["./public/**/*.html", "./src/**/*.jsx", "./src/**/*.tsx"],
      safelist: {
        standard: [/fade-.*/, /fade-zoom-.*/, "slide-up-animation", /^::/],
      },
      defaultExtractor: (content) => content.match(/[\w-:./]+(?<!:)/g) || [],
    }),
  ],
};
