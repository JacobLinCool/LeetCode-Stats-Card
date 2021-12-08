# LeetCode Stats Card

[![CodeFactor](https://www.codefactor.io/repository/github/jacoblincool/leetcode-stats-card/badge)](https://www.codefactor.io/repository/github/jacoblincool/leetcode-stats-card)

A simple tool for every LeetCoder.

Show your dynamically generated LeetCode stats on your GitHub profile or your website!

[Playground: Try It Now](https://leetcode.card.workers.dev/)

[![Leetcode Stats](https://leetcode.card.workers.dev/?username=JacobLinCool&update=20210612)](https://leetcode.card.workers.dev/)

## Usage

Just copy the code below, paste it into your readme.md, and change the value of `username`.

```md
![Leetcode Stats](https://leetcode.card.workers.dev/?username=JacobLinCool)
```

Congratulation! You are now showing your LeetCode stats on your profile!

Want hyperlink? Try this:

```md
[![Leetcode Stats](https://leetcode.card.workers.dev/?username=JacobLinCool)](https://leetcode.com/JacobLinCool)
```

### Endpoint

The endpoint of this awesome tool is:

[https://leetcode.card.workers.dev/](https://leetcode.card.workers.dev/)

### Parameters

| Key             | Description                               | Default Value | Required |
| --------------- | ----------------------------------------- | ------------- | -------- |
| `username`      | Your LeetCode Username: `String`          | `null`        | YES      |
| `theme`         | Card [Style](#themes): `String`           | `default`     | NO       |
| `font`          | Text [Font](#fonts): `String`             | `baloo`       | NO       |
| `width`         | Card Width: `Number`                      | `500`         | NO       |
| `height`        | Card Height: `Number`                     | `200`         | NO       |
| `animation`     | Enable Animation: `Boolean`               | `true`        | NO       |
| `border`        | Border Width: `Number`                    | `1`           | NO       |
| `border_radius` | Border Radius: `Number`                   | `4`           | NO       |
| `extension`     | Enable [Extension](#extensions): `String` | `null`        | NO       |
| `show_rank`     | Display/Hide rank: `Boolean`              | `true`        | NO       |

### Themes

Now we have 5 themes. If you have any great idea, please let me know. Also, any PRs or Issues with cool features or styles are welcomed!

#### Default

```md
![Leetcode Stats](https://leetcode.card.workers.dev/?username=JacobLinCool&theme=default)
```

![Leetcode Stats](https://leetcode.card.workers.dev/?username=JacobLinCool&theme=default)

#### Dark

```md
![Leetcode Stats](https://leetcode.card.workers.dev/?username=JacobLinCool&theme=dark)
```

![Leetcode Stats](https://leetcode.card.workers.dev/?username=JacobLinCool&theme=dark)

#### Auto

```md
![Leetcode Stats](https://leetcode.card.workers.dev/?username=JacobLinCool&theme=auto)
```

![Leetcode Stats](https://leetcode.card.workers.dev/?username=JacobLinCool&theme=auto)

#### Nord

```md
![Leetcode Stats](https://leetcode.card.workers.dev/?username=JacobLinCool&theme=nord)
```

![Leetcode Stats](https://leetcode.card.workers.dev/?username=JacobLinCool&theme=nord)

#### Forest

```md
![Leetcode Stats](https://leetcode.card.workers.dev/?username=JacobLinCool&theme=forest)
```

![Leetcode Stats](https://leetcode.card.workers.dev/?username=JacobLinCool&theme=forest)

#### WTF

```md
![Leetcode Stats](https://leetcode.card.workers.dev/?username=JacobLinCool&theme=wtf)
```

![Leetcode Stats](https://leetcode.card.workers.dev/?username=JacobLinCool&theme=wtf)

### Fonts

#### Baloo

```md
![Leetcode Stats](https://leetcode.card.workers.dev/?username=JacobLinCool&font=baloo)
```

![Leetcode Stats](https://leetcode.card.workers.dev/?username=JacobLinCool&font=baloo)

#### Milonga

```md
![Leetcode Stats](https://leetcode.card.workers.dev/?username=JacobLinCool&font=milonga)
```

![Leetcode Stats](https://leetcode.card.workers.dev/?username=JacobLinCool&font=milonga)

#### Patrick Hand

```md
![Leetcode Stats](https://leetcode.card.workers.dev/?username=JacobLinCool&font=patrick_hand)
```

![Leetcode Stats](https://leetcode.card.workers.dev/?username=JacobLinCool&font=patrick_hand)

#### Ruthie

```md
![Leetcode Stats](https://leetcode.card.workers.dev/?username=JacobLinCool&font=ruthie)
```

![Leetcode Stats](https://leetcode.card.workers.dev/?username=JacobLinCool&font=ruthie)

#### Other Fonts

You can also use some [Web Safe Font](https://www.w3schools.com/cssref/css_websafe_fonts.asp) which you want to display on the card.

### Extensions

Extension is still a testing feature.

It will not work on iOS, the layout is far from perfect.

But you can try it by adding `extension=activity` to the serach parameter.

```md
![Leetcode Stats](https://leetcode.card.workers.dev/?username=JacobLinCool&extension=activity)
```

![Leetcode Stats](https://leetcode.card.workers.dev/?username=JacobLinCool&extension=activity)
