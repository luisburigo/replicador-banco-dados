import React, {useEffect, useState} from "react";
import {Modal, Select, Button, Form} from "antd";
import {history} from "../../routes";
import DirecaoService, {Direcao} from "../../services/DirecaoService";
import api from "../../services/api";

const {Option} = Select;

const InitModal: React.FC = (props) => {
    const [visible, setVisible] = useState(true);
    const [direcoes, setDirecoes] = useState<Direcao[]>([]);
    const [direcao, setDirecao] = useState<Direcao>({} as Direcao);

    useEffect(() => {
        const direcaoId = DirecaoService.getDirecaoInLocalStorage();

        if (direcaoId) {
            closePage();
        }
    });

    useEffect(() => {
        DirecaoService.getAll()
            .then(({data}) => {
                setDirecoes(data);
            })
    }, [])

    function handleChange(event: number) {
        const direcao = direcoes.find(direcao => direcao.id == event);

        if (direcao) {
            setDirecao(direcao);
        }
    }

    function handleOk() {
        closePage();
        DirecaoService.setInLocalStorage(direcao);
    }

    function closePage() {
        setVisible(false);
        history.push("/hello");
    }

    return (
        <Modal title="Selecionar Direção"
               closable={false}
               visible={visible}
               footer={[
                   <Button disabled={!direcao.id} key="btn-select" onClick={handleOk} type="primary">Selecionar</Button>
               ]}
        >

            <Form>
                <Form.Item label="Direção">
                    <Select onChange={handleChange}>
                        {direcoes.map(direcao => (
                            <Option key={direcao.id} value={direcao.id}>
                                {direcao.hostOrigem} - {direcao.hostDestino}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>

        </Modal>
    )
}

export default InitModal;
