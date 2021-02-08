/**************************************************************
 * Point: defines a point on the map using X and Y coordinates
 *
 * x: x coordinate
 * y: y coordinate
 *
 * distanceTo(point): takes a point, calculates the distance to
 *                     that point from the current point.
 *
 * let point = new Point(x, y);
 ****************************************************************/
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  distanceTo = (point) => {
    let xDelta = this.x - point.x;
    let yDelta = this.y - point.y;
    return Math.sqrt(xDelta * xDelta + yDelta * yDelta); // PYTHAGORAS!
  };

  equals = (point) => point.x === this.x && point.y === this.y;

  static randomPoint = (maxX, maxY) => {
    let x = Math.random() * (maxX || 100);
    let y = Math.random() * (maxY || 100);
    return new Point(x, y);
  };
}

/**********************************************************
 * Wallet: keeps track of money
 *
 * money: how much money is in the wallet. Defaults to 0.
 *
 * credit(amount): adds `amount` to `money`.
 *
 * debit(amount): subtracts `amount` from `money`.
 *
 * let wallet = new Wallet(money);
 **********************************************************/
class Wallet {
  // implement Wallet!
  constructor(money = 0) {
    this.money = money;
  }

  credit = (amount) => (this.money = this.money + amount);

  debit = (amount) => (this.money = this.money - amount);
}

// let myWallet = new Wallet(5);
// myWallet.credit(6);
// console.log(myWallet.money);

/**********************************************************
 * Person: defines a person with a name (and feelings)
 *
 * name: name of said person
 * location: a Point
 * wallet: a Wallet instance initially with 0.
 *
 * moveTo(point): updates the `location` to `point`
 *
 * let person = new Person(name, x, y);
 **********************************************************/
class Person {
  // implement Person!
  constructor(name, x, y) {
    this.name = name;
    this.location = new Point(x, y);
  }

  wallet = new Wallet();

  moveTo = (point) => {
    this.location = point;
  };
}

// let x = new Person("Hussain", 10, 20);
// x.moveTo(new Point(30, 40));
// console.log(x);

/**********************************************************
 * Vendor: defines a vendor
 * Subclasses Person
 *
 * range: the maximum distance this vendor can travel - initially 5
 * price: the cost of a single ice cream - initially 1
 *
 * sellTo(customer, numberOfIceCreams):  sells a specific number of ice creams
 *     to the customer by doing the following:
 *         - Moves to the customer's location
 *         - Transfers money from the customer's wallet
 *           to the vendor's wallet
 *
 * new vendor = new Vendor(name, x, y);
 **********************************************************/
class Vendor extends Person {
  // implement Vendor!
  constructor(name, x, y) {
    super(name, x, y);
  }
  range = 5;
  price = 1;
  sellTo = (customer, numberOfIceCreams) => {
    // if (this.location.distanceTo(customer.location) <= this.range) {
    this.location = customer.location;
    let check = this.price * numberOfIceCreams;
    this.wallet.credit(check);
    customer.wallet.debit(check);
    // console.log(customer.Wallet.debit(reciete));
    // } else {
    //   console.log("the maximum distance this vendor can travel");
    // }
    // console.log(this.location.distanceTo(customer.location));
  };
}
// let person = new Person("Hussain", 10, 15);
// let vendor = new Vendor("sami", 10, 10);

// console.log(person);
// console.log(vendor);
// vendor.sellTo(person, 10);
// console.log(person);
// console.log(vendor);
/**********************************************************
 * Customer: defines a customer
 * Subclasses Person
 *
 * wallet: a Wallet instance initially with 10.
 *
 * _isInRange(vendor): checks if the customer is in range of vendor.
 *
 * _haveEnoughMoney(vendor, numberOfIceCreams): checks if the customer
 *     has enough money to buy a specific number of ice creams from vendor.
 *
 * requestIceCream(vendor, numberOfIceCreams): if the customer is in the vendor's
 *     range and has enough money for ice cream, a request is sent to the vendor.
 *
 * new customer = new Customer(name, x, y);
 **********************************************************/
class Customer extends Person {
  // implement Customer!
  constructor(name, x, y) {
    super(name, x, y);
  }

  wallet = new Wallet(10);

  _isInRange = (vendor) => {
    return this.location.distanceTo(vendor.location) <= vendor.range;
  };

  _haveEnoughMoney = (vendor, numberOfIceCreams) => {
    return vendor.price * numberOfIceCreams <= this.wallet.money;
  };

  requestIceCream = (vendor, numberOfIceCreams) => {
    // console.log(this);
    if (
      this._haveEnoughMoney(vendor, numberOfIceCreams) &&
      this._isInRange(vendor)
    ) {
      vendor.sellTo(this, numberOfIceCreams);
    }
  };
}

// let x = new Customer("Hussain", 20, 20);

// console.log(x.requestIceCream());

export { Point, Wallet, Person, Customer, Vendor };

/***********************************************************
 * If you want examples of how to use the
 * these classes and how to test your code manually,
 * check out the README.md file
 ***********************************************************/
// let vendorAsis = new Vendor("Asis", 10, 10); // create a new vendor named Asis at location (10,10)
// let nearbyCustomer = new Customer("MishMish", 11, 11); // create a new customer named MishMish at location (11,11)
// let distantCustomer = new Customer("Hamsa", 1000, 1000); // create a new customer named Hamsa at location (1000,1000)
// let brokeCustomer = new Customer("Maskeen", 12, 12); // create a new customer named Maskeen at location (12,12)

// brokeCustomer.wallet.money = 0; // steal all of Maskeen's money

// nearbyCustomer.requestIceCream(vendorAsis, 10); // ask to buy 10 ice creams from Asis
// // money was transferred from MishMish to Asis
// nearbyCustomer.wallet.money; // 0 left
// vendorAsis.wallet.money; // 10
// // Asis moved to MishMish's location
// vendorAsis.location; // { x: 11, y: 11 }

// distantCustomer.requestIceCream(vendorAsis, 10); // ask to buy 10 ice creams from Asis
// // no money was transferred because the request failed - Hamsa is too far away
// distantCustomer.wallet.money; // 10 left
// vendorAsis.wallet.money; // still only 10
// // Asis didn't move
// vendorAsis.location; // { x: 11, y: 11 }

// brokeCustomer.requestIceCream(vendorAsis, 1); // ask to buy 1 ice creams from Asis
// // no money was transferred because the request failed - Maskeen doesn't have enough money to buy even one ice cream :(
// brokeCustomer.wallet.money; // 0
// vendorAsis.wallet.money; // still only 10
// // Asis didn't move
// vendorAsis.location; // { x: 11, y: 11 }
