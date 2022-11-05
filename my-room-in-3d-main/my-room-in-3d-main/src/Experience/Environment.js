import * as THREE from 'three'

import Experience from './Experience.js'

export default class Environment {
    constructor(_options) {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.config = this.experience.config
        this.setSunlight()
    }

    setSunlight() {
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        this.sunLight = new THREE.DirectionalLight(0xffffff, 2);
        this.sunLight.castShadow = true;

        this.sunLight.shadow.camera.far = 1;
        this.sunLight.shadow.mapSize.set(1024, 1024);
        this.sunLight.shadow.normalBias = 0.05;

        this.ambientLight = new THREE.AmbientLight(0xffffff, 1);

        this.sphereGeometry = new THREE.PlaneGeometry(100, 100);
        this.sphereMaterial = new THREE.MeshStandardMaterial({ color: 0x6b2b23 });
        this.sphere = new THREE.Mesh(this.sphereGeometry, this.sphereMaterial);
        this.sphere.rotation.x = -Math.PI / 2;
        this.sphere.position.y = -0.5;
        // this.sphere.castShadow = true; //default is false
        this.sphere.receiveShadow = true; //default


        this.shadowGeometry = new THREE.CircleGeometry(8, 60);
        this.shadowMaterial = new THREE.MeshBasicMaterial({ color: 0x922439 });
        this.shadow = new THREE.Mesh(this.shadowGeometry, this.shadowMaterial);
        this.shadow.rotation.x = -Math.PI / 2;
        this.shadow.position.x = this.shadow.position.x - 0.47
        this.shadow.position.y = -0.4;

        this.shadow2Geometry = new THREE.CircleGeometry(7, 60);
        this.shadow2Material = new THREE.MeshBasicMaterial({ color: 0x634576 });
        this.shadow2 = new THREE.Mesh(this.shadow2Geometry, this.shadow2Material);
        this.shadow2.rotation.x = -Math.PI / 2;
        this.shadow2.position.x = this.shadow2.position.x - 0.47
        this.shadow2.position.y = -0.39;

        // this.geometry = new THREE.PlaneGeometry(100, 100);
        // this.material = new THREE.MeshStandardMaterial({ color: 0x6b2b23 })
        // this.plane = new THREE.Mesh(this.geometry, this.material);
        // this.plane.rotation.x = -Math.PI / 2;
        // this.plane.position.y = -0.66;
        // this.plane.receiveShadow = true;

        // this.scene.add(this.plane);
        this.scene.add(this.sunLight);
        this.scene.add(this.ambientLight);
        this.scene.add(this.sphere);
        this.scene.add(this.shadow);
        this.scene.add(this.shadow2);
    }
}