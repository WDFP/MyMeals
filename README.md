# MyMeals
Our application provides filtered recipes for personalized meal planning and grocery shopping. You can filter by cuisine, ingredients, and dietary restrictions, and our interface offers cooking tips and tricks for a seamless experience. Whether you are a seasoned chef, or a beginner cook, you can enjoy delicious and nutritious meals, without the hassle!

# Stack
NextJS <br/>
React <br/>
TailwindCSS <br/>
MongoDB

# Features
- Select recipes by categories
- Filter recipes based on title, description, difficulty
- Sign in option
  - Allows users to favourite recipes
  - See their favourites in one page
- Check out detailed recipes (instructions and ingredients)
- Add ingredients to a grocery list
- Add recipe to a meal plan

# Screenshots
<img src="public/image1.png" style="width:500px"><br/>
<img src="public/image2.png" style="width:500px"><br/>
<img src="public/image3.png" style="width:500px"><br/>
<img src="public/image4.png" style="width:500px"><br/>
<img src="public/image5.png" style="width:500px"><br/>


# Getting Started

Create a [GitHub](https://github.com/settings/developers) OAuth app
- Create OAuth App
- App name can be anything
- Homepage URL is http://localhost:3000/
- Authorization callback URL is http://localhost:3000/api/auth/callback

Create `.env.local` file in the root:
```
MONGODB_URI = "mongodb+srv://YOURUSER:YOURMONGOPASS@cluster0.jusv6yw.mongodb.net/?retryWrites=true&w=majority"
MONGODB_USER = 
MONGODB_PASSWORD = 
MONGODB_DB = 
URL = "http://localhost:3000"
GITHUB_ID=<client id of your github auth app should go in here>
GITHUB_SECRET=<client secret of your github app should go in here>
NEXTAUTH_URL=http://localhost:3000
```

Install dependencies with 
```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

