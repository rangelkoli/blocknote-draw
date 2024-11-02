const packageJson = require('./package.json');
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import dts from "rollup-plugin-dts";
import json from '@rollup/plugin-json';
import postcss from 'rollup-plugin-postcss';

export default [
    {
        input: 'src/index.ts',
        output: [{
            file: packageJson.main,
            format: 'cjs',
            sourcemap: true,
            inlineDynamicImports: true
        },
        {
            file: packageJson.module,
            format: 'esm',
            sourcemap: true,
            inlineDynamicImports: true

        }
    ],
        plugins: [
            peerDepsExternal(),
            resolve(),
            commonjs(),
            typescript(
                {
                    tsconfig: './tsconfig.json'
                }
            ),
            terser(),
            json(),
            postcss()
            
        ],
        external: ['react', 'react-dom']

    },
    {
        input: 'src/index.ts',
        output: [{ file: packageJson.types}],
        plugins: [dts.default()],
        external: [/\.css$/]

    }
]