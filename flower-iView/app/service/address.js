const Service = require("egg").Service;

class AddressService extends Service {
  //管理员获取所有地址列表
  async find() {
    const addressData = await this.app.mysql.select("address", {
      where: {
        isdelete: false
      }
    });
    return addressData;
  }
  //客户端用户查看所有地址
  async all(id) {
    const allAddress = await this.app.mysql.select("address", {
      where: {
        isdelete: false,
        user_id: id
      }
    });
    return allAddress;
  }
  //客户端用户删除地址
  async delete(id) {
    const options = {
      where: {
        address_id: id
      }
    };
    const row = {
      isdelete: true
    };
    const deleteAddress = await this.app.mysql.update("address", row, options);
    return deleteAddress;
  }
  //按用户Id查找地址
  async findAddressUser(id) {
    const addressData = await this.app.mysql.select("address", {
      where: {
        isdelete: false,
        user_id: id
      }
    });
    return addressData;
  }
  //按地址Id查找地址
  async findAddressId(id) {
    const addressData = await this.app.mysql.select("address", {
      where: {
        isdelete: false,
        address_id: id
      }
    });
    return addressData;
  }
  //客户端获取默认地址
  async getDefault(id) {
    const addressData = await this.app.mysql.select("address", {
      where: {
        isdelete: false,
        user_id: id,
        isdefault: 1
      }
    });
    return addressData;
  }
  //修改默认地址
  async changeDefault() {
    let query = this.ctx.request.body;
    const options1 = {
      where: {
        address_id: query.isdefault_id
      }
    };
    const row1 = {
      isdefault: 1
    };
    const options2 = {
      where: {
        address_id: query.notdefault_id
      }
    };
    const row2 = {
      isdefault: 0
    };
    const updateAddress1 = await this.app.mysql.update(
      "address",
      row1,
      options1
    );
    const updateAddress2 = await this.app.mysql.update(
      "address",
      row2,
      options2
    );
    if (updateAddress1.affectedRows && updateAddress2.affectedRows) {
      let code = 1;
      return code;
    } else {
      let code = 0;
      return code;
    }
  }
  //添加地址
  async create() {
    let query = this.ctx.request.body;
    let row = {
      receiver: query.receiver,
      address_phone: query.address_phone,
      province_name: query.province_name,
      city_name: query.city_name,
      district_name: query.district_name,
      address_detile: query.address_detile,
      user_id: query.user_id
    };
    const creatAddress = await this.app.mysql.insert("address", row);
    return creatAddress;
  }
}

module.exports = AddressService;
