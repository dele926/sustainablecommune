function calculateTotal(){
    var rows = document.querySelectorAll("tr.package-row");
    rows.forEach(function (currentRow) {

        var quantity = Number(currentRow.querySelector('#quantity').value);
        var price = Number(currentRow.querySelector('#price').value);
        var subtotal = 0;

        document.querySelectorAll('quantity');


        if (isNaN(quantity) || isNaN(price)) {
            return;
        }
        subtotal = price * quantity;
        currentRow.querySelector("#subtotal").innerHTML=subtotal;
    });
}