class Account {
  constructor(fName, lName, gender, date, month, year, department, id) {
    this.fName = fName;
    this.lName = lName;
    this.gender = gender;
    this.date = date;
    this.month = month;
    this.year = year;
    this.department = department;
    this.id = id;
  }
  static alertmessage(message, messageType, duration) {
    const alertmessage = `<div class="alert alert-${messageType}">${message}</div>`;
    const customDiv = document.querySelector("form");
    customDiv.insertAdjacentHTML("beforebegin", alertmessage);
    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, duration);
  }
  static getSelectedGender() {
    const maleRadiobtn = document.querySelector("#inlineRadio1");
    const femaleRadiobtn = document.querySelector("#inlineRadio2");
    if (maleRadiobtn.checked) {
      return "male";
    } else if (femaleRadiobtn.checked) {
      return "female";
    } else {
      return undefined;
    }
  }

  static generateId() {
    this.id = Math.floor(Math.random() * 100);
    return this.id;
  }
  static getAccounts() {
    let accounts;
    accounts = new Array();
    if (localStorage.getItem("account-details") === null) {
      accounts = [];
    } else {
      accounts = JSON.parse(localStorage.getItem("account-details"));
    }
    return accounts;
  }
  static addAccount(account) {
    const accounts = Account.getAccounts();
    accounts.push(account);
    localStorage.setItem("account-details", JSON.stringify(accounts));
  }
}
// --------------validation-------------

document.addEventListener("DOMContentLoaded", () => {
  function isValidfName(fName) {
    const fNameRegex = /^[A-Za-z]+$/;
    if (!fNameRegex.test(fName)) {
      Account.alertmessage("Only letters allowed", "danger", 2000);
      document.querySelector("#fName").focus();
    }
  }
  function isValidlName(lName) {
    const lNameRegex = /^[A-Za-z]+$/;
    if (!lNameRegex.test(lName)) {
      Account.alertmessage(
        "only letters allowed",
        "danger",
        2000
      );
      document.querySelector("#lName").focus();
    }
  }

  const fName = document.querySelector("#fName");
  fName.addEventListener("focusout", () => {
    var fName = document.querySelector("#fName").value;
    if (fName === "") {
      Account.alertmessage("Fill in the data", "warning", 1000);
      document.querySelector("#fName").focus();
    }
    if (fName !== "") {
      isValidfName(fName);
    }
  });
  const lName = document.querySelector("#lName");
  lName.addEventListener("focusout", () => {
    var lName = document.querySelector("#lName").value;
    if (fName === "") {
      Account.alertmessage("Fill in the data", "warning", 1000);
      document.querySelector("#lName").focus();
    }
    if (lName !== "") {
      isValidlName(lName);
    }
});
  
// --------------validation end------------

  const btn = document.querySelector("#submitbtn");
  btn.addEventListener("click", (event) => {
    const fName = document.querySelector("#fName").value;
    const lName = document.querySelector("#lName").value;
    const gender = Account.getSelectedGender();
    const datedata = document.querySelector('#datedata').value;
    var fields = datedata.split('-');
    var date = fields[2];
    var month = fields[1];
    var year = fields[0];
    console.log(date,month,year)

    const department = document.querySelector("#inputDepartment").value;

    if (fName === "" || lName === "" || gender === null || department === null) {
      Account.alertmessage("Fill out all the fields", "warning", 1000);
    } else {
      const account = new Account(
        fName,
        lName,
        gender,
        date,
        month,
        year,
        department,
        0,
        ""
      );
      account.id = Account.generateId();
      Account.addAccount(account);
      // location.reload();
    }
    event.preventDefault();
  });
});
