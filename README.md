# LeetCode Stats Card

[![CodeFactor](https://www.codefactor.io/repository/github/jacoblincool/leetcode-stats-card/badge)](https://www.codefactor.io/repository/github/jacoblincool/leetcode-stats-card)

Show your dynamically generated LeetCode stats on your GitHub profile or your website!

LeetCode and LeetCode CN are both supported.

[Playground: Try It Now](https://leetcard.jacoblin.cool/)

[![LeetCode Stats](https://leetcard.jacoblin.cool/JacobLinCool?theme=unicorn&extension=activity)](https://leetcard.jacoblin.cool/JacobLinCool?theme=unicorn&extension=activity)

## Features

- 📈 Clean and simple LeetCode stats, for both `us` and `cn` sites
- 🎨 Multiple themes and 1,300+ fonts - [Theme](#theme-default-lightdark), [Font](#font-default-baloo_2)
- 🪄 Fully customizable using CSS - [Custom Stylesheets](#sheets-default-)
- ⚡️ Fast and global edge network - [Cloudflare Workers](https://workers.cloudflare.com/)
- 🚫 No tracking, controlable cache - [Cache](#cache-default-60)
- 🍀 Open source - [MIT License](./LICENSE)
- ⚙️ Extended-cards: `activity`, `contest`, `heatmap`

It also has a [NPM package](https://www.npmjs.com/package/leetcode-card) and a [highly extensible system](./src/core/index.ts), so you can easily customize it to your needs.

Want to contribute? Feel free to open a pull request!

## Self-hosting

You can also self-host this service using the [`jacoblincool/leetcode-stats-card`](https://hub.docker.com/r/jacoblincool/leetcode-stats-card) Docker image.

To build the image by yourself, use `pnpm build:image` script.

See [docker-compose.yml](./docker-compose.yml) for an example.

## Usage

Simply copy the code below, paste it into your `README.md`, and change the path to your leetcode username (case-insensitive).

```md
![Leetcode Stats](https://leetcard.jacoblin.cool/JacobLinCool)
```

Congratulation! You are now showing your LeetCode stats on your profile!

Want a hyperlink? Try this:

```md
[![Leetcode Stats](https://leetcard.jacoblin.cool/JacobLinCool)](https://leetcode.com/JacobLinCool)
```

### Endpoint

The endpoint of this tool is:

<https://leetcard.jacoblin.cool/>

> The legacy one: <https://leetcode.card.workers.dev/>

### Options

There are many options, you can configure them by passing a query string to the endpoint.

#### `site` (default: `us`)

Data source, can be `us` or `cn`.

```md
![](https://leetcard.jacoblin.cool/leetcode?site=cn)
```

[![](https://leetcard.jacoblin.cool/leetcode?site=cn)](https://leetcard.jacoblin.cool/leetcode?site=cn)

#### `theme` (default: `light,dark`)

Card theme, see [Theme](#themes) for more information.

Use a comma to separate the light and dark theme.

```md
![](https://leetcard.jacoblin.cool/jacoblincool?theme=unicorn)
![](https://leetcard.jacoblin.cool/jacoblincool?theme=light,unicorn)
```

[![](https://leetcard.jacoblin.cool/jacoblincool?theme=unicorn)](https://leetcode.com/jacoblincool)

#### `font` (default: `Baloo_2`)

Card font, you can use almost all fonts on [Google Fonts](https://fonts.google.com/).

It is case-insensitive, and you can use `font=dancing_script` or `font=Dancing%20Script` to get the same result.

```md
![](https://leetcard.jacoblin.cool/jacoblincool?font=Dancing_Script)
```

[![](https://leetcard.jacoblin.cool/jacoblincool?font=Dancing_Script)](https://leetcard.jacoblin.cool/jacoblincool?font=Dancing_Script)

#### `width` and `height` (default: `500` and `200`)

Change the card size, it will not resize the content.

But it will be helpful if you want to use custom css.

```md
![](https://leetcard.jacoblin.cool/jacoblincool?width=500&height=500)
```

[![](https://leetcard.jacoblin.cool/jacoblincool?width=500&height=500)](https://leetcard.jacoblin.cool/jacoblincool?width=500&height=500)

#### `border` and `radius` (default: `1` and `4`)

Change the card border and radius.

```md
![](https://leetcard.jacoblin.cool/jacoblincool?border=0&radius=20)
```

[![](https://leetcard.jacoblin.cool/jacoblincool?border=0&radius=20)](https://leetcard.jacoblin.cool/jacoblincool?border=0&radius=20)

#### `animation` (default: `true`)

Enable or disable the animation.

```md
![](https://leetcard.jacoblin.cool/jacoblincool?animation=false)
```

[![](https://leetcard.jacoblin.cool/jacoblincool?animation=false)](https://leetcard.jacoblin.cool/jacoblincool?animation=false)

#### `hide` (default: `""`)

Hide elements on the card, it is a comma-separated list of element ids.

```md
![](https://leetcard.jacoblin.cool/jacoblincool?hide=ranking,total-solved-text,easy-solved-count,medium-solved-count,hard-solved-count)
```

[![](https://leetcard.jacoblin.cool/jacoblincool?hide=ranking,total-solved-text,easy-solved-count,medium-solved-count,hard-solved-count)](https://leetcard.jacoblin.cool/jacoblincool?hide=ranking,total-solved-text,easy-solved-count,medium-solved-count,hard-solved-count)

#### `ext` (default: `""`)

Extension, it is a comma-separated list of extension names.

NOTICE: You can only use one of extended-card extensions (`activity`, `contest`, `heatmap`) at a time now, maybe they can be used together in the future.

> Animation, font, theme, and external stylesheet are all implemented by extensions and enabled by default.

Want to contribute a `nyan-cat` extension? PR is welcome!

```md
![](https://leetcard.jacoblin.cool/jacoblincool?ext=activity)
```

[![](https://leetcard.jacoblin.cool/jacoblincool?ext=activity)](https://leetcard.jacoblin.cool/jacoblincool?ext=activity)

```md
![](https://leetcard.jacoblin.cool/lapor?ext=contest)
```

[![](https://leetcard.jacoblin.cool/lapor?ext=contest)](https://leetcard.jacoblin.cool/lapor?ext=contest)

```md
![](https://leetcard.jacoblin.cool/lapor?ext=heatmap)
```

[![](https://leetcard.jacoblin.cool/lapor?ext=heatmap)](https://leetcard.jacoblin.cool/lapor?ext=heatmap)

#### `cache` (default: `60`)

Cache time in seconds.

Note: it will not be a good idea to set it to a long time because GitHub will fetch and cache the card.

```md
![](https://leetcard.jacoblin.cool/jacoblincool?cache=0)
```

> You can make `DELETE` request to `/:site/:username` to delete the cache.

#### `sheets` (default: `""`)

External stylesheet, it is a comma-separated list of urls.

You can upload your custom CSS to gist and use the url.

```md
![](https://leetcard.jacoblin.cool/jacoblincool?sheets=url1,url2)
```

They will be injected in the order you specified.

#### Legacy Options

Still work, but deprecated.

| Key             | Description                  | Default Value |
| --------------- | ---------------------------- | ------------- |
| `border_radius` | Same as `radius`             | `4`           |
| `show_rank`     | Display/Hide Rank: `Boolean` | `true`        |
| `extension`     | Same as `ext`                | `""`          |

### Themes

Now we have 6 themes. If you have any great idea, please feel free to open a PR!

#### Light

```md
![Leetcode Stats](https://leetcard.jacoblin.cool/JacobLinCool?theme=light)
```

[![Leetcode Stats](https://leetcard.jacoblin.cool/JacobLinCool?theme=light)](https://leetcard.jacoblin.cool/JacobLinCool?theme=light)

#### Dark

```md
![Leetcode Stats](https://leetcard.jacoblin.cool/JacobLinCool?theme=dark)
```

[![Leetcode Stats](https://leetcard.jacoblin.cool/JacobLinCool?theme=dark)](https://leetcard.jacoblin.cool/JacobLinCool?theme=dark)

#### Nord

```md
![Leetcode Stats](https://leetcard.jacoblin.cool/JacobLinCool?theme=nord)
```

[![Leetcode Stats](https://leetcard.jacoblin.cool/JacobLinCool?theme=nord)](https://leetcard.jacoblin.cool/JacobLinCool?theme=nord)

#### Forest

```md
![Leetcode Stats](https://leetcard.jacoblin.cool/JacobLinCool?theme=forest)
```

[![Leetcode Stats](https://leetcard.jacoblin.cool/JacobLinCool?theme=forest)](https://leetcard.jacoblin.cool/JacobLinCool?theme=forest)

#### WTF

```md
![Leetcode Stats](https://leetcard.jacoblin.cool/JacobLinCool?theme=wtf)
```

[![Leetcode Stats](https://leetcard.jacoblin.cool/JacobLinCool?theme=wtf)](https://leetcard.jacoblin.cool/JacobLinCool?theme=wtf)

#### Unicorn

```md
![Leetcode Stats](https://leetcard.jacoblin.cool/JacobLinCool?theme=unicorn)
```

[![Leetcode Stats](https://leetcard.jacoblin.cool/JacobLinCool?theme=unicorn)](https://leetcard.jacoblin.cool/JacobLinCool?theme=unicorn)

#### Transparent

```md
![Leetcode Stats](https://leetcard.jacoblin.cool/JacobLinCool?theme=transparent)
```

[![Leetcode Stats](https://leetcard.jacoblin.cool/JacobLinCool?theme=transparent)](https://leetcard.jacoblin.cool/JacobLinCool?theme=transparent)

### Fonts

You can now use almost all fonts on [Google Fonts](https://fonts.google.com/).

Some examples:

#### Milonga

```md
![Leetcode Stats](https://leetcard.jacoblin.cool/JacobLinCool?font=milonga)
```

[![Leetcode Stats](https://leetcard.jacoblin.cool/JacobLinCool?font=milonga)](https://leetcard.jacoblin.cool/JacobLinCool?font=milonga)

#### Patrick Hand

```md
![Leetcode Stats](https://leetcard.jacoblin.cool/JacobLinCool?font=patrick_hand)
```

[![Leetcode Stats](https://leetcard.jacoblin.cool/JacobLinCool?font=patrick_hand)](https://leetcard.jacoblin.cool/JacobLinCool?font=patrick_hand)

#### Ruthie

```md
![Leetcode Stats](https://leetcard.jacoblin.cool/JacobLinCool?font=ruthie)
```

[![Leetcode Stats](https://leetcard.jacoblin.cool/JacobLinCool?font=ruthie)](https://leetcard.jacoblin.cool/JacobLinCool?font=ruthie)

### Extensions

Extension, it is a comma-separated list of extension names.

NOTICE: You can only use one of extended-card extensions (`activity`, `contest`, `heatmap`) at a time now, maybe they can be used together in the future.

> Animation, font, theme, and external stylesheet are all implemented by extensions and enabled by default.

Want to contribute a `nyan-cat` extension? PR is welcome!

#### `activity`

Show your recent submissions.

```md
![Leetcode Stats](https://leetcard.jacoblin.cool/JacobLinCool?ext=activity)
```

[![Leetcode Stats](https://leetcard.jacoblin.cool/JacobLinCool?ext=activity)](https://leetcard.jacoblin.cool/JacobLinCool?ext=activity)

#### `contest`

Show your contest rating history.

```md
![Leetcode Stats](https://leetcard.jacoblin.cool/lapor?ext=contest)
```

[![Leetcode Stats](https://leetcard.jacoblin.cool/lapor?ext=contest)](https://leetcard.jacoblin.cool/lapor?ext=contest)

#### `heatmap`

Show heatmap in the past 52 weeks.

```md
![Leetcode Stats](https://leetcard.jacoblin.cool/lapor?ext=heatmap)
```

[![Leetcode Stats](https://leetcard.jacoblin.cool/lapor?ext=heatmap)](https://leetcard.jacoblin.cool/lapor?ext=heatmap)
