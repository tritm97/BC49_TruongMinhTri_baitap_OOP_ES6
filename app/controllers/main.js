import Person from "./../models/Person.js";
import Student from "./../models/Student.js";
import Employee from "../models/Employee.js";
import Customer from "../models/Customer.js";
import ListPerson from "../models/ListPerson.js";
import ListBinding from "../models/ListBinding.js";

const btn_not_sinhVien = [
  'soNgayLam', 'luongTheoNgay', 'tenCongTy', 'triGiaHoaDon'
];
const btn_sinhVien = [
  'diemToan', 'diemLy', 'diemHoa'
];
const btn_not_nhanVien = [
  'diemToan', 'diemLy', 'diemHoa', 'tenCongTy', 'triGiaHoaDon'
];
const btn_nhanVien = [
  'soNgayLam', 'luongTheoNgay'
];
const btn_not_khachHang = [
  'diemToan', 'diemLy', 'diemHoa', 'soNgayLam', 'luongTheoNgay'
];
const btn_khachHang = [
  'tenCongTy', 'triGiaHoaDon'
];

const typeChangeSV = () => {
  for (let id of btn_not_sinhVien) {
    document.getElementById(id).style.display = 'none';
  }
  for (let idd of btn_sinhVien) {
    document.getElementById(idd).style.display = 'inline-block';
  }
};

const typeChangeNV = () => {
  for (let id of btn_not_nhanVien) {
    document.getElementById(id).style.display = 'none';
  }
  for (let idd of btn_nhanVien) {
    document.getElementById(idd).style.display = 'inline-block';
  }
};

const typeChangeKH = () => {
  for (let id of btn_not_khachHang) {
    document.getElementById(id).style.display = 'none';
  }
  for (let idd of btn_khachHang) {
    document.getElementById(idd).style.display = 'inline-block';
  }
};

let typeChange = document.getElementById('type');
typeChange.addEventListener("change", function() {
  // console.log(typeChange.value);
  switch (typeChange.value) {
    case 'sinhVien' : {
      typeChangeSV();
    };
    break;
    case 'nhanVien' : {
      typeChangeNV();
    };
    break;
    case 'khachHang' : {
      typeChangeKH();
    };
    break;
  }
});

let arrInput = [
  'name', 'address', 'id', 'email', 'type', 'math', 'physic', 'chemistry', 'working_days', 'daily_wages', 'company_name', 'cost'
]

let listPerson = new ListPerson();

// gọi dữ liệu từ localStorage và render ra ngay khi vừa vào trang
listPerson.layDuLieuLocal();

// thêm người dùng
document.getElementById('userForm').onsubmit = () => {
  event.preventDefault();
  let user = new ListBinding();
  for (let i = 0; i < arrInput.length; i++) {
    let domUser = document.getElementById(arrInput[i]);
    
    let value = domUser.value;
    let id = domUser.id;
    user[id] = value;
  }
  listPerson.themNguoiDung(user);
}

// khi bấm thêm thì ẩn nút sửa
document.getElementById('themNguoiDung').onclick = () => {
  document.getElementById('btnCapNhat').style.display = 'none';
  document.getElementById('btnThem').style.display = 'inline-block';
}

// xoá người dùng
window.xoaNguoiDung = function (id) {
  // console.log(id);
  listPerson.xoaNguoiDung(id);
};

// sửa người dùng
window.suaNguoiDung = function (id) {
  // console.log(id);
  // clear hết form khi nhấn vào nút sửa rồi mới điền vào lại
  document.getElementById('userForm').reset();

  // nếu nhấn vào sửa xong nhấn close thì cũng phải clear hết form đi + mở lại readOnly
  let clickClose = document.querySelectorAll('#btnClose, #btnExit');
  clickClose.forEach(function(button) {
    button.addEventListener("click", function() {
      // Xử lý khi button được nhấp
      document.getElementById('userForm').reset();
      document.getElementById('id').readOnly = false;
    });
  });

  // khi bấm sửa thì ẩn nút thêm
  document.getElementById('btnThem').style.display = 'none';
  document.getElementById('btnCapNhat').style.display = 'inline-block';

  // gọi tới đối tượng listPerson và lấy ra thông tin người dùng
  let nguoiDungCanChinhSua = listPerson.layThongTinNguoiDung(id);
  // console.log(nguoiDungCanChinhSua.id);
  // console.log(nguoiDungCanChinhSua.type);

  switch (nguoiDungCanChinhSua.type) {
    case 'sinhVien' : {
      let arrFieldSV = document.querySelectorAll('#id, #type, #name, #email, #address, #math, #physic, #chemistry');
      for (let item of arrFieldSV) {
        item.value = nguoiDungCanChinhSua[item.id];
      }
      document.getElementById('id').readOnly = true;
      typeChangeSV();
    };
    break;
    case 'nhanVien' : {
      let arrFieldNV = document.querySelectorAll('#id, #type, #name, #email, #address, #working_days, #daily_wages');
      for (let item of arrFieldNV) {
        item.value = nguoiDungCanChinhSua[item.id];
      }
      document.getElementById('id').readOnly = true;
      typeChangeNV();
    };
    break;
    case 'khachHang' : {
      let arrFieldKH = document.querySelectorAll('#id, #type, #name, #email, #address, #company_name, #cost');
      for (let item of arrFieldKH) {
        item.value = nguoiDungCanChinhSua[item.id];
      }
      document.getElementById('id').readOnly = true;
      typeChangeKH();
    }
  }
};

// cập nhật thông tin người dùng
document.getElementById('btnCapNhat').onclick = () => {
  // console.log('object');
  // lấy dữ liệu đã chỉnh sửa về
  // tạo ra 1 đối tượng để lưu trữ dữ liệu đã chỉnh sửa
  let nguoiDungDaChinhSua = new ListBinding();

  let arrField = document.querySelectorAll('#userForm input, #userForm select');


  for (let item of arrField) {
      // gọi lấy ra id và value từ item, item đại diện cho từng dom bên trong arrField
      let {id, value} = item;
      nguoiDungDaChinhSua[id] = value;
  }
  listPerson.capNhatNguoiDung(nguoiDungDaChinhSua);

  // khi cập nhật xong nhớ tắt modal + clear form để lần sau không còn dữ liệu đó + mở readOnly cho input foodID
  document.querySelector('#btnClose').click();
  document.querySelector('#userForm').reset();
  document.getElementById('id').readOnly = false;
};

// lọc người dùng dựa theo loại
document.getElementById('loaiNguoiDung').onchange = (event) => {
  // dùng event.target để dom tới thẻ đang có sự kiện onchange
  let {value} = event.target;
  let arrFilter = [];
  // check nếu như value == all thì sẽ ko lọc mà lấy hết tất cả
  if (value == 'all') {
      arrFilter = listPerson.arrUser;
  } else {
      // dùng value để lọc ra các loại
      arrFilter = listPerson.arrUser.filter((item) => item.type == value);
      console.log(arrFilter);
  };
  listPerson.renderNguoiDung(arrFilter);
};

// sắp xếp danh sách theo thứ tự họ tên
document.getElementById('sapXep').onclick = () => {
  let dsSapXep = listPerson.arrUser;
  dsSapXep.sort((a, b) => {
    const tenA = a.name.toLowerCase();
    const tenB = b.name.toLowerCase();
    if (tenA > tenB) {
      return 1;
    }
    if (tenA < tenB) {
      return -1;
    }
    return 0;
  });
  listPerson.renderNguoiDung(dsSapXep);
}

