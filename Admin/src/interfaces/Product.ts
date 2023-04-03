export class Product {
  constructor(
    public _id: any,
    public id: string,
    public name: string,
    public excerpt: string,
    public description: string,
    public description_HTML: string,
    public price: number,
    public price_formatted: string,
    public image: string,
    public media: [
      {
        type: string,
        id: string,
        src: string
      }
    ],
    public variants: {
      option_name: string,
      variants: [
        {
          id: string,
          sku: string,
          name: string,
          in_stock: boolean,
          quantity: number,
          price: number,
          price_formatted: string,
          original_price: number,
          original_price_formatted: string,
          available_quantity: number
        }
      ]
    },
    public categories: [
      {
        id: string,
        name: string
      }
    ],
    public in_stock: boolean,
    public available_quantity: number,
    public on_sale: {
      enable: boolean,
      original_price: number,
      original_price_formatted: string
    },
    public sold: number,
    public rating_average: number
    ) { }
}


