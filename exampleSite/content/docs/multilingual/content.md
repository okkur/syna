+++
fragment = "content"
weight = 100

title = "MultiLingual Mode"

[sidebar]
  sticky = true
+++

> Syna supports creating Multilingual websites since v0.16.1. The implementation
> currently supports specifying languages on a per file basis such as
> `page[.language code].md` future.

In order to make your website multilingual, you need to change your
configuration so Hugo will generate new pages for translated content in your
project. The way Multilingual mode works is that Hugo generates a new website
for each language and add each page to the website of the same language. For 
example if your website has two languages, English and German, and each page
is translated for both languages, Hugo will generate two websites with 
same pages but in two languages. Hugo will not however generate English pages
for German website if those pages are not translated to German. For more 
information on Hugo's Multilingual mode, please refer to [their documentation](https://gohugo.io/content-management/multilingual/).

In order to configure two languages, you need to update your main your
configuration. Here's an example from the official documentation:

```
DefaultContentLanguage = "en"

[languages]
  [languages.en]
    title = "My blog"
    weight = 1
  [languages.fr]
    title = "Mon blogue"
    weight = 2

[params]
  ...
```

Please note that these parameters are added outside of `params` variable, inside
your configuration file (`config.toml`, `config.yaml`, `config.json`). This will
let Hugo know that there are two languages for this project and the default 
language is English (`DefaultContentLanguage = "en"`). Since Hugo doesn't 
expose the default language to the themes, you need to add the parameter to
`params` as well:

```
[params]
  DefaultContentLanguage = "en"
```

With this, whenever you build your website or start the development server, for
each translated page you get `example.com/[page]` and `example.com/fr/[page]`.

> Syna can generate pages for both approaches of content management that Hugo
> supports but currently we only support the "[Translation by filename](https://gohugo.io/content-management/multilingual/#translation-by-filename)"
> approach. We hope to add support for "[Translation by content directory](https://gohugo.io/content-management/multilingual/#translation-by-content-directory)"
> in the future.

Syna allows for fragment overrides in translated pages. This means that when you
translate a page, the translated version will contain all the fragments from the
default language. This allows for fewer duplicated files in your project. This
works the same way as "Translation by filename". For example, let's assume we 
have an `contact` page in our project. The `content` directory might look 
somthing like this:

```
contact/index.md
contact/contact.md
contact/portfolio.md
contact/pricing.md
```

If you want to create a French translation for the `contact` page, and portfolio
fragment inside that page needs to be translated as well, you need to create a
copy from `index.md` and `portfolio.md` and name them `index.fr.md` and
`portfolio.fr.md`, respectively.

```
contact/index.md
contact/index.fr.md
contact/contact.md
contact/portfolio.md
contact/portfolio.fr.md
contact/pricing.md
```

A French version of the page will be generated, containing all your fragments
but the portfolio fragment will be the translated version. The page will have
not changed for the default language.

> Multilingual mode is currently release as alpha. It is subject to changes and
> may not be stable. Please follow the changelog and updates to this page for
> more information and news about any changes. Please create issues and pull
> requests and let us know what you think.
