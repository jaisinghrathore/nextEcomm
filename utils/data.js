import bcrypt from 'bcryptjs';

export const data = {
    users: [
        {
            name: "jai",
            email: "jairqthore@gmail.com",
            password: bcrypt.hashSync("123456"),
            isAdmin: true
        }
    ],
    products:[
        {
            name:"Free shirt",
            slug:"one",
            category:"Shirts",
            image:'https://images.unsplash.com/photo-1615974570347-ed7abfb99ee5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=376&q=80',
            price:'700',
            brand:"adidas",
            rating:'4.7',
            numReview:10,
            countInStock:20,
            description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            },        {
                name:"No shirt",
                slug:"two",
                category:"Shirts",
                image:'https://images.unsplash.com/photo-1627664058792-a1258a7f1c8a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80',
                price:'200',
                brand:"goochi",
                rating:'4.5',
                numReview:10,
                countInStock:20,
                description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                },        {
                    name:"Expensive shirt",
                    slug:"three",
                    category:"Shirts",
                    image:'https://images.unsplash.com/photo-1627664057310-67ca6b8f27e0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80',
                    price:'100',
                    brand:"woodland",
                    rating:'5.0',
                    numReview:10,
                    countInStock:20,
                    description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                    },        {
                        name:"Nice shirt",
                        slug:"four",
                        category:"Shirts",
                        image:'https://images.unsplash.com/photo-1632388507931-158c1731a71e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTF8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60',
                        price:'1200',
                        brand:"nivia",
                        rating:'2.5',
                        numReview:10,
                        countInStock:20,
                        description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                        },        {
                            name:"Adidas shirt",
                            slug:"five",
                            category:"Shirts",
                            image:'https://images.unsplash.com/photo-1632336131722-7b8ecd1a979c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MjN8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60',
                            price:'900',
                            brand:"ucla",
                            rating:'4.0',
                            numReview:10,
                            countInStock:20,
                            description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                            },
                            {  name:"Gucchi shirt",
                            slug:"six",
                            category:"Shirts",
                            image:'https://images.unsplash.com/photo-1632188003301-1bd5f658f20a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTh8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60',
                            price:'800',
                            brand:"levis",
                            rating:'4.5',
                            numReview:10,
                            countInStock:20,
                            description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                            },   
    ]
};