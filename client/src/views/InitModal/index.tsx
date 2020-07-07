import React, {useState} from "react";
import {Modal, Select, Button, Form} from "antd";
import {history} from "../../routes";

const {Option} = Select;

const InitModal: React.FC = (props) => {
    const [visible, setVisible] = useState(true);

    function handleChange(event: string) {
        console.log(event)
    }

    function handleOk() {
        setVisible(false);
        history.push("/hello")
    }

    return (
        <Modal title="Selecionar Direção"
               closable={false}
               visible={visible}
               footer={[
                   <Button onClick={handleOk} type="primary">Selecionar</Button>
               ]}
        >

            <Form>
                <Form.Item label="Direção">
                    <Select defaultValue="lucy" onChange={handleChange}>
                        <Option value="jack">Direção 1</Option>
                        <Option value="lucy">Direção 2</Option>
                    </Select>
                </Form.Item>
            </Form>

        </Modal>
    )
}

export default InitModal;
