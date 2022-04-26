# storefront
> A minimalist storefront . ecommerce website where users can browse produts by categories, view information about a product and add products to cart.
 - fetch data from the GraphQL endpoint and to provide an interface to view and interact with this data

## Snapshots
![preview](./snapshots/pl.jpeg)
![preview](./snapshots/desc1.jpeg)
![preview](./snapshots/desc2.jpeg)
![preview](./snapshots/cart.jpeg)
![preview](./snapshots/overlay.jpeg)


## Built With
- React, Class based components
- Redux
- Redux persist
- Apollo client
- GraphQL
- CSS
- A GraphQL endpoint seperate from this repo was used, found [here](https://github.com/scandiweb/junior-react-endpoint)

## Features
- A products listing page that displays product image, name and on click on product directs to product page
- A product page/ description page that allows adding product to cart, and displays all information relavant to the product
- A cart page that displays all items added to the cart
    - items are added by varying attributes
    - quantity of items can be increased and decreased
    - when quantity is one a decrease removes item fromn cart
- A mini cart overlay that displays items in the cart, with cart functionalities
- Ability to choose between different currency types
- Filter prodcucts by category 

## Prerequisites
- You should already have the server found [here](https://github.com/scandiweb/junior-react-endpoint) running, You will have access to graphql API by using the URL: http://localhost:4000. The front end will not be able to fetch data if this endpoint is not running locally.

## Installation

Go to your terminal, navigate to your working directory and run

`git clone https://github.com/RayhanTabase/salim_abdulai_storefront.git`

After that navigate to the newly created folder

`cd salim_abdulai_storefront`

You now have access to the files.
To install necessary dependencies run

`npm install` or `yarn install`

Start a local server running the command

`npm start` or `yarn start`

You should now have the project running locally on a dev server.

## Author

👤 **Salim Abdulai**

- GitHub: [@RayhanTabase](https://github.com/RayhanTabase)
- LinkedIn: [Salim-Abdulai](https://linkedin.com/in/salimabdulai)
- Email: salimabdulai2@yahoo.com

## Acknowledgments

This app was developed by specifications and design provided by [Scandiweb]('https://scandiweb.com')

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](../../issues/).

## Show your support

Give a ⭐️ if you like this project!

## 📝 License

This project is [MIT](./MIT.md) licensed.
