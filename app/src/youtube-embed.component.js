import { h, render, Component } from "preact";
import bee from "./bee.js";

export default class YoutubeEmbed extends Component {
    render() {
        if (this.state.revealed) {
            const youtubeId = this.props.url.split("/")[3].split("=")[1];
            const embedUrl = "https://www.youtube.com/embed/" + youtubeId + "?autoplay=1&controls=2&wmode=opaque";
            return <div class="embed-responsive embed-responsive-16by9"><iframe allowfullscreen class="embed-responsive-item" src={embedUrl}></iframe></div>;
        }
        return <div class="embed-preview" onClick={() => this.setState({revealed: true})}><div class="youtube"></div><img src={ bee.crop(this.props.preview, 1024, 180) } /></div>;
    }
}