import * as THREE from 'three'

import Experience from './Experience.js'

export default class Floor {
    constructor(_options) {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.setFloor()
    }

    setFloor() {
        this.geometry = new THREE.PlaneGeometry(100, 100);
        this.material = new THREE.MeshStandardMaterial({ color: 0x6b2b23 })
        this.plane = new THREE.Mesh(this.geometry, this.material);
        this.plane.rotation.x = -Math.PI / 2;
        this.plane.position.y = -0.66;
        this.plane.receiveShadow = true;

        this.scene.add(this.plane);
    }
}