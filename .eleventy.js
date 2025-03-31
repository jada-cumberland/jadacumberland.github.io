const {DateTime} = require('luxon');

module.exports = function(eleventyConfig) {
    // Ignore .gitignore
    eleventyConfig.setUseGitIgnore(false);

    // Date config
    eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
    eleventyConfig.addFilter("postDate", (dateObj) => {
        return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
    });
    eleventyConfig.addFilter("sortDate", (dateObj) => {
        return DateTime.fromJSDate(dateObj).toISODate();
    })

    // Category filter config
    eleventyConfig.addFilter('categoryFilter', function(collection, category) {
        if (!category) return collection;
        return collection.filter(item => item.data.category === category);
    });

    return {
        dir: {
            input: '_src',
            includes: '_includes',
            output: '.'
        },
        templateFormats: ['md', 'njk', 'html'],
        markdownTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        dataTemplateEngine: 'njk'
    };
}