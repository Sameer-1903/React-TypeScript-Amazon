# TypeScript MERN AMAZON

## Lessons

1.  Introduction
2.  Install Tools
3.  Create TypeScript React App By Vite
4.  Create Git Repository
    1. add README.md
    2. create github account
    3. connect vs code to github
    4. publish repository
5.  List Products
    1. create Product type
    2. create products array
    3. add product images
    4. render products
6.  Add Bootstarp
7.  Add Page Routing
    1. npm i react-router-dom
    2. Create route for home page
    3. Create router for product page
    4. Add helmet for setting page title
8.  Create Node Server

    1.  create backend folder
        cd backend
        npm init
    2.  config typescript
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

        ```

    3.  config eslint
        npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
        create .eslintrc.js

        ```js
        module.exports = {
          env: {
            es2016: true,
            node: true,
          },
          extends: [
            'eslint:recommended',
            'plugin:@typescript-eslint/recommended',
          ],
          parser: '@typescript-eslint/parser',
          parserOptions: {
            ecmaVersion: 'es2016',
            sourceType: 'module',
          },
          plugins: ['@typescript-eslint'],
        }
        ```

    4.  create express server
        npm install express
        npm install --save-sev @types/express

    5.  create src/index.ts
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

        ```

    6.  npm start

9.  Fetch Products

    1. install axios
       npm install axios
       in main.tsx

       ```js
       axios.defaults.baseURL =
         process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : '/'
       ```

    2. define types in HomePage

       ```js
       type State = {
           products: Product[],
           loading: boolean
           error: string
       }
       type Action =
           | { type: 'FETCH_REQUEST' }
           | {
               type: 'FETCH_SUCCESS'
               payload: Product[]
           }
           | { type: 'FETCH_FAIL'; payload: string }

       ```

    3. define initial state and reducer in HomePage.tsx

       ```js
       const initialState: State = {
         products: [],
         loading: true,
         error: '',
       }
       const reducer = (state: State, action: Action) => {
         switch (action.type) {
           case 'FETCH_REQUEST':
             return { ...state, loading: true }
           case 'FETCH_SUCCESS':
             return { ...state, products: action.payload, loading: false }
           case 'FETCH_FAIL':
             return { ...state, loading: false, error: action.payload }
           default:
             return state
         }
       }
       ```

    4. define get error function
       create types/ApiError.ts

       ```js
           export declare type ApiError = {
           message: string
           response: {
           data: {
           message: string
           }
           }
           }
       ```

       create utils.ts

       ```js
       export const getError = (error: ApiError) => {
         return error.response && error.response.data.message
           ? error.response.data.message
           : error.message
       }
       ```

    5. fetch products

       ```js
       const [{ loading, error, products }, dispatch] = useReducer<
           React.Reducer<State, Action>
       >(reducer, initialState)
           useEffect(() => {
           const fetchData = async () => {
           dispatch({ type: 'FETCH_REQUEST' })
           try {
               const result = await axios.get('/api/products')
               dispatch({ type: 'FETCH_SUCCESS', payload: result.data })
           } catch (err) {
               dispatch({ type: 'FETCH_FAIL', payload: getError(err as ApiError) })
           }
           }
           fetchData()
       }, [])
       ```

    6. create LoadingBox component
       create /components/LoadingBox.tsx

       ```js
       export declare type ApiError = {
           message: string
           response: {
           data: {
           message: string
           }
           }
       }
       ```

    7. create MessageBox component
       create /components/MessageBox.tsx

       ```js
       import Alert from 'react-bootstrap/Alert'
       import React from 'react'
       export default function MessageBox({
       variant = 'info',
       children,
       }: {
           variant?: string
           children: React.ReactNode
       }) {
           return <Alert variant={variant || 'info'}>{children}</Alert>
       }
       ```

    8. update return statement
       replace sampleProducts with products

       ```js
       return loading ? (
         <LoadingBox />
       ) : error ? (
         <MessageBox variant="danger">{error}</MessageBox>
       ) : (
         <Row>
           {products.map((product) => (
             <Col key={product.slug} sm={6} md={4} lg={3}>
               <Link to={'/product/' + product.slug}>
                 <img
                   src={product.image}
                   alt={product.name}
                   className="product-image"
                 />
                 <h2>{product.name}</h2>
                 <p>${product.price}</p>
               </Link>
             </Col>
           ))}
         </Row>
       )
       ```

    9. Fetch Products From Backend
       1. npm install axios
       2. set axios base url
       3. use effect hook
       4. use reducer hook

