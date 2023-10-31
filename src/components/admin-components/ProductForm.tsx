/* eslint-disable prettier/prettier */
import { ChangeEvent, FormEvent } from 'react'

import { Product } from '../../redux/slices/products/productSlice'
import '../../style/register.css'

type ProductFormProps = {
  product: Product
  handleSubmit: (e: FormEvent) => void
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export function ProductForm({ product, handleSubmit, handleChange }: ProductFormProps) {

  return (

    <div className="center">

      <form onSubmit={handleSubmit} >
        <div className="txtfield">
          <label htmlFor="name"  >
            Name:
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={product.name}
            onChange={handleChange}

          />
        </div>
        <div className="txtfield">
          <label htmlFor="image" >
            Image URL:
          </label>
          <input
            type="text"
            name="image"
            id="image"
            value={product.image}

          />
        </div>
        <div className="txtfield">
          <label htmlFor="description" >
            Description:
          </label>
          <textarea
            name="description"
            id="description"
            value={product.description}
            onChange={handleChange}

          />
        </div>
        <div className="txtfield">
          <label htmlFor="categories" >
            Categories: (use comma , to create multiple)
          </label>
          <input
            type="text"
            name="categories"
            id="categories"
            value={product.categories.join(',')}
            onChange={handleChange}

          />
        </div>
        <div className="txtfield">
          <label htmlFor="variants" >
            Variants: (use comma , to create multiple)
          </label>
          <input
            type="text"
            name="variants"
            id="variants"
            value={product.variants.join(',')}
            onChange={handleChange}

          />
        </div>
        <div className="txtfield">
          <label htmlFor="sizes" >
            Sizes: (use comma , to create multiple)
          </label>
          <input
            type="text"
            name="sizes"
            id="sizes"
            value={product.sizes.join(',')}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit">
          Add Product
        </button>
      </form>
    </div>

  )
}
