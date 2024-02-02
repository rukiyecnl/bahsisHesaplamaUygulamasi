let miktar = [5, 10, 15, 25 ,50];

const btns = document.querySelectorAll(".sabitBtn");
const billInput = document.querySelector(".bill-input");
const peopleInput = document.querySelector(".people-input");
const showTipAmount = document.querySelector(".showTipAmount");
const customBox = document.querySelector("#customBox");
const showTotalAmount = document.querySelector(".showTotalAmount");
const resetBtn = document.querySelector(".resetBtn");

let bahsisOrani = 0;

function init(){
    billInput.value = "";
    peopleInput.value = "";
    customBox.value = "";
    showTotalAmount.innerHTML = "$0.00";
    showTipAmount.innerHTML = "$0.00";
    fillBtns();
    accountTip(); 
    sonucHesapla();
}

function fillBtns(){
    for (let i = 0; i < miktar.length; i++) {
        btns[i].innerHTML = miktar[i] + "%";
    }   
}

//ornek kullanim:
// var sayi=15.252525;
// sayi=Number(sayi.toFixed(2))
// alert(sayi); //sonuç:15.25


function accountTip(){
    let yuzde;
    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function(e){
            e.preventDefault();
            // console.log(this.innerText);
            
            let yuzdesizKisim = this.innerText.split("%");
            console.log(Number(yuzdesizKisim[0]));
            yuzde = Number(yuzdesizKisim[0]);

            bahsisOrani = Number(billInput.value) * yuzde / 100;
        })  
    }

    customBox.addEventListener("input", function(e){
        yuzde = Number(e.target.value);
        bahsisOrani = Number(billInput.value) * yuzde / 100;
    })
    
}

function sonucHesapla(){
    let kisiBasiBahsis;
    peopleInput.addEventListener("input", function(e){
        e.preventDefault();
        if (e.target.value === "") {
            document.querySelector(".uyari").style.display = "none";
            showTipAmount.innerHTML = "$0.00";
            showTotalAmount.innerHTML = "$0.00";
            document.querySelector(".people-input").classList.remove("redBorder");
        }
        else {

            if (Number(e.target.value) === 0) {
                document.querySelector(".uyari").style.display = "block";
                document.querySelector(".people-input").classList.add("redBorder");
            }
            else {
                document.querySelector(".uyari").style.display = "none";
                kisiBasiBahsis = bahsisOrani / Number(e.target.value);
                showTipAmount.innerHTML = "$" + kisiBasiBahsis.toFixed(2);
                showTotalAmount.innerHTML = "$" + (kisiBasiBahsis * Number(e.target.value)).toFixed(2);
                document.querySelector(".people-input").classList.remove("redBorder");
            }             
        }
    })



    // const peopleValue = document.querySelector(".peopleInput form");
    // peopleValue.addEventListener("submit", function(e){
    //     e.preventDefault();
    //     const formData = new FormData(e.target);
    //     const formObj = Object.fromEntries(formData);

    //     formObj.deger = peopleInput.value;
    //     // console.log(typeof formObj.deger);  

    //     let kisiBasiBahsis = bahsisOrani / Number(formObj.deger);
    //     kisiBasiBahsis = Number(kisiBasiBahsis.toFixed(2));
    //     showTipAmount.innerHTML = "$" + kisiBasiBahsis;
    // })
}

init();

resetBtn.addEventListener("click", function(e){
    e.preventDefault();
    init();
})
