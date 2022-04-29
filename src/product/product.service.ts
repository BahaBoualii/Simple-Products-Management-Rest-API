import { Injectable,NotFoundException } from '@nestjs/common';

import { Product } from './product.model';

@Injectable()
export class ProductService {
  private products: Product[] = [];

  insertProduct(title: string, desc: string, price: number) {
    const prodId = Math.random().toString();
    const newProduct = new Product(prodId, title, desc, price);
    this.products.push(newProduct);
    return prodId;
  }

  getProducts() {
    return [...this.products];
  }

  getSingleProduct (prodId: string){
    const product = this.products.find((obj) => obj.id === prodId)
    if (!product){
      throw new NotFoundException('product not found !!');
    }
    return {...product};
  }

  updateProduct(prodId:string, title:string, description:string , price: number){
    const product = this.products.find((obj) => obj.id === prodId);
    if (!product){
      throw new NotFoundException('product not found !!');
    }
    const prodIndex = this.products.findIndex((obj) => obj.id === prodId);
    const updatedProduct = {... product};
    if (title){
      updatedProduct.title = title;
    }
    if (description){
      updatedProduct.description = description;
    }
    if (price){
      updatedProduct.price = price;
    }
    this.products[prodIndex] = updatedProduct;
  }

  deleteProd(prodId: string){
    const product = this.products.find((obj) => obj.id === prodId);
    if (!product){
      throw new NotFoundException('product not found !!');
    }
    const prodIndex = this.products.findIndex((obj) => obj.id === prodId);
    this.products.splice(prodIndex,1);
  }
}