module.exports = function (eleventyConfig) {
  eleventyConfig.addGlobalData("buildYear", () => new Date().getFullYear());

  eleventyConfig.addPassthroughCopy({
    "src/css": "css",
    "src/js": "js",
    "src/assets": "assets",
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
    },
    htmlTemplateEngine: "njk",
  };
};
