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
    let stylesheet_path = /top.html/.test(window.location.href) || /help.html/.test(window.location.href) ?
        "stylesheets" :
        "../stylesheets";

    if ((themeCookie === "dark" && invert) || (themeCookie === "light" && !invert)) {
        setCookie("styleCookie", "light");
        document.getElementById("themeStyle")
            .setAttribute("href", `${stylesheet_path}/style_light.css`);
        updateNavbarTheme("light");
        document.getElementById("btn-theme").innerHTML = `Click to toggle dark theme`;
    }
    else {
        setCookie("styleCookie", "dark");
        document.getElementById("themeStyle")
            .setAttribute("href", `${stylesheet_path}/style_dark.css`);
        updateNavbarTheme("dark");
        document.getElementById("btn-theme").innerHTML = `Click to toggle light theme`;
    }
}

function updateNavbarTheme(theme) {
    let navbar = document.getElementsByTagName("nav")[0];
    let navbar_sidepanel = document.getElementById("scrollspy-nav");
    const navs = navbar_sidepanel == null ? [navbar] : [navbar, navbar_sidepanel];

    function changeClass(nav) {
        if (theme === "dark") {
            nav.classList.remove("navbar-light");
            nav.classList.remove("bg-custom");
            nav.classList.add("navbar-dark");
            nav.classList.add("bg-dark");
        }

        else if (theme === "light") {
            nav.classList.remove("navbar-dark");
            nav.classList.remove("bg-dark");
            nav.classList.add("navbar-light");
            nav.classList.add("bg-custom");
        }
    }

    navs.forEach(changeClass);
}
