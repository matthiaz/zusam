import { h, render, Component } from "preact";
import http from "./http.js";
import router from "./router.js";
import FaIcon from "./fa-icon.component.js";

export default class MessagePreview extends Component {
    constructor(props) {
        super(props);
        http.get(this.props.url).then(
            msg => {
                this.setState({message: msg});
                http.get(msg.author).then(author => this.setState({author: author}));
                if (msg.files && msg.files.length > 0) {
                    this.setState({preview: http.crop(msg.files[0], 320, 180)});
                } else {
                    if (msg.data) {
                        this.setState({data: JSON.parse(msg.data)});
                        let previewUrl = JSON.parse(msg.data)["text"].match(/https?:\/\/[^\s]+/gi);
                        if (previewUrl) {
                            http.get("/api/links/by_url?url=" + encodeURIComponent(previewUrl[0])).then(r => {
                                return this.setState({preview: r["preview"]});
                            });
                        }
                    }
                }
            }
        );
    }

    getTitle() {
        if (!this.state.data) {
            return false;
        }
        if (!this.state.data.title || this.state.data.title.length < 30) {
            return this.state.data.title && " ";
        }
        return this.state.data.title.slice(0, 27) + "...";
    }

    render() {
        return this.state.message && (
            <a class="d-block mb-1 seamless-link message-preview" onClick={() => router.navigate(this.props.url)}>
                <div class="card shadow-sm">
                    { this.state.author && this.state.author.avatar && <img class="avatar material-shadow" src={ http.crop(this.state.author.avatar, 80, 80) } /> }
                    { this.state.preview ? 
                            <img class="card-img-top" src={ http.crop(this.state.preview, 320, 180) } />
                            : <div class="card-img-top placeholder"></div>
                    }
                    <div class="card-body border-top d-flex justify-content-between">
                        <span class="left-buffer"></span>
                        <span class="title">{ this.getTitle() }</span>
                        <span class="children">
                            { !!this.state.message.children.length && (
                                <span>
                                    { this.state.message.children.length + " " }
                                    <FaIcon family={"regular"} icon={"comment"} />
                                </span>
                            )}
                        </span>
                    </div>
                </div>
            </a>
        );
    }
}
