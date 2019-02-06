import { h, render, Component } from "preact";
import { lang, me, router, util } from "/core";
import FaIcon from "./fa-icon.component.js";

export default class Navbar extends Component {

    constructor(props) {
        super(props);
        this.clickBackButton = this.clickBackButton.bind(this);
        this.onUpdateMe = this.onUpdateMe.bind(this);
        window.addEventListener("updateMe", this.onUpdateMe);
    }

    clickBackButton(evt) {
        evt.preventDefault();
        if (router.backUrlPrompt && !confirm(router.backUrlPrompt)) {
            return false;
        }
        router.onClick(evt);
    }

    onUpdateMe() {
        // force update the navbar when me gets updated
        this.setState({});
    }

    render() {
        return (
            <div class="main-nav nav align-items-center shadow-sm z-index-100">
                { !router.backUrl && (
                    <div
                        class="menu dropdown" tabindex="-1"
                        onBlur={e => (!e.relatedTarget || !e.relatedTarget.href) && e.target.classList.remove("active")}
                        onClick={e => e.currentTarget.classList.toggle("active")}
                    >
                        <div class="rounded-circle avatar">
                            <img class="rounded-circle" src={me.me.avatar ? util.crop(me.me.avatar["@id"], 80, 80) : util.defaultAvatar }/>
                        </div>
                        <div class="dropdown-menu">
                            <a class="seamless-link"
                                href={router.toApp(me.me["@id"])+"/settings"}
                                onClick={router.onClick}
                            >{lang["settings"]}</a>
                            <a class="seamless-link" href="/logout" onClick={router.onClick}>{lang["logout"]}</a>
                        </div>
                    </div>
                )}
                { router.backUrl && (
                    <a class="seamless-link back" href={router.backUrl} onClick={this.clickBackButton}>
                        <FaIcon family={"solid"} icon={"arrow-left"}/>
                    </a>
                )}
                { router.route == "groups" && router.entity.name && (
                    <span class="title">
                        <span class="cursor-pointer" onClick={() => location.reload()}>
                            {router.entity.name}
                        </span>
                    </span>
                )}
                { me.me.groups && (
                    <div
                        class="nav-link dropdown groups" tabindex="-1"
                        onBlur={e => (!e.relatedTarget || !e.relatedTarget.href) && e.target.classList.remove("active")}
                        onClick={e => e.currentTarget.classList.toggle("active")}
                    >
                        <div>{ lang.groups } <FaIcon family={"solid"} icon={"caret-down"}/></div>
                        <div class="dropdown-menu">
                            { Array.isArray(me.me.groups) && me.me.groups.map(
                                e => (
                                    <a
                                        className={"seamless-link" + (me.isNews(e.id) ? " has-news" : "")}
                                        href={router.toApp(e["@id"])}
                                        onClick={router.onClick}
                                    >{e.name}</a>
                                )
                            )}
                            <a class="seamless-link" href="/create-group" onClick={router.onClick}>{"+ " + lang["create_a_group"]}</a>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
