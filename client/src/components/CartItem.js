import React from 'react';

const CartItem = ({ item, onQuantityChange, onRemove }) => {
  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    onQuantityChange(item.productId, newQuantity);
  };

  return (
    <div className="row gy-3 mb-4">
      <div className="col-lg-5">
        <div className="me-lg-5">
          <div className="d-flex">
            <img src={item.image_url} className="border rounded me-3" style={{ width: '96px', height: '96px' }} alt={item.name} />
            <div className="">
              <a href={`/product/${item.name}`} className="nav-link">{item.name}</a>
              <p className="text-muted">{item.description}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-2 col-sm-6 col-6 d-flex flex-row flex-lg-column flex-xl-row text-nowrap">
        <div class="">
          <select style={{ width: '100px' }} className="form-select me-4" value={item.quantity} onChange={handleQuantityChange}>
            {[...Array(10).keys()].map(i => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>
        </div>
        <div class="">
          <span className="h6">${(item.price * item.quantity).toFixed(2)}</span> <br />
          <small className="text-muted text-nowrap"> ${item.price.toFixed(2)} / per item </small>
        </div>
      </div>
      <div className="col-lg col-sm-6 d-flex justify-content-sm-center justify-content-md-start justify-content-lg-center justify-content-xl-end mb-2">
        <div className="float-md-end">
          <button className="btn btn-light border text-danger icon-hover-danger" onClick={() => onRemove(item.productId)}> Remove</button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
