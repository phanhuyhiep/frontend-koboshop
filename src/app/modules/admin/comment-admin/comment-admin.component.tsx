import { Fragment, useEffect, useState } from 'react'
import TemplateTable from '../common/template-table/template-table.component'
import { deleteComment, getAllComment, searchComment, updateComment } from './service/comment.service'
import { Form, Input, Rate, Select } from 'antd'
import { createComment } from '~/app/api/comment/comment.api'
import { getAllProduct } from '../product-admin/service/product.service'
import { getAllUser } from '../user-admin/service/user.service'

const Option = Select
const CommentAdminComponent = () => {
  const [dataComment, setDataComment] = useState([])
  const [colums, setColums] = useState([])
  const [reset, setReset] = useState<boolean>(true)
  const [products, setProducts] = useState([])
  const [users, setUsers] = useState([])
  useEffect(() => {
    getAllComment().then((res) => {
      setDataComment(res.data)
    })
    getAllProduct().then((res) => {
      setProducts(res.data)
    })
    getAllUser().then((res) => {
      setUsers(res.data)
    })
  }, [reset])

  useEffect(() => {
    const columnTemp: any = []
    const title = ['User', 'Product', '', 'Comment', 'Evaluate']
    if (dataComment.length > 0) {
      Object.keys(dataComment[0]).forEach((itemKey, key = 0) => {
        if (!['_id', 'updatedAt', 'createdAt', '__v'].includes(itemKey)) {
          columnTemp.push({
            title: title[key++],
            dataIndex: itemKey,
            key: itemKey,
            align: 'center',

            render: (text: any, record: any, index: any) => {
              if (itemKey == 'userId') {
                return <div>{record?.userId?.name}</div>
              }
              if (itemKey == 'productId') {
                return <div>{record?.productId?.name}</div>
              }
              if (itemKey === 'star') {
                return <Rate disabled value={record?.star} />
              }

              return text
            }
          })
        }
      })
    }
    setColums(columnTemp)
  }, [dataComment])

  const handelGetList = () => {
    setReset(!reset)
  }

  return (
    <div>
      <div>
        <TemplateTable
          columsTable={colums}
          searchFunc={searchComment}
          setNewData={setDataComment}
          changeFunc={updateComment}
          createFunc={createComment}
          dataTable={dataComment}
          dataPage={7}
          deleteFunc={deleteComment}
          handleGetList={handelGetList}
          formEdit={
            <Fragment>
              <Form.Item
                label='User comment & evaluate'
                name='userId'
                getValueFromEvent={(event, select) => ({ name: select?.children, _id: select?.value })}
                getValueProps={(value) => ({ label: value?.name, value: value?._id })}
                rules={[{ required: true, message: 'Please input your fullname!' }]}
              >
                <Select placeholder='lựa chọn tài khoản'>
                  {users.map((item: any) => (
                    <Option value={item._id} key={item._id}>
                      {item.email}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label='Product comment & evaluate'
                name='productId'
                getValueFromEvent={(event, select) => ({ name: select?.children, _id: select?.value })}
                getValueProps={(value) => ({ label: value?.name, value: value?._id })}
                rules={[{ required: true, message: 'Please input your fullname!' }]}
              >
                <Select placeholder='lựa chọn sản phẩm'>
                  {products.map((item: any) => (
                    <Option value={item._id} key={item._id}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label='comment'
                name='comment'
                rules={[{ required: true, message: 'Please input your fullname!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label='evaluate'
                name='star'
                rules={[{ required: true, message: 'Please input your fullname!' }]}
              >
                <Rate />
              </Form.Item>
            </Fragment>
          }
        />
      </div>
    </div>
  )
}

export default CommentAdminComponent
