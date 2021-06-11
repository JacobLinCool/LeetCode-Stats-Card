# LeetCode Stats Card
A simple tool for every LeetCoder.

Show your LeetCode stats on your GitHub profile or your website!

[![Leetcode Stats](https://leetcode-card.jacob.workers.dev/?username=JacobLinCool&style=default)](https://leetcode-card.jacob.workers.dev/)

## Usage
Just copy the code below, paste it into your readme.md, and change the value of `username`.

```md
![Leetcode Stats](https://leetcode-card.jacob.workers.dev/?username=JacobLinCool)
```

Congratulation! You are now showing your LeetCode stats on your profile!

Want hyperlink? Try this:

```md
[![Leetcode Stats](https://leetcode-card.jacob.workers.dev/?username=JacobLinCool)](https://leetcode.com/JacobLinCool)
```

### Endpoint
The endpoint of this awesome tool is: 

[https://leetcode-card.jacob.workers.dev/](https://leetcode-card.jacob.workers.dev/)

### Parameters

Key         |Description                           |Default Value    |Required
---         |---                                   |---              |---
`username`  |Your LeetCode Username                |`null`           | YES
`style`     |Card Style: `default` or `dark`       |`default`        | NO
`width`     |Card Width: `Number`                  |`500`            | NO
`height`    |Card Height: `Number`                 |`200`            | NO
`animation` |Enable Animation: `true` or `false`   |`true`           | NO

### Styles
Now we only have 2 styles (and 1 beta style). If you have any great idea, please let me know. Also, any PR or Issue with cool features or styles are welcome!

#### Default
![Leetcode Stats](https://leetcode-card.jacob.workers.dev/?username=JacobLinCool&style=default)

#### Dark
![Leetcode Stats](https://leetcode-card.jacob.workers.dev/?username=JacobLinCool&style=dark)

#### Auto (Beta)
![Leetcode Stats](https://leetcode-card.jacob.workers.dev/?username=JacobLinCool&style=auto)
