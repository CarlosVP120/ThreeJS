import { EventEmitter } from "events";
import Experience from "./Experience.js";

export default class Preloader extends EventEmitter {
    constructor() {
        super();
        this.experience = new Experience()
        this.config = this.experience.config
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.world = this.experience.world


        this.world.on("worldready", () => {
            this.playIntro()
        })
    }

    onScroll(e) {
        if (e.deltaY > 0) {

            window.removeEventListener("wheel", this.scrollOncesEvent)
            this.playSecondIntro()
        }
    }

    playIntro() {
        this.scrollOncesEvent = this.onScroll.bind(this)
        window.addEventListener("wheel", this.scrollOncesEvent)
    }

    playSecondIntro() {

    }
}
