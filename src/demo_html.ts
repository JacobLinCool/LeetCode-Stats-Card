import { font_list } from "./font";
import { theme_list } from "./theme";

const html = `
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <link rel="icon" href="https://raw.githubusercontent.com/JacobLinCool/leetcode-stats-card/main/favicon/leetcode.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>LeetCode Stats Card</title>
        <meta property="og:title" content="LeetCode Stats Card" />
        <meta property="og:description" content="A simple tool for every leetcoder. Show your leetcode stats on your GitHub profile or your website!" />
    </head>
    <body>
        <h1>LeetCode Stats Card</h1>
        <input id="username" placeholder="Your LeetCode Username">
        <select id="theme">
            ${theme_list.map((theme, i) => `<option value="${theme}" ${i === 0 ? "selected" : ""}>${theme}</option>`).join("")}
        </select>
        <select id="font">
            ${font_list.map((font, i) => `<option value="${font}" ${i === 0 ? "selected" : ""}>${font}</option>`).join("")}
            <!-- <option value="Arial">Arial</option>
            <option value="Verdana">Verdana</option>
            <option value="Helvetica">Helvetica</option>
            <option value="Tahoma">Tahoma</option>
            <option value="Trebuchet MS">Trebuchet MS</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Georgia">Georgia</option>
            <option value="Garamond">Garamond</option>
            <option value="Courier New">Courier New</option>
            <option value="Brush Script MT">Brush Script MT</option> -->

            <option value="">You can also use some "system font". Fallback: ("Segoe UI", "PingFang SC", Ubuntu, Sans-Serif)</option>
        </select>
        <select id="extension">
            <option value="null" selected>No Extension</option>
            <option value="activity">Activity (Beta)</option>
        </select>
        <div>
            <button onclick="preview()">Preview</button>
            <button onclick="go()">Go</button>
            <button onclick="md()">Markdwon</button>
        </div>
        <div>
            <img id="preview" src="/JacobLinCool"></img>
        </div>
        <div style="height: 20px;"></div>
        <div>
            <a href="https://github.com/JacobLinCool/leetcode-stats-card">View on GitHub</a>
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
            input, select {
                width: 320px;
                margin: 8px 0;
                padding: 2px;
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
                min-height: 128px;
            }
        </style>
        <script>
            function url() {
                if(!document.querySelector("#username").value.trim()) document.querySelector("#username").value = "JacobLinCool";
                return location.origin + "/" + document.querySelector("#username").value.trim() + "?theme=" + document.querySelector("#theme").value + "&font=" + document.querySelector("#font").value + "&extension=" + document.querySelector("#extension").value;
            }
            function preview() {
                document.querySelector("#preview").src = url();
            }
            function go() {
                let win = window.open();
                win.location = url()
            }
            function md() {
                let code = "![LeetCode Stats](" + url() + ")";
                prompt("Markdown Code: ", code);
            }
        </script>
    </body>
</html>
`;

export default html;
