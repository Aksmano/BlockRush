var Specs = {
    camera: new THREE.PerspectiveCamera(
        45, // kąt kamery (FOV)
        window.innerWidth / window.innerHeight, // proporcje ekranu (16:9 w przypadku tego)
        0.1, // minimalna renderowana odległość
        10000 // maksymalna renderowana odległość
    ),

    degrees(degree) { return degree * Math.PI / 180 },
    gridHelper: new THREE.GridHelper(3000, 75),

    octaMat: new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide, wireframe: true, transparent: true, opacity: 1, }),
    octaGeo: new THREE.OctahedronGeometry(8),

    // walls 
    matW:
        [
            new THREE.MeshStandardMaterial({ color: 0x999900, roughness: 0.8, metalness: 0.3, side: THREE.DoubleSide, wireframe: false, transparent: false, opacity: 1 }),
            new THREE.MeshStandardMaterial({ color: 0x009999, roughness: 0.8, metalness: 0.3, side: THREE.DoubleSide, wireframe: false, transparent: false, opacity: 1 }),
            new THREE.MeshStandardMaterial({ color: 0x990000, roughness: 0.8, metalness: 0.3, side: THREE.DoubleSide, wireframe: false, transparent: false, opacity: 1 }),
            new THREE.MeshStandardMaterial({ color: 0x209900, roughness: 0.8, metalness: 0.3, side: THREE.DoubleSide, wireframe: false, transparent: false, opacity: 1 }),
            new THREE.MeshStandardMaterial({ color: 0x993000, roughness: 0.8, metalness: 0.3, side: THREE.DoubleSide, wireframe: false, transparent: false, opacity: 1 }),
            new THREE.MeshStandardMaterial({ color: 0x990066, roughness: 0.8, metalness: 0.3, side: THREE.DoubleSide, wireframe: false, transparent: false, opacity: 1 })
        ],

    matWYellow: new THREE.MeshStandardMaterial({ color: 0x999900, roughness: 0.8, metalness: 0.3, side: THREE.DoubleSide, wireframe: false, transparent: false, opacity: 1 }),
    matWBlue: new THREE.MeshStandardMaterial({ color: 0x009999, roughness: 0.8, metalness: 0.3, side: THREE.DoubleSide, wireframe: false, transparent: false, opacity: 1 }),
    matWRed: new THREE.MeshStandardMaterial({ color: 0x990000, roughness: 0.8, metalness: 0.3, side: THREE.DoubleSide, wireframe: false, transparent: false, opacity: 1 }),
    matWGreen: new THREE.MeshStandardMaterial({ color: 0x209900, roughness: 0.8, metalness: 0.3, side: THREE.DoubleSide, wireframe: false, transparent: false, opacity: 1 }),
    matWOrange: new THREE.MeshStandardMaterial({ color: 0x993000, roughness: 0.8, metalness: 0.3, side: THREE.DoubleSide, wireframe: false, transparent: false, opacity: 1 }),
    matWViolet: new THREE.MeshStandardMaterial({ color: 0x990066, roughness: 0.8, metalness: 0.3, side: THREE.DoubleSide, wireframe: false, transparent: false, opacity: 1 }),

    // cubes
    matC:
        [
            new THREE.MeshStandardMaterial({ color: 0x3a3a00, roughness: 0.7, metalness: 0.8, side: THREE.DoubleSide, wireframe: false, transparent: false, opacity: 1 }),
            new THREE.MeshStandardMaterial({ color: 0x002a2a, roughness: 0.7, metalness: 0.8, side: THREE.DoubleSide, wireframe: false, transparent: false, opacity: 1 }),
            new THREE.MeshStandardMaterial({ color: 0x2a0000, roughness: 0.7, metalness: 0.8, side: THREE.DoubleSide, wireframe: false, transparent: false, opacity: 1 }),
            new THREE.MeshStandardMaterial({ color: 0x0a2a00, roughness: 0.7, metalness: 0.8, side: THREE.DoubleSide, wireframe: false, transparent: false, opacity: 1 }),
            new THREE.MeshStandardMaterial({ color: 0x2a1a00, roughness: 0.7, metalness: 0.8, side: THREE.DoubleSide, wireframe: false, transparent: false, opacity: 1 }),
            new THREE.MeshStandardMaterial({ color: 0x2a002a, roughness: 0.7, metalness: 0.8, side: THREE.DoubleSide, wireframe: false, transparent: false, opacity: 1 })
        ],

    matCYellow: new THREE.MeshStandardMaterial({ color: 0x3a3a00, roughness: 0.7, metalness: 0.8, side: THREE.DoubleSide, wireframe: false, transparent: false, opacity: 1 }),
    matCBlue: new THREE.MeshStandardMaterial({ color: 0x002a2a, roughness: 0.7, metalness: 0.8, side: THREE.DoubleSide, wireframe: false, transparent: false, opacity: 1 }),
    matCRed: new THREE.MeshStandardMaterial({ color: 0x2a0000, roughness: 0.7, metalness: 0.8, side: THREE.DoubleSide, wireframe: false, transparent: false, opacity: 1 }),
    matCGreen: new THREE.MeshStandardMaterial({ color: 0x0a2a00, roughness: 0.7, metalness: 0.8, side: THREE.DoubleSide, wireframe: false, transparent: false, opacity: 1 }),
    matCOrange: new THREE.MeshStandardMaterial({ color: 0x2a1a00, roughness: 0.7, metalness: 0.8, side: THREE.DoubleSide, wireframe: false, transparent: false, opacity: 1 }),
    matCViolet: new THREE.MeshStandardMaterial({ color: 0x2a002a, roughness: 0.7, metalness: 0.8, side: THREE.DoubleSide, wireframe: false, transparent: false, opacity: 1 }),
    matCBlack: new THREE.MeshStandardMaterial({ color: 0x0f0f0f, roughness: 0.7, metalness: 0.8, side: THREE.DoubleSide, wireframe: false, transparent: false, opacity: 1 })
}