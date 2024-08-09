## Lessons

PAYPAL CREDENTIALS
email : sb-idmsk32095177@personal.example.com
pswd: Aakash@0712

1. Create Projects folder
2. Install @angular/cli

3.create App as frontend

4.Add Header
i.Generate Component
ii.Add HTML
iii.Add CSS

5.List Food
1.Create Food Model
2.Create data.ts
i.Add Sample to assests
3.Add images to assets
4.create Food services
5.create home component
i.Add ts
ii.Add HTML
iii.Add CSS
6.stars
npm i ng-starrating --force

6.Search
i.Add method to food service
ii.Add search route
iii. show search result in Home Component
iv.Generate search component
a.Add to home component
b.add ts
c.add html
d.add css

7.Tags Bar
i.Create Tag Model
ii.Add sample tags to data.ts
iii.Food service
a.add get all tags method
b.add get all foods by tag method
iv.add tags route
v.show tag result in home component
vi.generate tags component
a.add to home component
b.add ts
c.add html
d.add css

8.FoodPage
i.Add method to food service
ii.Generate Food Page Component
a.add route
b.add ts
c.add html
d.add css

9.Cart Page
i.Create CartItem Model
ii.Create Cart Model
iii.Generate Cart Service
iv.Add to cart Button in food page
v.generate cart page component
a.add route
b.add ts
c.add html
d.add css

10.Not Found
i.Generate Component
a.html
b.css
c.ts
ii.add to pages
a.home page
b.food page
c.cart page

11.Connect to Backend
i.Create backend folder
ii.npm init
iii.npm install typescript
iv.create tsconfig.json
v.create .gitignore
vi.copy data.ts to backend/src
vii.npm install express cors
viii.create server.ts
a.intall @types
b.add apis
ix.npm install nodemon ts-node --save-dev
x.add urs.ts to frontend
xi.add httpclient module
xii.update food service

12.Login Page
1.Generate component
i.add to routes
ii.add ts
iii.add html
a.import reactive forms module
iv.add css
2.add login api
i.use json
ii.add jsonwebtoken
iii.test using postmon
3.Generate User Service
i.Generate User Model
ii.Add user Subject
iii.Add Login Method
a.add user url
b.generate iuserlogin interface
c.add ngx-toastr
ci.import module
cii.import browseranimationmodule
ciii.add styles in angular.json
d.add to header
vi.add local storage methods
vii.add logout method
a.add to header

13.Make Component for login page
i.input container
ii.input validation
iii.text input
iv.default button

14.connect login api to mongoDB Atlas
i.Moving Apis into routers
ii.create mongodb atlas
iii.create .env file
iv.install
a.mongoose
b.dotenv
c.bcryptjs
d.express-async-handler
v.connect to mongodb atlas
vi.use mongodb instead of data.ts in apis

15.Register User
i.add register api
ii.add register service
iii.add register link
iv.add register component

16.Loading
i.add image
2.add component
3.add service
4.add interceptor

17.checkout page
i.create order model
ii.create checkout page component
a.add to router
iii.add user to user service
iv.add cart to cart service
v.create order items list component
vi.adding map to the checkout page
a.add leaflet npm package
ai.add @types/leaflet
aii.add css to angular.json
b.add addresslating to order model
c.create map component
ci.add to checkout page
cii.add ts
ciia.change app-map selector to map
ciii.add html
civ.add css
d.add auth guard

18.save order
i.add order model
ii.add order status enum
iii.add auth middleware
iv.add order router
a.add create api
v.add order urls to urls.ts
vi.add order service
a.add create method
vii.add auth interceptor

19.payment page
i.generate component
ii.add getOrderForCurrentUser api
iii.add order service method
iv.connect component to readonly
v.make the map component read only

20.Adding paypal
i.generate component
a.add to payment page
ii.add paypal button
iii.add paypal js to index.html
iv.set up paypal button
v.add pay api to order router
vi.get paypal sandbox account

21.Order Track Page
i.generate component
a.add to routes
ii.add api
a.add to urls.ts
iii.add method to order.service
iv.add html
v.add css

22.deploy
i.create new account
ii.connect github with heuroko
iii.enable automatic deploy
iv.outputpath in angular.json
"outputPath":"../backend/built/public"
v.package.json
a.frontend
ai.package.json
"script":{
"ng":"ng",
"start":"ng serve"
"build":"npm install --force && ng build --configuration production"
}
aii.move from devdependencies to dependencies (build-angular, cli, compiler-cli, jasmine, leaflet, node, typescript)
b.backend
bi.package.json
"script":{"start":"cd src && nodemon server.ts",
"build":"npm install && tsc"
}
bii.move from dev dependencies to dependencies (bcryptjs,cors,express,jsonwebtoken)
c.root
ci.package.json
{
"name":"foodapp",
"version":"1.0.0",
"script":{
"start":"cd backend/build && node server.js"
"prebuild":"cd backend && npm build",
"build":"cd frontend && npm build"
}
}
vi.BASE_URL in urls.ts
BASE_URL=environment.production?'':'http://localhost:5000';
vii.public folder config in serve.ts
app.use(express.static('public'));
app.get('\*',(req,res)=>{
res.sendFile(path.join(\_\_dirname,'public','index.html'))
});
const port = process.env.PORT || 5000;
viii.run commands
npm run prebuild
npm run build
move .env file to build
npm start
ix.go to heruko settings
reveal config vars
jwt_secret
mongouri
x.add built folder to .gitignore
node_modules
.env
build
xi.commit and push
xii.go to heruko
go to activity
copy deployed url
