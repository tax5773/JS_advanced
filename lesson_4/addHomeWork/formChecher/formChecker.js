class formChecker {
    constructor(form) {
        this.regExps = {
            name: /^[a-zа-яё]+$/i,
            phone: /^\+7\(\d{3}\)\d{3}-\d{4}$/,
            email: /^[\w._-]+@\w+\.[a-z]{2,4}$/i
        };
        this.errors = {
            name: 'В имени должны быть только буквы',
            phone: 'Телефон должен быть в формате +7(000)000-0000',
            email: 'E-mail должен соответствовать login@mail.ru или my.login@mail.ru или my-login@mail.ru'
        };
        this.errorClass = 'error-msg';
        this.form = form;
        this.valid = false;
        this._checkForm();
    }
    validate(regexp, value){
        regexp.test(value)
    }
    _checkForm(){
        let errors = [...document.getElementById(this.form).querySelectorAll(`.${this.errorClass}`)];
        for (let error of errors){
            error.remove();
        }
        let formFields = [...document.getElementById(this.form).getElementsByTagName('input')];
        for (let field of formFields){
            this._check(field);
        }
        if(![...document.getElementById(this.form).querySelectorAll('.invalid')].length){
           this.valid = true;
        }
    }
    _check(field){
        if(this.regExps[field.name]){
            if(!this.regExps[field.name].test(field.value)){
               field.classList.add('invalid');
               this._addErrorMsg(field);
               this._watchField(field);
            }
        }
    }
    _addErrorMsg(field){
        let error = `<span class="${this.errorClass}">${this.errors[field.name]}</span> `;
        field.parentNode.insertAdjacentHTML('beforeend', error);
    }
    _watchField(field){
        field.addEventListener('input', () => {
            let error = field.parentNode.querySelector(`.${this.errorClass}`);
            if(this.regExps[field.name].test(field.value)){
                field.classList.remove('invalid');
                field.classList.add('valid');
                if(error){
                    error.remove();
                }
            } else {
                field.classList.remove('valid');
                field.classList.add('invalid');
                if(!error){
                    this._addErrorMsg(field);
                }
            }
        })
    }
}

window.onload = () => {
    document.getElementById('myform').addEventListener('submit', event => {
        let valid = new formChecker('myform');
        if(!valid.valid){
            event.preventDefault();
        }
    })
}









