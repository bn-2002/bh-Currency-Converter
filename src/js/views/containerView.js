import View from "./View";

class ContainerView extends View {

    erorMessageContainer = document.querySelector('.error-message-container');
    erorMessage = document.querySelector('.error-message');
    closeBtn = document.querySelector('.close-btn');

    renderEror(err) {
        this.erorMessage.textContent = err;
        this.erorMessageContainer.classList.remove('hidden');
    }
    
    addErrorHandler() {
        const that = this;
        this.closeBtn.addEventListener('click',function() {
            that.erorMessageContainer.classList.add('hidden');
        })
    }
    
}

export default new ContainerView();