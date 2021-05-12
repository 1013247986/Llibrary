class library {
    time = '';
    previous = true;
    /**数组对象去重
     * @param {Array} data 数据
     * @param {String} key 主键
     * @return {Array} 
     * @version: 版本1.0.0 
     */
    arrObjRemoval(data, key) {
        try {
            // 判断是不是数组
            if (!Array.isArray(data)) throw "arrObjRemoval方法传入的不是数组"
            key = key.split(',')
            // 记录第一次出现得
            let arry = [];
            // 多个值去重
            data.forEach(item => {
                let _keys = ""
                key.forEach(el => {
                    _keys += item[el]
                })
                // 判断是否已经拥有
                if (arry.includes(_keys)) {
                    data.splice(i, 1);
                    i--;
                } else {
                    arry.push(item[key]);
                }
            })
            return data;
        } catch (err) {
            console.error(err);
        }
    };
    // ------------------------------------分割线----------------------------------
    /** 防抖函数
     * @param {Function} fn 运行的方法
     * @param {Number} wait 间隔时间
     * @param {Object} data 传入数据
     * @return {void}
     * @version: 版本1.0.0 
     */
    debounce(fn, wait, ...parameter) {
        if (this.time) clearTimeout(this.time);
        this.time = setTimeout(() => {
            fn(...parameter);
            this.time = '';
        }, wait)
    };
    // ------------------------------------分割线----------------------------------
    /** 节流函数
     * @param {Function} fn 运行的方法
     * @param {Number} wait 间隔时间
     * @param {Object} data 传入数据
     * @return {void}
     * @version: 版本1.0.0 
     */
    throttle(fn, wait, ...parameter) {
        if (this.previous) {
            this.previous = false;
            setTimeout(() => {
                this.previous = true;
            }, wait);
            fn(...parameter)
        }
    }
    // ------------------------------------分割线----------------------------------
    /** 更换数据格式 key
     * @param {Array} data 数据
     * @param {string} children 子级嵌套数据,没有值就不管
     * @param {Object} format 更换格式
     * @return {Array} 更换后的数据
     * @version: 版本1.0.0
     */
    multiLayerData(data = [], format = {}, children) {
        try {
            // 判断是不是数组
            if (!Array.isArray(data)) throw "multiLayerData方法传入的不是数组"
            let _onOff = children && Object.keys(format).includes(children);
            data.forEach(item => {
                for (let [key, value] of Object.entries(format)) {
                    if (_onOff && key == children) {
                        item[value] = (item[key]?.length ? multiLayerData(item[children], format, children) : []);
                    } else {
                        item[value] = item[key]
                    }
                    delete item[key];
                }
                if (children && !_onOff) {
                    item[children] = (item[children]?.length ? multiLayerData(item[children], format, children) : []);
                }
            })
            return data
        } catch (error) {
            console.error(error);
        }
    }
    // ------------------------------------分割线----------------------------------
    /** 返回指定参数 如：所有数据的ID
     * @param {Array} data 数据
     * @param {String} key 指定参数
     * @return {Array} 更换后的数据
     * @version: 版本1.0.0
     */
    appointData({ data = [], key = 'id' }) {
        try {
            // 判断是不是数组
            if (!Array.isArray(data)) throw "multiLayerData方法传入的不是数组"
            let keys = [];
            data.forEach(item => {
                keys.push(item[key])
            })
            return keys
        } catch (error) {
            console.error(error);
        }

    }
    // ------------------------------------分割线----------------------------------
    /** 自动拼装树结构
     * @param {Array} data 数据
     * @param {String} pIdKey 指向父节点的key
     * @param {String} idKey 自己的节点key
     * @param {String|Number} id 指定当前层级的pid
     * @param {String} children 拼接子级的key
     * @return {Array} 更换后的数据
     * @version: 版本1.0.0
     */
    convert(data = [], pIdKey = "pId", idKey = "id", id = null, children = "children") {
        let _arry = [];
        for (let i = 0; i < data.length; i++) {
            if (data[i][pIdKey] == id) {
                data[i][children] = convert(data, pIdKey, idKey, data[i][idKey], children)
                _arry.push(data[i])
                data.splice(i, 1)
                i--
            }
        }
        return _arry
    }
    /** 返回数据类型
     * @param {any} 数据
     * @return {String} 返回数据类型
     * @version: 版本1.0.0
     */
    dataType(data) {
        let _text = Object.prototype.toString.call(data);
        return _text.replace(/(\[|\]|object)/g, '').trim();
    }
}
let Collection = new library();

export default Collection
