function askForCookies()
{
    if(getCookie("cookieAllow") === "true")
    {
        return true;
    }
    else
    {
        if(confirm("You need to enable cookies to switch between themes. Click 'ok' to enable cookies."))
        {
            setCookie("cookieAllow", "true", 30);
            setCookie("styleCookie", "light", 30)
            return true;
        }

        else
        {
            setCookie("cookieAllow", "", 0);
            setCookie("styleCookie", "", 0);
            return false;
        }
    }
}

function getCookie(cname)
{
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setCookie(cname, cvalue, exdays)
{
    let d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;";
}

function checkThemeOnLoad() {
    if (getCookie("styleCookie") !== "") {
        switchTheme(getCurrentTheme(), false)
    }
}

function checkThemeOnButtonClick() {
    if (getCookie("cookieAllow") !== "true") {
        if (askForCookies()) {
            switchTheme("dark")
        }
    }
    else {
        switchTheme(getCurrentTheme(), true);
    }
}

function getCurrentTheme() {
    return getCookie("styleCookie");
}

function switchTheme(themeCookie, invert) {
    let stylesheet_path = /top.html/.test(window.location.href) ?
        "stylesheets" :
        "../stylesheets";

    if ((themeCookie === "dark" && invert) || (themeCookie === "light" && !invert)) {
        setCookie("styleCookie", "light");
        document.getElementById("themeStyle")
            .setAttribute("href", `${stylesheet_path}/style_light.css`);
        updateNavbarTheme("light");
    }
    else {
        setCookie("styleCookie", "dark");
        document.getElementById("themeStyle")
            .setAttribute("href", `${stylesheet_path}/style_dark.css`);
        updateNavbarTheme("dark");
    }

    if (invert) {
        document.getElementById("btn-theme").innerHTML = `Click to toggle ${themeCookie} theme`;
    }
}

function updateNavbarTheme(theme) {
    let navbar = document.getElementsByTagName("nav")[0]

    if (theme === "dark") {
        navbar.classList.remove("navbar-light");
        navbar.classList.remove("bg-light");
        navbar.classList.add("navbar-dark");
        navbar.classList.add("bg-dark");
    }

    else if (theme === "light") {
        navbar.classList.remove("navbar-dark");
        navbar.classList.remove("bg-dark");
        navbar.classList.add("navbar-light");
        navbar.classList.add("bg-light");
    }
}
