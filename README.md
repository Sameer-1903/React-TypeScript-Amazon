# TypeScript MERN AMAZON

## Lessons

1. Introduction
2. Install Tools
3. Create TypeScript React App By Vite
4. Create Git Repository
    1. add README.md
    2. create github account
    3. connect vs code to github 
    4. publish repository 
5. List Products
    1. create Product type
    2. create products array
    3. add product images
    4. render products
6. Add Bootstarp
7. Add Page Routing
    1. npm i react-router-dom
    2. Create route for home page
    3. Create router for product page
    4. Add helmet for setting page title
8. Create Node Server
    1. create backend folder
       cd backend
       npm init
    2. config typescript
       npm install --save-dev typescript ts-node-dev
       create tsconfig.json

            ```json
        {
            "compilerOptions": {
            "target": "es2015",
            "outDir": "./build",
            "strict": true,
            "module": "commonjs",
            "esModuleInterop": true
            }
        }
        ```

        add dev and build command to package.json
        `"dev": "ts-node-dev --respawn --transpile-only --files src/index.ts",`

    3. config eslint
       npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
       create .eslintrc.js

        ```js
        module.exports = {
            env: {
            es2016: true,
            node: true,
            },
            extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
            parser: '@typescript-eslint/parser',
            parserOptions: {
            ecmaVersion: 'es2016',
            sourceType: 'module',
            },
            plugins: ['@typescript-eslint'],
        }
        ```
    4. create express server
       npm install express
       npm install --save-sev @types/express

    5. create src/index.ts
       copy data.ts and Product.ts from frontend to backend

            ```js
            import express, { Request, Response } from 'express'
            import { sampleProducts } from './data'
            const app = express()
            app.get('/api/products', (req: Request, res: Response) => {
                res.json(sampleProducts)
            })
            const PORT = 4000
            app.listen(PORT, () => {
                console.log(`server started at http://localhost:${PORT}`)
            })
        ```

    6. npm start
