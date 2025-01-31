function alert(content, title = "", buttons = [{text: _("OK"), type: "normal", onclick: "closeAlert();"}]) {
    $("#alertBox").html(`
        <div class="alertContent">
            <div class="alertContentLandmark" tabindex="0"></div>
            ` + (title == "" ? "" : `<h1 class="normal noMargin">` + title.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/&/g, "&amp;") + `</h1>`) + `
            <p class="noMargin">` + content.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/&/g, "&amp;").replace(/\n/g, "<br>") + `</p>
        </div>
        <div class="alertButtons"></div>
    `);

    for (var i = 0; i < buttons.length; i++) {
        $(".alertButtons").html($(".alertButtons").html() + `
            <button
                ` + (buttons[i].type == "normal" ? "" : "class='" + buttons[i].type.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&apos;").replace(/&/g, "&amp;") + "'") + `
                onclick="` + buttons[i].onclick + `"
            >` + buttons[i].text.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/&/g, "&amp;") + `</button>
        `);
    }

    $("#alertBackground, #alertBox").fadeIn();
    $(".alertContentLandmark").focus().remove();

    if (sReader.reading) {
        sReader.playTone("alert");

        sReader.speak(_("Alert! Press Tab for first item"));
    } else {
        $(".alertButtons").find("button:last").focus();
    }
}

function closeAlert() {
    $("#alertBackground, #alertBox").fadeOut();

    if (sReader.reading) {sReader.speak(_("Alert closed"));}
}