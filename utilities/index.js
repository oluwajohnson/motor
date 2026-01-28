const Util = {}


Util.buildClassificationGrid = function (data) {
  let grid = '<section class="vehicle-grid">'

  data.forEach(vehicle => {
    grid += `
      <div class="vehicle-card">
        <a href="/inventory/detail/${vehicle.inv_id}">
          <img src="${vehicle.inv_thumbnail}"
               alt="${vehicle.inv_make} ${vehicle.inv_model}">
        </a>
        <hr>
        <h2>
          <a href="/inventory/detail/${vehicle.inv_id}">
            ${vehicle.inv_make} ${vehicle.inv_model}
          </a>
        </h2>
        <span class="price">
          ${new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
          }).format(vehicle.inv_price)}
        </span>
      </div>
    `
  })

  grid += "</section>"
  return grid
}




Util.buildVehicleDetail = function (vehicle) {
  return `
    <section class="vehicle-detail">
      <img src="${vehicle.inv_image}"
           alt="${vehicle.inv_make} ${vehicle.inv_model}">
      <div class="vehicle-info">
        <h1>${vehicle.inv_make} ${vehicle.inv_model}</h1>
        <p><strong>Year:</strong> ${vehicle.inv_year}</p>
        <p><strong>Price:</strong>
          ${new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
          }).format(vehicle.inv_price)}
        </p>
        <p><strong>Mileage:</strong>
          ${new Intl.NumberFormat("en-US").format(vehicle.inv_miles)} miles
        </p>
        <p>${vehicle.inv_description}</p>
      </div>
    </section>
  `
}


module.exports = Util