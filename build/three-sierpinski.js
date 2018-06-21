(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.THREE = global.THREE || {}, global.THREE.Sierpinski = factory());
}(this, (function () { 'use strict';

	/**
	 * @param a {Array} The first point
	 * @param b {Array} The second point
	 */
	function half(a, b) {
	    return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
	}

	/**
	 * @param pts {Array}
	 */
	function createTriangle(pA, pB, pC, depth, pts, sz) {
	    if (depth === 0) {
	        pts.push(pA[0], pA[1]);
	        if (sz === 3) {
	            pts.push(0);
	        }
	        else if (sz === 4) {
	            pts.push(0, 1);
	        }
	        pts.push(pB[0], pB[1]);
	        if (sz === 3) {
	            pts.push(0);
	        }
	        else if (sz === 4) {
	            pts.push(0, 1);
	        }
	        pts.push(pC[0], pC[1]);
	        if (sz === 3) {
	            pts.push(0);
	        }
	        else if (sz === 4) {
	            pts.push(0, 1);
	        }
	        return;
	    }
	    var pc2 = half(pA, pB);
	    var pa2 = half(pB, pC);
	    var pb2 = half(pC, pA);
	    depth--;

	    createTriangle(pA, pc2, pb2, depth, pts, sz);
	    createTriangle(pc2, pB, pa2, depth, pts, sz);
	    createTriangle(pb2, pa2, pC, depth, pts, sz);

	}

	/**
	 * Creates the Sierpinski Gasket
	 * All the points mentioned must be in counter clockwise direction
	 * @param pA {Array} The first Point of the triangle
	 * @param pB {Array} The second point of the triangle
	 * @param pC {Array} The third point of the triangle
	 * @param depth {number} The depth of the Sierpinski gasket
	 * @param sz {2|3|4} The size of the vertex to be generated. If, 3 or 4 is provided, each vertex will be appened by 0,1 respectively. If not provided, default value is 2.
	 * @return {pts:Array, cnt:number} Returns the Points as a single array and the number of points generated.
	 */
	function sierpinskiTriangle(pA, pB, pC, depth, sz) {
	    if (!sz)
	        sz = 2;
	    sz = Math.floor(sz);
	    if (sz < 2)
	        sz = 2;
	    if (sz > 4)
	        sz = 4;
	    depth = Math.floor(depth);
	    var pts = [];
	    createTriangle(pA, pB, pC, depth, pts, sz);
	    // the vertex count
	    var vcnt = pts.length / sz;
	    return { pts: pts, cnt: vcnt };
	}

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
	function index (pA, pB, pC, depth) {
	    if (pA instanceof THREE.Vector3) {
	        pA = pA.toArray();
	    }
	    if (pB instanceof THREE.Vector3) {
	        pB = pB.toArray();
	    }
	    if (pC instanceof THREE.Vector3) {
	        pC = pC.toArray();
	    }
	    
	    var sierpinskiTriangle$$1 = sierpinskiTriangle(pA, pB, pC, depth, 3);
	    var bufferGeometry = new THREE.BufferGeometry();
	    bufferGeometry.addAttribute('position', new Float32Array(sierpinskiTriangle$$1.pts), sierpinskiTriangle$$1.sz);
	    return bufferGeometry;
	}

	return index;

})));
