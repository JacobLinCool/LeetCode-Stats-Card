# LeetCode Stats Card
A simple tool for every LeetCoder.

Show your LeetCode stats on your GitHub profile or your website!

[Try It Now](https://leetcode.card.workers.dev/)

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

Key              |Description                              |Default Value    |Required
---              |---                                      |---              |---
`username`       |Your LeetCode Username: `String`         |`null`           | YES
`style`          |Card [Style](#styles): `String`          |`default`        | NO
`width`          |Card Width: `Number`                     |`500`            | NO
`height`         |Card Height: `Number`                    |`200`            | NO
`animation`      |Enable Animation: `Boolean`              |`true`           | NO
`border`         |Border Width: `Number`                   |`1`              | NO
`border_radius`  |Border Radius: `Number`                  |`4`              | NO
`extension`      |Enable [Extension](#extensions): `String`|`null`           | NO

### Styles
Now we have 5 styles. If you have any great idea, please let me know. Also, any PRs or Issues with cool features or styles are welcomed!

#### Default
![Leetcode Stats](https://leetcode.card.workers.dev/?username=JacobLinCool&style=default)

#### Dark
![Leetcode Stats](https://leetcode.card.workers.dev/?username=JacobLinCool&style=dark)

#### Auto
![Leetcode Stats](https://leetcode.card.workers.dev/?username=JacobLinCool&style=auto)

#### Forest
![Leetcode Stats](https://leetcode.card.workers.dev/?username=JacobLinCool&style=forest)

#### WTF
![Leetcode Stats](https://leetcode.card.workers.dev/?username=JacobLinCool&style=wtf)

### Extensions
Extension is still a testing feature.
But you can try it by adding `extension=activity` to the serach parameter.

![Leetcode Stats](https://leetcode.card.workers.dev/?username=JacobLinCool&extension=activity&update=20210612)