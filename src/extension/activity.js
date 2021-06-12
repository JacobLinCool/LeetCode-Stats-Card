const css = `
#ext_flex_box {
    height: 100%; 
    display: flex; 
    flex-direction: column; 
    justify-content: flex-start;
    overflow: hidden auto;
}
#ext_flex_box::-webkit-scrollbar, .ext_link::-webkit-scrollbar {
    display: none;
}
.ext_link {
    white-space: nowrap;
    text-decoration: none;
    overflow: auto hidden;
}
.ext_submission_wrap {
    display: flex;
    margin: 4px 0;
}
.ext_time, .ext_submission, .ext_lang {
    padding: 1px 4px;
    border-radius: 4px;
    margin: 0 6px 0 0;
}
.ext_time {
    min-width: 48px;
    padding: 0;
}
.ext_submission.AC {
    background: rgb(76, 175, 80);
    color: #ffffff;
}
.ext_submission.WA, .ext_submission.RE, .ext_submission.TLE, .ext_submission.MLE {
    background: rgb(233, 30, 99);
    color: #ffffff;
}
.ext_submission.Unknown {
    background: rgb(0, 0, 0);
    color: #ffffff;
}
.ext_lang {
    background: rgb(64, 196, 255);
    color: #ffffff;
}
.theme_dark .ext_submission.AC {
    background: rgb(56 155 60);
}
.theme_dark .ext_lang {
    background: rgb(34 166 225);
}
`;

function ext_activity(data, parameters) {
    let activities = data.activity.slice(0, 10);
    let svg = "";
    svg += `<text x="20" y="20">Recent Activities</text>`;
    svg += `<foreignObject x="20" y="30" width="460" height="160"><div id="ext_flex_box" xmlns="http://www.w3.org/1999/xhtml">`;
    for (let i = 0; i < activities.length; i++) {
        let status = `Unknown`;
        switch (activities[i].status) {
            case "Accepted":
                status = "AC";
                break;
            case "Wrong Answer":
                status = "WA";
                break;
            case "Time Limit Exceeded":
                status = "TLE";
                break;
            case "Memory Limit Exceeded":
                status = "MLE";
                break;
            case "Runtime Error":
                status = "RE";
                break;
        }

        svg += `
            <div class="ext_submission_wrap">
                <span class="ext_time sub_text">${activities[i].time.getMonth() + 1}/${activities[i].time.getDate()}</span>
                <span class="ext_submission ${status}">${status}</span>
                <span class="ext_lang">${activities[i].lang}</span>
                <a class="ext_link sub_text" target="_blank" href="${activities[i].problem}"><span>${activities[i].title}</span></a>
            </div>
        `;
    }
    svg += `</div></foreignObject>`;

    svg += `<style>${css}</style>`;
    return svg;
}

export { ext_activity };
