const markdownIt = require("markdown-it");
const md = markdownIt({ html: true, breaks: true });

module.exports = function(eleventyConfig) {
  // Markdown filter for rendering markdown content
  eleventyConfig.addFilter("markdown", (content) => {
    if (!content) return '';
    return md.render(content);
  });

  // Pass through static assets
  eleventyConfig.addPassthroughCopy("styles.css");
  eleventyConfig.addPassthroughCopy("script.js");
  eleventyConfig.addPassthroughCopy("footer.js");
  eleventyConfig.addPassthroughCopy("newsletter-popup.js");
  eleventyConfig.addPassthroughCopy("contact-form-handler.js");
  eleventyConfig.addPassthroughCopy("logo.png");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("src/admin/*.yml");

  // Events collection - all events sorted by date
  eleventyConfig.addCollection("events", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/events/*.md").sort((a, b) => {
      return new Date(a.data.date) - new Date(b.data.date);
    });
  });

  // Upcoming events - events with date >= today
  eleventyConfig.addCollection("upcomingEvents", function(collectionApi) {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return collectionApi.getFilteredByGlob("src/events/*.md")
      .filter(event => new Date(event.data.date) >= now)
      .sort((a, b) => new Date(a.data.date) - new Date(b.data.date));
  });

  // Past events - events with date < today
  eleventyConfig.addCollection("pastEvents", function(collectionApi) {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return collectionApi.getFilteredByGlob("src/events/*.md")
      .filter(event => new Date(event.data.date) < now)
      .sort((a, b) => new Date(b.data.date) - new Date(a.data.date)); // newest first
  });

  // Date formatting filter
  eleventyConfig.addFilter("dateFormat", (date, format) => {
    const d = new Date(date);
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return d.toLocaleDateString('en-US', options);
  });

  // Short date filter (e.g., "January 21, 2026")
  eleventyConfig.addFilter("shortDate", (date) => {
    const d = new Date(date);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return d.toLocaleDateString('en-US', options);
  });

  // Month abbreviation (e.g., "JAN")
  eleventyConfig.addFilter("monthAbbr", (date) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
  });

  // Day number (e.g., "21")
  eleventyConfig.addFilter("dayNum", (date) => {
    const d = new Date(date);
    return d.getDate();
  });

  // Year (e.g., "2026")
  eleventyConfig.addFilter("year", (date) => {
    const d = new Date(date);
    return d.getFullYear();
  });

  // Truncate text
  eleventyConfig.addFilter("truncate", (str, length) => {
    if (!str) return '';
    if (str.length <= length) return str;
    return str.substring(0, length).trim() + '...';
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["njk", "html", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
