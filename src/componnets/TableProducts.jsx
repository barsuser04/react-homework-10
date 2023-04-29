import React from "react";
import styled from "styled-components";

const TableProducts = ({
  decrementProductHandler,
  incrementProductHandler,
  store,
  removeProductHandler,
}) => {
  const totalPrice = store.map((item) => {
    if (item.quantity === 0) {
      const result = { ...item, price: (item.price = 0) };
      return result.price;
    } else {
      return item.price;
    }
  });
  console.log(totalPrice, "total");

  const resultTotal = totalPrice.reduce((a, b) => a + b, 0);

  return (
    <Continer>
      <div>
        <Table>
          <Thead>
            <p className="id">#</p>
            <p style={{ marginBottom: "0px" }}>Product</p>
            <p>Product Name</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Remove</p>
          </Thead>
          {store.map((item, index) => {
            return (
              item.quantity !== 0 && (
                <Tbody key={item.id}>
                  <p className="id">{index + 1}</p>
                  <Timg>
                    <img src={item.url} alt="productTable" />
                  </Timg>
                  <div>{item.productName}</div>
                  <div>${item.price}</div>
                  <ContainerCount>
                    <ButtonCount
                      onClick={() => decrementProductHandler(item.id)}
                    >
                      -
                    </ButtonCount>
                    <span>{item.quantity}</span>
                    <ButtonCount
                      onClick={() => incrementProductHandler(item.id)}
                    >
                      +
                    </ButtonCount>
                  </ContainerCount>
                  <ButtonRemove onClick={() => removeProductHandler(item.id)}>
                    delete
                  </ButtonRemove>
                </Tbody>
              )
            );
          })}
        </Table>
      </div>
      <div style={{ marginBottom: "40px" }}>
        <p style={{ fontSize: "3rem" }}>TOTAL: {resultTotal}</p>
      </div>
    </Continer>
  );
};

export default TableProducts;

const Continer = styled.div`
  margin: 20px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const Table = styled.div`
  display: flex;
  flex-direction: column;
 
`;

const Thead = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70px;
  font-size: 1.6rem;
  font-weight: 600;
  border-top: 3px solid #8c8484;

  .id {
    width: 100px;
    display: flex;
    justify-content: center;
    margin-top: -10px;
  }

  p {
    width: 200px;
    height: 20px;
    display: flex;
    justify-content: center;
    margin-top: -10px;
  }
`;

const Timg = styled.div`
  width: 150px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 95px;
    height: 76px;
    object-fit: contain;
  }
`;

const Tbody = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
  font-weight: 600;
  border-top: 3px solid #8c8484;

  .id {
    width: 60px;
    display: flex;
    justify-content: center;
  }

  div {
    width: 220px;
    display: flex;
    justify-content: center;
  }
`;

const ContainerCount = styled.div`
  display: flex;
  gap: 10px;
`;

const ButtonCount = styled.button`
  padding: 10px;
  background-color: #0b461b;
  color: #fff;
  border-radius: 4px;
`;

const ButtonRemove = styled.button`
  padding: 10px;
  background-color: #f02a10;
  color: #fff;
  border-radius: 4px;
  border: none;
  font-size: 1.4rem;
`;
