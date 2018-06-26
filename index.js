import * as SierpinskiTriangle from "sierpinski-triangle";
//var SierpinskiTriangle = require("sierpinski-triangle");

/**
 * Creates the Sierpinski Gasket
 * All the points mentioned must be in counter clockwise direction
 * @param pA {THREE.Vector3|number[]} The first Point of the triangle
 * @param pB {THREE.Vector3|number[]} The second point of the triangle
 * @param pC {THREE.Vector3|number[]} The third point of the triangle
 * @param depth {number} The depth of the Sierpinski gasket
 * @return 
 */
export default function (pA, pB, pC, depth) {
    if (pA instanceof THREE.Vector3) {
        pA = pA.toArray();
    }
    if (pB instanceof THREE.Vector3) {
        pB = pB.toArray();
    }
    if (pC instanceof THREE.Vector3) {
        pC = pC.toArray();
    }

    var sierpinskiTriangle = SierpinskiTriangle.default(pA, pB, pC, depth, 3);
    var bufferGeometry = new THREE.BufferGeometry();
    bufferGeometry.addAttribute('position', new THREE.BufferAttribute( new Float32Array(sierpinskiTriangle.pts),3));
    return bufferGeometry;
}
