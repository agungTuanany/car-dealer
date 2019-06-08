window.addEventListener('load', () => document.querySelector('.preloader').classList.add('hidePreloader'));

/* Vanilla JS */

//getting the products
class Products{
  async getProducts(){
    try {
      let result = await fetch('./car.json')
      let data = await result.json();
      let products = data.items;
      //console.log(data)
      console.log(products)
      products = products.map(item =>{
        const { title, price } = item.fields;
        const { id } = item.sys;
        const image = item.fields.image.fields.file.url;
        return{title, price, id, image};
      });
      return products;
    } catch (error) {
      console.log(error);
    }
  }
}

const productsDOM = document.querySelector('.single-car')

class UI{
  displayProducts(products){
    let result = '';
    products.forEach(product => {
      result +=`
        <!-- single car -->
        <div class='col-10 mx-auto my-3 col-md-6 col-lg-4'>
          <div class='card car-card'>
            <img src=${product.image} class='card-img-top car-img' alt=''>
            <!-- card body -->
            <div class='car-body'>
              <div class='car-info d-flex justify-content-between'>
                <!-- first flex child -->
                <div class='car-text text-uppercase'>
                  <h6 class='font-weight-bold py-2'>car maker</h6>
                  <h6>model</h6>
                </div>
                <!-- second flex child -->
                <h5 class='car-value align-self-center py-2 px-3'>$
                  <span class='carprice'>${product.price}</span>
                </h5>
              </div>
            </div>
            <!-- end of card body -->
            <div class='card-footer text-capitalize d-flex justify-content-between'>
              <p><span><i class='fa fa-car'></i></span>sedan</p>
              <p><span><i class='fa fa-cogs'></i></span>automatic</p>
              <p><span><i class='fa fa-gas-pump'></i></span>50</p>
            </div>
          </div>
        </div>
        <!-- end of single car -->

      `;
    });
    productsDOM.innerHTML = result;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const ui = new UI();
  const products = new Products();

  products.getProducts().then(products => {
    ui.displayProducts(products);
  });
})
