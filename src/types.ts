// Тип для ответа от сервера (содержит ссылки)
export type CarResponse = {
  brand: string;
  model: string;
  color: string;
  registrationNumber: string;
  modelYear: number;
  price: number;
  _links: {
    self: { href: string },
    car: { href: string },
    owner: { href: string }
  };
}

// Тип для отправки на сервер (без ссылок)
export type Car = {
  brand: string;
  model: string;
  color: string;
  registrationNumber: string;
  modelYear: number;
  price: number;
}

// Тип для обновления (объект + ссылка куда отправлять)
export type CarEntry = {
  car: Car;
  url: string;
}