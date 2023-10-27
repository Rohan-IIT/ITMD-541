document.addEventListener("DOMContentLoaded", function () {
    const tipForm = document.getElementById("tipForm");
    const billTotalInput = document.getElementById("billTotal");
    const tipPercentageInput = document.getElementById("tipPercentage");
    const tipRangeInput = document.getElementById("tipRange");
    const tipAmountInput = document.getElementById("tipAmount");
    const totalWithTipInput = document.getElementById("totalWithTip");

    tipForm.addEventListener("input", function () {
        handleFormChange();
    });

    tipForm.addEventListener("change", function () {
        handleFormChange();
    });

    function handleFormChange () {
        if (/[^0-9.]/.test(billTotalInput.value)) {
            // Show a prompt if input is not a number

            document.getElementById('hidep').style.display = 'block';
            tipPercentageInput.value = "";
            tipAmountInput.value = "";
            totalWithTipInput.value = "";
            billTotalInput.setCustomValidity("");
        } else if (billTotalInput.value.trim() === "") {
            document.getElementById('hidep').style.display = 'none'
            // If the "Bill Total" field is empty, clear values and reset custom validity
            tipPercentageInput.value = "";
            tipAmountInput.value = "";
            totalWithTipInput.value = "";
            billTotalInput.setCustomValidity("");
        } else {
            updateTipValues();
        }
    }


    function updateTipValues() {
        const billTotal = parseFloat(billTotalInput.value);

        if (isNaN(billTotal)) {
            // Show a prompt if input is not a number
            document.getElementById('hidep').style.display = 'block'

        } else {
            // Reset the custom validity
            billTotalInput.setCustomValidity("");
            document.getElementById('hidep').style.display = 'none'

            const tipPercentage = parseInt(tipRangeInput.value);
            const tipAmount = (billTotal * tipPercentage) / 100;
            const totalWithTip = billTotal + tipAmount;

            tipAmountInput.value = tipAmount.toFixed(2);
            totalWithTipInput.value = totalWithTip.toFixed(2);
            tipPercentageInput.value = tipPercentage + "%";
        }
    }
});
