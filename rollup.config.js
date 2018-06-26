import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs'


export default {
    input: './index.js',
    plugins: [
        resolve({ browser: true }),
        commonjs({
            include: ["node_modules/**"],
        })
    ],
    // sourceMap: true,
    output: [
        {
            format: 'umd',
            file: 'build/three-sierpinski.js',
            indent: '\t',
            name: "THREE.Sierpinski"
        }
        // ,
        // {
        //     format: 'es',
        //     file: 'build/three-sierpinski.module.js',
        //     indent: '\t'
        // }
    ]
};