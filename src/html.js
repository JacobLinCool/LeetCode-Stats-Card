const html = `
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>LeetCode Stats Card</title>
        <meta property="og:title" content="LeetCode Stats Card" />
        <meta property="og:description" content="A simple tool for every leetcoder. Show your leetcode stats on your GitHub profile or your website!" />
    </head>
    <body>
        <h1>LeetCode Stats Card</h1>
        <input id="input" placeholder="Your LeetCode Username">
        <div>
            <button onclick="preview()">Preview</button>
            <button onclick="go()">Go</button>
        </div>
        <div>
            <img id="preview" src="https://leetcode-card.jacob.workers.dev/?username=JacobLinCool"></img>
        </div>
        <style>
            html, body {
                width: 100%;
                height: 100%;
                margin: 0;
                padding: 0;

                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                font-family: sans-serif;
            }
            h1 {
                margin: 8px 0;
            }
            input {
                width: 320px;
                margin: 8px 0;
            }
            button {
                width: 100px;
                margin: 8px;
            }
            div {
                width: 320px;
                margin: 8px 0;

                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
            }
            img {
                width: 100%;
            }
        </style>
        <script>
            function preview() {
                document.querySelector("#preview").src = location.origin + "/?username=" + document.querySelector("input").value.trim();
            }
            function go() {
                let win = window.open();
                win.location = location.origin + "/?username=" + document.querySelector("input").value.trim();
            }
        </script>
    </body>
</html>
`;

export { html };