10. Create-Rating-Product-Component

    1. Rating.js

       ```js
           function Rating(props: {
           ating: number
           numReviews?: number
           caption?: string
           }) r{
           const { rating, numReviews, caption } = props
           return (
               <div className="rating">
               <span>
                   <i
                   className={
                       rating >= 1
                       ? 'fas fa-star'
                       : rating >= 0.5
                       ? 'fas fa-star-half-alt'
                       : 'far fa-star'
                   }
                   />
               </span>
               <span>
                   <i
                   className={
                       rating >= 2
                       ? 'fas fa-star'
                       : rating >= 1.5
                       ? 'fas fa-star-half-alt'
                       : 'far fa-star'
                   }
                   />
               </span>
               <span>
                   <i
                   className={
                       rating >= 3
                       ? 'fas fa-star'
                       : rating >= 2.5
                       ? 'fas fa-star-half-alt'
                       : 'far fa-star'
                   }
                   />
               </span>
               <span>
                   <i
                   className={
                       rating >= 4
                       ? 'fas fa-star'
                       : rating >= 3.5
                       ? 'fas fa-star-half-alt'
                       : 'far fa-star'
                   }
                   />
               </span>
               <span>
                   <i
                   className={
                       rating >= 5
                       ? 'fas fa-star'
                       : rating >= 4.5
                       ? 'fas fa-star-half-alt'
                       : 'far fa-star'
                   }
                   />
               </span>
               {caption ? (
                   <span>{caption}</span>
               ) : numReviews != 0 ? (
                   <span>{' ' + numReviews + ' reviews'}</span>
               ) : (
                   ''
               )}
               </div>
           )
           }
           export default Rating

       ```

    2. ProductItem.js

       ```js
       function ProductItem({ product }: { product: Product }) {
         return (
           <Card>
             <Link to={`/product/${product.slug}`}>
               <img
                 src={product.image}
                 className="card-img-top"
                 alt={product.name}
               />
             </Link>
             <Card.Body>
               <Link to={`/product/${product.slug}`}>
                 <Card.Title>{product.name}</Card.Title>
               </Link>
               <Rating
                 rating={product.rating}
                 numReviews={product.numReviews}
               />
               <Card.Text>${product.price}</Card.Text>
               {product.countInStock === 0 ? (
                 <Button variant="light" disabled>
                   Out of stock
                 </Button>
               ) : (
                 <Button>Add to cart</Button>
               )}
             </Card.Body>
           </Card>
         )
       }
       export default ProductItem
       ```

    3. HomePage.js

       ```js
       <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
         <ProductItem product={product}></ProductItem>
       </Col>
       ```

11. 1. npm i react-helmet-async
    2. main.tsx

       ```js
       import { HelmetProvider } from 'react-helmet-async'

       ...
       <HelmetProvider>
           <RouterProvider router={router} />
       </HelmetProvider>
       ```

    3. HomePage.tsx

       ```js
       import { Helmet } from 'react-helmet-async'
       ...
       <Helmet>
               <title>Amazona</title>
       </Helmet>
       ```

12. Load-Products-By-React-Query

    1. npm i @tanstack/react-query @tanstack/react-query-devtools
    2. main.tsx

       ```js
       // remove lines
       import axios from 'axios'
       axios.defaults.baseURL =
           process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : '/'

           ...
           <QueryClientProvider client={queryClient}>
               <RouterProvider router={router} />
               <ReactQueryDevtools initialIsOpen={false} />
           </QueryClientProvider>

       ```

    3. apiClient.ts

       ```js
       import axios from 'axios'
       const apiClient = axios.create({
         baseURL:
           process.env.NODE_ENV === 'development'
             ? 'http://localhost:5001'
             : '/',
         headers: {
           'Content-type': 'application/json',
         },
       })

       export default apiClient
       ```

    4. hooks/productHook.ts

       ```js
       export const useGetProductsQuery = () =>
       useQuery({
           queryKey: ['products'],
           queryFn: async () =>
           (
               await apiClient.get<Product[]>(`api/products`)
           ).data,
       })
       ```

    5. HomePage.tsx

       ```js
       const { data: products, isLoading, error } = useGetProductsQuery()
       ...
           {isLoading ? (
               <LoadingBox />
           ) : error ? (
               <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
           ) : (
           <Row>
           <Helmet>
               <title>TS Amazona</title>
           </Helmet>
           {products.map((product) => (
               <Col key={product.slug} sm={6} md={4} lg={3}>
               <ProductItem product={product} />
               </Col>
           ))}
           </Row>
           )}

       ```

