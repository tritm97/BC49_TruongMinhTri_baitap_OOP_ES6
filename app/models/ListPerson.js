import Person from "./Person.js";
import Student from "./Student.js";
import Employee from "./Employee.js";
import Customer from "./Customer.js";
import ListBinding from "./ListBinding.js";

export default class ListPerson {
    arrUser = [];
    themNguoiDung = (user) => {
        this.arrUser.push(user);
        this.renderNguoiDung();
        this.luuXuongLocal();
        // console.log(this.arrUser);
        document.getElementById('userForm').reset();
        document.getElementById('btnClose').click();
    };

    renderNguoiDung = (arr = this.arrUser) => {
        let content = '';
        for (let i = 0; i < arr.length; i++) {
            
            let nguoiDung = new ListBinding();
            Object.assign(nguoiDung, arr[i]);
            

            let {name, address, id, email, type, math, physic, chemistry, working_days, daily_wages, company_name, cost} = nguoiDung;
            content += `
            <tr>
                <td>${id}</td>
                <td>${type == 'sinhVien' ? 'Sinh viên' : (type == 'nhanVien' ? 'Nhân viên' : 'Khách hàng')}</td>
                <td>${name}</td>
                <td>${email}</td>
                <td>${address}</td>
                <td>${type == 'sinhVien' ? ((math*1 + physic*1 + chemistry*1) / 3) : ''}</td>
                <td>${type == 'nhanVien' ? (working_days * daily_wages) : ''}</td>
                <td>${type == 'khachHang' ? company_name : ''}</td>
                <td>${type == 'khachHang' ? cost : ''}</td>
                <td>${type == 'khachHang' ? (cost > 10e+6 ? 'VIP Customers' : 'Normal Customers') : ''}</td>
                <td>
                    <button class="btn btn-danger" onclick="xoaNguoiDung('${id}')">Xoá</button>
                    <button class="btn btn-warning btn_sua"
                    onclick="suaNguoiDung('${id}')" data-toggle="modal"
                    data-target="#exampleModal">Sửa</button>
                </td>
            </tr>
            `;
        }
        document.getElementById('tbodyUser').innerHTML = content;
    };

    luuXuongLocal = () => {
        // chuyển mảng thành dạng dữ liệu JSON.stringify
        let chuoiJson = JSON.stringify(this.arrUser);
        localStorage.setItem('arrUser', chuoiJson);
    };

    layDuLieuLocal = () => {
        // gọi dữ liệu từ local lên
        let arrUserDuocGoi = localStorage.getItem('arrUser');
        // parse chuỗi json về lại kiểu dữ liệu ban đầu
        // parse xong sẽ gán giá trị vào bên trong arrUser của lớp đối tượng
        if (arrUserDuocGoi) {
            this.arrUser = JSON.parse(arrUserDuocGoi);
            this.renderNguoiDung();
        }
    };

    xoaNguoiDung = (id, array = this.arrUser) => {
        // findIndex => tìm ra được vị trí index của phần tử chúng ta muốn tìm 
        let index = array.findIndex((item) => item.id == id);

        // TH1: tìm được phần tử mà chúng ta muốn
        // TH2: tìm không có phần tử đó trong mảng => index = -1

        if (index !== -1) {
            array.splice(index, 1);
            this.renderNguoiDung();
            this.luuXuongLocal();
        }
    };

    layThongTinNguoiDung = (id) => {
        // dùng id để xác định phần tử cần lấy
        // hàm find giúp lấy ra phần tử thoả điều kiện bên trong mảng
        let nguoiDung = this.arrUser.find(function(item, index) {
            return item.id == id;
        });
        // TH1: tìm được phần tử mà chúng ta muốn
        // TH2: tìm không có phần tử đó trong mảng => nguoiDung = undefind
        if (nguoiDung) {
            return nguoiDung;
        }
    };

    capNhatNguoiDung = (nguoiDungDaChinhSua) => {
        // tìm vị trí index của người cần cập nhật
        let index = this.arrUser.findIndex((item) => item.id == nguoiDungDaChinhSua.id);
        if (index !== -1) {
            this.arrUser[index] = nguoiDungDaChinhSua;
            this.luuXuongLocal();
            this.renderNguoiDung();
        }
    };
}

