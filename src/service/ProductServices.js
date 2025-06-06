const VENDURE_API_URL = 'http://localhost:3000/shop-api'

export async function fetchAnimatoysProducts() {
  const query = `
    query GetAnimatoysProducts {
      collection(slug: "animatoys") {
        id
        name
        productVariants {
          items {
            id
            name
            priceWithTax
            stockLevel
            product {
              id
              name
              featuredAsset {
                preview
              }
            }
          }
        }
      }
    }
  `

  const response = await fetch(VENDURE_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  })

  const result = await response.json()

  if (result.errors) {
    throw new Error(result.errors[0].message)
  }

  return result.data.collection.productVariants.items
}

export async function fetchProductById(id) {
  const query = `
    query GetProductById($id: ID!) {
      product(id: $id) {
        id
        name
        description
        featuredAsset {
          preview
        }
        variants {
          id
          name
          priceWithTax
          stockLevel
        }
      }
    }
  `
  const response = await fetch('http://localhost:3000/shop-api', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query,
      variables: { id }
    }),
  })

  const result = await response.json()
  if (result.errors) throw new Error(result.errors[0].message)

  return result.data.product
}