13. Create-Product-Page

    1. index.ts

       ```js
       app.get('/api/products/:slug', (req: Request, res: Response) => {
         res.json(sampleProducts.find((x) => x.slug === req.params.slug))
       })
       ```

    2. productHooks.ts

       ```js
       export const useGetProductDetailsBySlugQuery = (slug: string) =>
         useQuery({
           queryKey: ['products', slug],
           queryFn: async () =>
             ((await apiClient.get) < Product > `api/products/slug/${slug}`)
               .data,
         })
       ```

    3. ProductPage.tsx

       ```js

           function ProductPage() {
               const params = useParams()
               const { slug } = params

               const {
               data: product,
               refetch,
               isLoading,
               error,
               } = useGetProductDetailsBySlugQuery(slug!)
               return isLoading ? (
         <LoadingBox />
       ) : error   ? (
         <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
       ) : !product ? (
         <MessageBox variant="danger">Product Not Found</MessageBox>
       ): (
         <div>
           <Row>
             <Col md={6}>
               <img
                 className="large"
                 src={product.image}
                 alt={product.name}
               ></img>
             </Col>
             <Col md={3}>
               <ListGroup variant="flush">
                 <ListGroup.Item>
                   <Helmet>
                     <title>{product.name}</title>
                   </Helmet>
                   <h1>{product.name}</h1>
                 </ListGroup.Item>
                 <ListGroup.Item>
                   <Rating
                     rating={product.rating}
                     numReviews={product.numReviews}
                   ></Rating>
                 </ListGroup.Item>
                 <ListGroup.Item>Pirce : ${product.price}</ListGroup.Item>
                 <ListGroup.Item>
                   Description:
                   <p>{product.description}</p>
                 </ListGroup.Item>
               </ListGroup>
             </Col>
             <Col md={3}>
               <Card>
                 <Card.Body>
                   <ListGroup variant="flush">
                     <ListGroup.Item>
                       <Row>
                         <Col>Price:</Col>
                         <Col>${product.price}</Col>
                       </Row>
                     </ListGroup.Item>
                     <ListGroup.Item>
                       <Row>
                         <Col>Status:</Col>
                         <Col>
                           {product.countInStock > 0 ? (
                             <Badge bg="success">In Stock</Badge>
                           ) : (
                             <Badge bg="danger">Unavailable</Badge>
                           )}
                         </Col>
                       </Row>
                     </ListGroup.Item>

                     {product.countInStock > 0 && (
                       <ListGroup.Item>
                         <div className="d-grid">
                           <Button variant="primary">
                             Add to Cart
                           </Button>
                         </div>
                       </ListGroup.Item>
                     )}
                   </ListGroup>
                 </Card.Body>
               </Card>
             </Col>
           </Row>
         </div>

       )
       }
       export default ProductPage
       ```




14. Create-React-Context

 1. Store.ts

     ```js

       type AppState = {
           mode: string
         }

         const initialState: AppState = {
           mode: localStorage.getItem('mode')
             ? localStorage.getItem('mode')!
             : window.matchMedia &&
               window.matchMedia('(prefers-color-scheme: dark)').matches
             ? 'dark'
             : 'light',

         }
         type Action =  { type: 'SWITCH_MODE' }


         function reducer(state: AppState, action: Action): AppState {
           switch (action.type) {
             case 'SWITCH_MODE':
               return { ...state, mode: state.mode === 'dark' ? 'light' : 'dark' }

             default:
               return state
           }
         }

         const defaultDispatch: React.Dispatch<Action> = () => initialState

         const Store = React.createContext({
           state: initialState,
           dispatch: defaultDispatch,
         })
         function StoreProvider(props: React.PropsWithChildren<{}>) {
           const [state, dispatch] = React.useReducer<React.Reducer<AppState, Action>>(
             reducer,
             initialState
           )
           return <Store.Provider value={{ state, dispatch }} {...props} />
         }

         export { Store, StoreProvider }

     ```

 2. main.ts

     ```js
     <StoreProvider>
       <RouterProvider router={router} />
       ...
     </StoreProvider>
     ```

 3. App.tsx

     ```js
     useEffect(() => {
       document.body.setAttribute('data-bs-theme', mode)
     }, [mode])
     const switchModeHandler = () => {
       ctxDispatch({ type: 'SWITCH_MODE' })
     }
     ...
     <Button variant={mode} onClick={switchModeHandler}>
                     <i
                       className={mode === 'light' ? 'fa fa-sun' : 'fa fa-moon'}
                     ></i>
                   </Button>
     ```

 4.  Use bootstrap 5.3 or above


