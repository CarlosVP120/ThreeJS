import * as THREE from 'three'
import { Pane } from 'tweakpane'

import Time from './Utils/Time.js'
import Sizes from './Utils/Sizes.js'
import Stats from './Utils/Stats.js'

import Resources from './Resources.js'
import Renderer from './Renderer.js'
import Camera from './Camera.js'
import World from './World.js'
import Navigation from './Navigation.js'

import assets from './assets.js'
import Preloader from './Preloader.js'

// import GSAP from 'gsap'
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import ASScroll from '@ashthornton/asscroll'


export default class Experience {
    static instance

    constructor(_options = {}) {
        if (Experience.instance) {
            return Experience.instance
        }
        Experience.instance = this

        // Options
        this.targetElement = _options.targetElement

        if (!this.targetElement) {
            console.warn('Missing \'targetElement\' property')
            return
        }

        this.time = new Time()
        this.sizes = new Sizes()
        this.setConfig()


        this.setScene()
        this.setCamera()
        this.setRenderer()
        this.setResources()
        this.setWorld()
        this.setNavigation()
        this.setPreloader()


        // GSAP.registerPlugin(ScrollTrigger);

        // this.setSmoothScroll()

        this.sizes.on('resize', () => {
            this.resize()
        })

        this.update()
    }

    // static getInstance(_options = {})
    // {
    //     console.log(Experience.instance)
    //     if(Experience.instance)
    //     {
    //         return Experience.instance
    //     }

    //     console.log('create')
    //     Experience.instance = new Experience(_options)

    //     return Experience.instance
    // }





    // setupASScroll() {
    //     // https://github.com/ashthornton/asscroll
    //     const asscroll = new ASScroll({
    //         ease: 0.3,
    //         disableRaf: true,
    //     });

    //     GSAP.ticker.add(asscroll.update);

    //     ScrollTrigger.defaults({
    //         scroller: asscroll.containerElement,
    //     });

    //     ScrollTrigger.scrollerProxy(asscroll.containerElement, {
    //         scrollTop(value) {
    //             if (arguments.length) {
    //                 asscroll.currentPos = value;
    //                 return;
    //             }
    //             return asscroll.currentPos;
    //         },
    //         getBoundingClientRect() {
    //             return {
    //                 top: 0,
    //                 left: 0,
    //                 width: window.innerWidth,
    //                 height: window.innerHeight,
    //             };
    //         },
    //         fixedMarkers: true,
    //     });

    //     asscroll.on("update", ScrollTrigger.update);
    //     ScrollTrigger.addEventListener("refresh", asscroll.resize);

    //     requestAnimationFrame(() => {
    //         asscroll.enable({
    //             newScrollElements: document.querySelectorAll(
    //                 ".gsap-marker-start, .gsap-marker-end, [asscroll]"
    //             ),
    //         });
    //     });
    //     return asscroll;
    // }

    // setSmoothScroll() {
    //     this.asscroll = this.setupASScroll();
    // }

    setConfig() {
        this.config = {}

        // Pixel ratio
        this.config.pixelRatio = Math.min(Math.max(window.devicePixelRatio, 1), 2)

        // Width and height
        const boundings = this.targetElement.getBoundingClientRect()
        this.config.width = boundings.width
        this.config.height = boundings.height || window.innerHeight
        this.config.smallestSide = Math.min(this.config.width, this.config.height)
        this.config.largestSide = Math.max(this.config.width, this.config.height)

        // Debug
        // this.config.debug = window.location.hash === '#debug'
        this.config.debug = this.config.width > 420
    }



    setScene() {
        this.scene = new THREE.Scene()
    }

    setCamera() {
        this.camera = new Camera()
    }

    setRenderer() {
        this.renderer = new Renderer({ rendererInstance: this.rendererInstance })

        this.targetElement.appendChild(this.renderer.instance.domElement)
    }

    setResources() {
        this.resources = new Resources(assets)
    }

    setWorld() {
        this.world = new World()
    }

    setNavigation() {
        this.navigation = new Navigation()
    }

    setPreloader() {
        this.preloader = new Preloader()
    }

    update() {
        if (this.stats)
            this.stats.update()

        this.camera.update()

        if (this.renderer)
            this.renderer.update()

        if (this.world)
            this.world.update()

        if (this.navigation)
            this.navigation.update()

        window.requestAnimationFrame(() => {
            this.update()
        })
    }

    resize() {
        // Config
        const boundings = this.targetElement.getBoundingClientRect()
        this.config.width = boundings.width
        this.config.height = boundings.height
        this.config.smallestSide = Math.min(this.config.width, this.config.height)
        this.config.largestSide = Math.max(this.config.width, this.config.height)

        this.config.pixelRatio = Math.min(Math.max(window.devicePixelRatio, 1), 2)

        if (this.camera)
            this.camera.resize()

        if (this.renderer)
            this.renderer.resize()

        if (this.world)
            this.world.resize()
    }

    destroy() {

    }
}
