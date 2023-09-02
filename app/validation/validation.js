const CHECK_EMPTY_FIELD = (arrInput, arrNoti) => {
    let valid = true;
    for (let item in arrInput) {
        let dataField = document.getElementById(arrInput[item]).value;
        if (dataField == '') {
            valid = valid && false;
            document.getElementById(arrNoti[item]).innerHTML = `Vui lòng nhập dữ liệu`;
            document.getElementById(arrNoti[item]).style.display = 'inline-block';
        } else {
            valid = valid && true;
            document.getElementById(arrNoti[item]).innerHTML = '';
            document.getElementById(arrNoti[item]).style.display = 'none';
        }
    }
    return valid;
}

const CHECK_ID = () => {
    let valid = true;
    let valueID = document.getElementById('id').value;
    const regexID = /^[0-9]+$/;
    if (regexID.test(valueID)) {
        valid = valid && true;
        document.getElementById('invalidID').innerHTML = '';
        document.getElementById('invalidID').style.display = 'none';
    } else {
        valid = valid && false;
        document.getElementById('invalidID').innerHTML = 'ID phải là số nguyên dương';
        document.getElementById('invalidID').style.display = 'inline-block';
    }
    return valid;
}

const CHECK_NAME = () => {
    let valid = true;
    let valueName = document.getElementById('name').value;
    const regexName = /^[a-zA-Z ]+$/;
    // console.log(removeAscent(valueName));
    if (regexName.test(removeAscent(valueName))) {
        valid = valid && true;
        document.getElementById('invalidTen').innerHTML = '';
        document.getElementById('invalidTen').style.display = 'none';
    } else {
        valid = valid && false;
        document.getElementById('invalidTen').innerHTML = 'Tên không đúng định dạng';
        document.getElementById('invalidTen').style.display = 'inline-block';
    }
    return valid;
}

const CHECK_EMAIL = () => {
    let valid = true;
    let valueEmail = document.getElementById('email').value;
    const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (regexEmail.test(valueEmail)) {
        valid = valid && true;
        document.getElementById('invalidEmail').innerHTML = '';
        document.getElementById('invalidEmail').style.display = 'none';
    } else {
        valid = valid && false;
        document.getElementById('invalidEmail').innerHTML = 'Email không đúng định dạng';
        document.getElementById('invalidEmail').style.display = 'inline-block';
    }
    return valid;
}

const CHECK_SCORE = (arr, noti) => {
    let valid = true;
    for (let item in arr) {
        let scoreValue = document.getElementById(arr[item]).value *1;
        if (scoreValue < 0 || scoreValue > 10) {
            valid = valid && false;
            document.getElementById(noti[item]).innerHTML = 'Số điểm không phù hợp';
            document.getElementById(noti[item]).style.display = 'inline-block';
        } else {
            valid = valid && true;
            document.getElementById(noti[item]).innerHTML = '';
            document.getElementById(noti[item]).style.display = 'none';
        }
    }
    return valid;
}

const CHECK_INTEGER_FIELD = (arr, noti) => {
    let valid = true;
    const regexInteger = /^(0|[1-9]\d*)$/;
    for (let index in arr) {
        let valueInteger = document.getElementById(arr[index]).value *1;
        if (regexInteger.test(valueInteger)) {
            valid = valid && true;
            document.getElementById(noti[index]).innerHTML = '';
            document.getElementById(noti[index]).style.display = 'none';
        } else {
            valid = valid && false;
            document.getElementById(noti[index]).innerHTML = 'Số nhập vào phải là số nguyên dương';
            document.getElementById(noti[index]).style.display = 'inline-block';
        }
    }
    return valid;
}