15. Connect-To-MongoDB

1. create mongodb database
2. npm install dotenv mongoose @typegoose/typegoose
3. put mongodb uri in .env
4. MONGODB_URI=mongodb://localhost/tsmernamazon
5. index.ts

   ```js
   dotenv.config()

   const MONGODB_URI =
     process.env.MONGODB_URI || 'mongodb://localhost/tsmernamazona'
   mongoose.set('strictQuery', true)
   mongoose
     .connect(MONGODB_URI)
     .then(() => {
       console.log('connected to mongodb')
     })
     .catch(() => {
       console.log('error mongodb')
     })
   ```

6. models/productModel

   ```js
   import { modelOptions, prop, getModelForClass } from '@typegoose/typegoose'

   @modelOptions({})

   @modelOptions({ schemaOptions: { timestamps: true } })
   export class Product {
     public _id!: string
     @prop({ required: true })
     public name!: string
     @prop({ required: true, unique: true })
     public slug!: string
     @prop({ required: true })
     public image!: string
     @prop()
     public images!: string[]
     @prop({ required: true })
     public brand!: string
     @prop({ required: true })
     public category!: string
     @prop({ required: true })
     public description!: string
     @prop({ required: true, default: 0 })
     public price!: number
     @prop({ required: true, default: 0 })
     public countInStock!: number
     @prop({ required: true, default: 0 })
     public rating!: number
     @prop({ required: true, default: 0 })
     public numReviews!: number
     @prop({ required: true, default: false })
     public isFeatured!: boolean
     @prop()
     public banner?: string
   }

   export const ProductModel = getModelForClass(Product)

   ```

7. npm i express-async-handler
8. productRouter.ts

   ```js
   export const productRouter = express.Router()

   productRouter.get(
     '/',
     asyncHandler(async (req, res) => {
       const products = await ProductModel.find()
       res.json(products)
     })
   )
   ```

9. index.ts

 ```js
 app.use('/api/products', productRouter)
 ```

10. run <http://localhost:4000/api/products>
11. seedRouter.ts

     ```js
     const seedRouter = express.Router()

     seedRouter.get(
       '/',
       asyncHandler(async (req: Request, res: Response) => {
         await ProductModel.deleteMany({})
         const createdProducts = await ProductModel.insertMany(products)
         res.send({ createdProducts })
       })
     )
     export default seedRouter
     ```


