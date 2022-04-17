const dropBtn0 = document.querySelector(".dropbtn-input");
const dropBtn1 = document.querySelector(".dropbtn-output");
const dropBtn2 = document.querySelector(".chart-dropbtn");
const dropdownContents = document.querySelectorAll(".dropdown-content");
const dropdownContent0 = document.querySelector(".dropdown-content-input");
const dropdownContent1 = document.querySelector(".dropdown-content-output");
const dropdownContent2 = document.querySelector(".dropdown-content-chart");

import View from "./View";

class DropdownView extends View {
  _parentsElements = document.querySelectorAll(".dropdown-content");

  _generateMarkup(currency,type = 0) {
    if (type===0 || type===1) {
      return `
      <div data-id="${currency.id}" class="dropdown-content-item" href="#">
      <img alt="" src=${currency.logoUrl}>
      <span>${currency.id}</span>
      </div>
    `;
  }
  else if (type === 2 ) {
    return  `
    <div data-id="${currency.id}" class="dropdown-content-item" href="#">
    <span>${currency.id}</span>
    </div>
  `
  }
  }

  _update(data,dropdownContent,type) {
    this._clear(dropdownContent);
    if (data) {
      this.renderDropdown(data,dropdownContent,type);
    }
  }

  _clear(parent) {
    const items = parent.querySelectorAll(".dropdown-content-item");
    if (!items) return;
    items.forEach((item) => {
      item.remove();
    });
  }

  _setdropBtnCurrency(dropBtn,currency,type = 0) {
    if (type === 2) {
      dropBtn.children[0].textContent = currency.id;
    } else {
      dropBtn.firstElementChild.setAttribute("src", currency.logoUrl);
      dropBtn.children[1].textContent = currency.id;
    }
  }

  addHandlerLoadDropdown(handler) {
    window.addEventListener("load", handler);
  }

  renderDropdown(data,dropdownContent,type) {
    data.forEach((currency) => {
      let markup;
      if (type === 2) {
        markup = this._generateMarkup(currency,2);
      } 
      else {
        markup = this._generateMarkup(currency);
      } 
      dropdownContent.insertAdjacentHTML("beforeend", markup);
    });
  }

  render(data,type,search=false) {
    if (search && type === 0) {
      //For input dropdown
      this._update(data,dropdownContent0);
    }
    else if (search && type === 1) {
      //For output dropdown
      this._update(data,dropdownContent1);
    }
     else if (search && type === 2) {
      this._update(data,dropdownContent2,2);
    }
    else if (search !== true) {
      if (type === 0 ) {
        this._update(data, dropdownContent0);
        this._update(data, dropdownContent1);
        } else if (type === 2) {
          this._update(data,dropdownContent2,2);
        }
    }
  }

  addHandlerDropdownItem(handler) {
    dropdownContents.forEach((dropdownContent, index) => {//index == type of dropdown
      dropdownContent.addEventListener("click", function (e) {
        const currency = e.target.closest(".dropdown-content-item");
        const id = currency?.getAttribute("data-id");
        if (!id) return;
        handler(id,index);
      });
    });
  }

  renderSelectedCurrency(currency,type) {
    switch (type) {
      case 0: {
        //input dropdown
        this._setdropBtnCurrency(dropBtn0, currency);
        break;
      }
      case 1: {
        //output dropdown
        this._setdropBtnCurrency(dropBtn1, currency);
        break;
      }
      case 2 : {
        //chart dropdown
        this._setdropBtnCurrency(dropBtn2,currency,type);
      }
    }
  }

  displayDropdown(dropBtn,dropdown) {
    dropBtn.addEventListener("click", function () {
      if (dropdown.style.display === "none") {
        dropdown.style.display = "block";
      } else {
        dropdown.style.display = "none";
      }
    });
  }

  addHandlerDisplayDropdown() {
    this.displayDropdown(dropBtn0, dropdownContent0);
    this.displayDropdown(dropBtn1, dropdownContent1);
    this.displayDropdown(dropBtn2,dropdownContent2);
  }

  close(type) {
    // input dropdown (0)|| output dropdown (1) || chart dropdown (2)
    if (type === 0) dropdownContent0.style.display = "none";
    if (type === 1) dropdownContent1.style.display = "none";
    if (type === 2) dropdownContent2.style.display = "none";
  }
  
}

export default new DropdownView();
