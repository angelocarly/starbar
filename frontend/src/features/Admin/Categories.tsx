import React, {useState} from "react";
import {Category} from "../../common/models/Model";
import {Form, Input, InputNumber, Popconfirm, Table} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../app/store";
import {categories as categoriesState, updateCategory} from "./Admin.slice";

const Categories = () => {

    const dispatch = useDispatch<AppDispatch>();
    const categories = useSelector(categoriesState);

    // The selected category
    // const categoryId = useSelector(selectedCategory);
    const [editingKey, setEditingKey] = useState(0);
    const [data, setData] = useState(categories);
    const isEditing = (record: Category) => record.id === editingKey;
    const [form] = Form.useForm();

    const columns = [
        {
            title: 'name',
            dataIndex: 'name',
            editable: true
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_: any, record: Category) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
            <a href="javascript:" onClick={() => save(record)} style={{marginRight: 8}}>
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
                ) : (
                    <a /*disabled={editingKey !== 0}*/ onClick={() => edit(record.id)}>
                        Edit
                    </a>
                );
            },
        },
    ]

    const cancel = () => {
        setEditingKey(0);
    }
    const edit = (id: number) => {
        form.setFieldsValue({ name: '' });
        setEditingKey(id);
    }
    const save = async (category: Category) => {

        // Retrieve the form data
        const row = (await form.validateFields()) as Category;

        // Create a new category object with the changed name
        const newCat = {...category, name: row.name };

        dispatch(updateCategory(newCat));
        setEditingKey(0);

        //Update the local categories object
        const newData = [...data ]
        const index = newData.findIndex(item => item.id === newCat.id);
        if ( index > -1 ) {
            const item = newData[index];
            newData.splice(index, 1, {
                ...item,
                ...newCat
            })
        }
        setData(newData);

    }


    interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
        editing: boolean;
        dataIndex: string;
        title: any;
        inputType: 'number' | 'text';
        record: Category;
        index: number;
        children: React.ReactNode;
    }

    const EditableCell: React.FC<EditableCellProps> = ({
                                                           editing,
                                                           dataIndex,
                                                           title,
                                                           inputType,
                                                           record,
                                                           index,
                                                           children,
                                                           ...restProps
                                                       }) => {
        const inputNode = inputType === 'number' ? <InputNumber/> : <Input/>;

        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item
                        name={dataIndex}
                        style={{margin: 0}}
                        rules={[
                            {
                                required: true,
                                message: `Please Input ${title}!`,
                            },
                        ]}
                    >
                        {inputNode}
                    </Form.Item>
                ) : (
                    children
                )}
            </td>
        );
    };

    const mergedColumns = columns.map(col => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: Category) => ({
                record,
                inputType: 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (

        <Form form={form} component={false}>
        <Table
            components={{
                body: {
                    cell: EditableCell
                }
            }}
            bordered
            dataSource={data}
            columns={mergedColumns}
            rowClassName="editable-row"
        />
        </Form>

        // <List
        //     size="small"
        //     bordered
        //     dataSource={categories}
        //     className={styles.list}
        //     renderItem={item =>
        //         <List.Item
        //             onClick={() => dispatch(selectCategory(item.id))}
        //         >
        //             <EditTile name={item.name} id={item.id}/>
        //             {/*{item.id === categoryId ? <p>Selected</p>:<p></p> }*/}
        //         </List.Item>
        //     }
        // />
    );
};

export default Categories;