16. Implement-Add-To-Cart

  1. Cart.ts

      ```js
            export type CartItem = {
            image: string | undefined
            slug: any
            quantity: number
            countInStock: any
            price: number
            _id: string
            name: string
          }
          export type ShippingAddress = {
            fullName: string
            address: string
            city: string
            country: string
            postalCode: string
          }

          export type Cart = {
            itemsPrice: number
            shippingPrice: number
            taxPrice: number
            totalPrice: number
            cartItems: CartItem[]
            shippingAddress: ShippingAddress
            paymentMethod: string
          }

      ```

  2. Store.js

      ```js
            type AppState = {
            mode: string
            cart: Cart
          }

          const initialState: AppState = {
            cart: {
              cartItems: localStorage.getItem('cartItems')
                ? JSON.parse(localStorage.getItem('cartItems')!)
                : [],
              shippingAddress: localStorage.getItem('shippingAddress')
                ? JSON.parse(localStorage.getItem('shippingAddress')!)
                : { location: {} },
              paymentMethod: localStorage.getItem('paymentMethod')
                ? localStorage.getItem('paymentMethod')!
                : 'PayPal',
              itemsPrice: 0,
              shippingPrice: 0,
              taxPrice: 0,
              totalPrice: 0,
            },
          }

          type Action =
              | { type: 'SWITCH_MODE' }
              | { type: 'CART_ADD_ITEM'; payload: CartItem }

        // reducer
            case 'CART_ADD_ITEM':
              const newItem = action.payload
              const existItem = state.cart.cartItems.find(
                (item: CartItem) => item._id === newItem._id
              )
              const cartItems = existItem
                ? state.cart.cartItems.map((item: CartItem) =>
                    item._id === existItem._id ? newItem : item
                  )
                : [...state.cart.cartItems, newItem]
              localStorage.setItem('cartItems', JSON.stringify(cartItems))
              return { ...state, cart: { ...state.cart, cartItems } }

      ```

  3. App.tsx

      ```js

        const { {mode, cart}, dispatch } = useContext(Store)

            <LinkContainer to="/">
                    <Navbar.Brand>amazona</Navbar.Brand>
                  </LinkContainer>
            <Link to="/cart" className="nav-link">
                      Cart
                      {cart.cartItems.length > 0 && (
                        <Badge pill bg="danger">
                          {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                        </Badge>
                      )}
                    </Link>

      ```

  4. utils.ts

      ```js
      export const convertProductToCartItem = (product: Product): CartItem => {
        const cartItem: CartItem = {
          _id: product._id,
          name: product.name,
          slug: product.slug,
          image: product.image,
          price: product.price,
          countInStock: product.countInStock,
          quantity: 1,
        }
        return cartItem
      }
      ```

  5. ProductItem.ts

      ```js
      const { state, dispatch: ctxDispatch } = useContext(Store)
      const {
        cart: { cartItems },
      } = state

      const addToCartHandler = async (item: CartItem) => {
        const existItem = cartItems.find((x) => x._id === product._id)
        const quantity = existItem ? existItem.quantity + 1 : 1
        if (product.countInStock < quantity) {
          toast.warn('Sorry. Product is out of stock')
          return
        }
        ctxDispatch({
          type: 'CART_ADD_ITEM',
          payload: { ...item, quantity },
        })
        toast.success('Product added to the cart')
      }
      ...
          <Button
                  onClick={() => addToCartHandler(convertProductToCartItem(product))}
                >
                  Add to cart
                </Button>
      ```


17. Add-To-Cart-In-Product-Page

  1. ProductPage.ts

        ```js

            const { state, dispatch } = useContext(Store)
            const { cart } = state
            const addToCartHandler = async () => {
              const existItem = cart.cartItems.find((x) => x._id === product!._id)
              const quantity = existItem ? existItem.quantity + 1 : 1
              if (product!.countInStock < quantity) {
                toast.warn('Sorry. Product is out of stock')
                return
              }
              dispatch({
                type: 'CART_ADD_ITEM',
                payload: { ...convertProductToCartItem(product!), quantity },
              })
              toast.success('Product added to the cart')
              navigate('/cart')
            }
            ...
            <Button onClick={addToCartHandler} variant="primary">
                              Add to Cart
            </Button>

        ```

  2. npm i react-router-bootstrap
  3. App.tsx

        ```js
        <LinkContainer to="/">
          <Navbar.Brand>amazona</Navbar.Brand>
        </LinkContainer>
        ```



