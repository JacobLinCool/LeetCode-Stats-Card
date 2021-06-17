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
        <select id="style">
            <option value="default" selected>Default Style</option>
            <option value="dark">Dark</option>
            <option value="forest">Forest</option>
            <option value="wtf">WTF</option>
            <option value="auto">Auto (Beta)</option>
        </select>
        <select id="font">
            <option value="" selected>Default ("Segoe UI", "PingFang SC", Ubuntu, Sans-Serif)</option>
            <option value="Arial">Arial</option>
            <option value="Verdana">Verdana</option>
            <option value="Helvetica">Helvetica</option>
            <option value="Tahoma">Tahoma</option>
            <option value="Trebuchet MS">Trebuchet MS</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Georgia">Georgia</option>
            <option value="Garamond">Garamond</option>
            <option value="Courier New">Courier New</option>
            <option value="Brush Script MT">Brush Script MT</option>
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
            <img id="preview" src="https://leetcode.card.workers.dev/?username=JacobLinCool"></img>
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
            // get_fonts();
            
            function url() {
                if(!document.querySelector("#username").value.trim()) document.querySelector("#username").value = "JacobLinCool";
                return location.origin + "/?username=" + document.querySelector("#username").value.trim() + "&style=" + document.querySelector("#style").value + "&font=" + document.querySelector("#font").value + "&extension=" + document.querySelector("#extension").value;
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
            function get_fonts() {
                fetch("https://raw.githubusercontent.com/JacobLinCool/LeetCode-Stats-Card/main/google-fonts-list.json").then(r => r.json()).then(list => {
                    let select = document.querySelector("#font");
                    Object.entries(list).forEach(([type, fonts]) => {
                        let optgroup = document.createElement("optgroup");
                        optgroup.label = type[0].toUpperCase() + type.substr(1);
                        fonts.forEach(font => {
                            let option = document.createElement("option");
                            option.innerHTML = font;
                            option.value = font;
                            optgroup.appendChild(option);
                        })
                        select.appendChild(optgroup);
                    });
                })
            }
        </script>
    </body>
</html>
`;

export { html };
