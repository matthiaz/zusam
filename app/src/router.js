import bee from "./bee.js";
const router = {
    toApp: url => url.replace(/^\/api/,""),
    getSegments: () => window.location.pathname.slice(1).split("/"),
    navigate: (url, options = {}) => {
        const from = window.location.pathname;
        const [route, id, action] = router.toApp(url).slice(1).split("/")
        switch (route) {
            case "login":
                bee.remove("apiKey");
            case "messages":
            case "groups":
                if (options.replace) {
                    history.replaceState(null, "", url);
                } else {
                    history.pushState(null, "", url);
                }
                setTimeout(() => window.dispatchEvent(new CustomEvent("routerStateChange", {detail : {
                    from: from,
                }})), 0);
                break;
            case "logout":
                bee.resetData();
                history.pushState(null, "", url);
                break;
            default:
                bee.get("/api/me").then(user => {
                    if (!user) {
                        router.navigate("/login");
                        return;
                    }
                    const url = "/groups/" + bee.getId(user.groups[0]);
                    if (options.replace) {
                        history.replaceState(null, "", url);
                    } else {
                        history.pushState(null, "", url);
                    }
                    setTimeout(() => window.dispatchEvent(new CustomEvent("routerStateChange", {detail : {
                        from: from,
                    }})), 0);
                });
        }
    },
    sync: () => {
        router.navigate(window.location.pathname, {replace: true});
    },
    onClick: e => {
        e.preventDefault();
        const t = e.target.closest("a")
        if (t) {
            if (e.ctrlKey) {
                window.open(router.toApp(t.getAttribute("href")),"_blank")
            } else {
                router.navigate(router.toApp(t.getAttribute("href")));
            }
        }
    },
};
export default router;