18. Create-Cart-Page

  1. CartPage.ts

        ```js
        export default function CartPage() {
          const navigate = useNavigate()
          const {
            state: {
              cart: { cartItems },
            },
            dispatch,
          } = useContext(Store)

          const updateCartHandler = async (item: CartItem, quantity: number) => {
            if (item.countInStock < quantity) {
              toast.warn('Sorry. Product is out of stock')
              return
            }
            dispatch({
              type: 'CART_ADD_ITEM',
              payload: { ...item, quantity },
            })
          }

          return (
            <div>
              <Helmet>
                <title>Shopping Cart</title>
              </Helmet>
              <h1>Shopping Cart</h1>
              <Row>
                <Col md={8}>
                  {cartItems.length === 0 ? (
                    <MessageBox>
                      Cart is empty. <Link to="/">Go Shopping</Link>
                    </MessageBox>
                  ) : (
                    <ListGroup>
                      {cartItems.map((item: CartItem) => (
                        <ListGroup.Item key={item._id}>
                          <Row className="align-items-center">
                            <Col md={4}>
                              <img
                                src={item.image}
                                alt={item.name}
                                className="img-fluid rounded img-thumbnail"
                              ></img> <Link to={`/product/${item.slug}`}>{item.name}</Link>
                            </Col>
                            <Col md={3}>
                              <Button
                                onClick={() =>
                                  updateCartHandler(item, item.quantity - 1)
                                }
                                variant="light"
                                disabled={item.quantity === 1}
                              >
                                <i className="fas fa-minus-circle"></i>
                              </Button>{' '}
                              <span>{item.quantity}</span>{' '}
                              <Button
                                variant="light"
                                onClick={() =>
                                  updateCartHandler(item, item.quantity + 1)
                                }
                                disabled={item.quantity === item.countInStock}
                              >
                                <i className="fas fa-plus-circle"></i>
                              </Button>
                            </Col>
                            <Col md={3}>${item.price}</Col>
                            <Col md={2}>
                              <Button
                                onClick={() => removeItemHandler(item)}
                                variant="light"
                              >
                                <i className="fas fa-trash"></i>
                              </Button>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </Col>
                <Col md={4}>
                  <Card>
                    <Card.Body>
                      <ListGroup variant="flush">
                        <ListGroup.Item>
                          <h3>
                            Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                            items) : $
                            {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                          </h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <div className="d-grid">
                            <Button
                              type="button"
                              variant="primary"
                              onClick={checkoutHandler}
                              disabled={cartItems.length === 0}
                            >
                              Proceed to Checkout
                            </Button>
                          </div>
                        </ListGroup.Item>
                      </ListGroup>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>
          )
        }
        ```

  2. main.ts

        ```js
        <Route path="/cart" element={<CartPage />} />
        ```



19. Implement-Remove-From-Cart

  1. CartPage.ts

        ```js
        const removeItemHandler = (item: CartItem) => {
          dispatch({ type: 'CART_REMOVE_ITEM', payload: item })
        }
        ...
          <Button
            onClick={() => removeItemHandler(item)}
                variant="light"
                  >
              <i className="fas fa-trash"></i>
            </Button>
        ```

  2. Store.tsx

        ```js
            case 'CART_REMOVE_ITEM': {
            const cartItems = state.cart.cartItems.filter(
              (item: CartItem) => item._id !== action.payload._id
            )
            localStorage.setItem('cartItems', JSON.stringify(cartItems))
            return { ...state, cart: { ...state.cart, cartItems } }
          }
        ```



20. Create-User-Signin-Api

  1. userModel.ts

        ```js
            import { modelOptions, prop, getModelForClass } from '@typegoose/typegoose';

            @modelOptions({ schemaOptions: { timestamps: true } })
            export class User {
              public _id?: string;
              @prop({ required: true })
              public name!: string;
              @prop({ required: true, unique: true })
              public email!: string;
              @prop({ required: true })
              public password!: string;
              @prop({ required: true, default: false })
              public isAdmin!: boolean;
            }

            export const UserModel = getModelForClass(User);

        ```

  2. npm i bcryptjs
  3. data.ts

        ```js
        export const sampleUsers: User[] = [
          {
            name: 'Joe',
            email: 'admin@example.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: true,
          },
          {
            name: 'John',
            email: 'user@example.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: false,
          },
        ]
        ```

  4. Seed users

        ```js
        await UserModel.deleteMany({})
        const createdUsers = await UserModel.insertMany(sampleUsers)
        res.send({ createdProducts, createdUsers })
        ```

  5. open <http://localhost:4000/api/seed>
  6. npm i jsonwebtoken
  7. add JWT_SECRET to .env file
  8. utils.ts

        ```js
        export const generateToken = (user: User) => {
          return jwt.sign(
            {
              _id: user._id,
              name: user.name,
              email: user.email,
              isAdmin: user.isAdmin,
            },
            process.env.JWT_SECRET || 'somethingsecret',
            {
              expiresIn: '30d',
            }
          )
        }
        ```

  9. userRouter.ts

    ```js
    userRouter.post(
      '/signin',
      asyncHandler(async (req: Request, res: Response) => {
        const user = await UserModel.findOne({ email: req.body.email })
        if (user) {
          if (bcrypt.compareSync(req.body.password, user.password)) {
            res.send({
              _id: user._id,
              name: user.name,
              email: user.email,
              isAdmin: user.isAdmin,
              token: generateToken(user),
            })
            return
          }
        }
        res.status(401).send({ message: 'Invalid email or password' })
      })
    )
    ```

  10. index.ts

      ```js
      app.use('/api/users', userRouter)
      ```

  11. Test using advanced-rest-client
